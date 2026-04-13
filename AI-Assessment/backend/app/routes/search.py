from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os
import pickle
import re
from app.utils.activity_logger import log_activity
from app.utils.dependencies import get_current_user
from pypdf import PdfReader
from pdf2image import convert_from_path
import pytesseract

from app.database.db import SessionLocal
from app.models.document import Document

router = APIRouter(prefix="/search", tags=["AI Search"])

# ✅ PATHS
UPLOAD_FOLDER = r"E:\Ai Assessment\AI-Assessment\backend\app\uploads"
FAISS_PATH = "faiss_index.bin"
CHUNKS_PATH = "chunks.pkl"

# ✅ OCR
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# ✅ MODEL
model = SentenceTransformer("all-MiniLM-L6-v2")
dimension = 384

# ✅ GLOBAL STATE
index = None
document_chunks = None


# ✅ LOAD EXISTING INDEX (IMPORTANT)
if os.path.exists(FAISS_PATH) and os.path.exists(CHUNKS_PATH):
    print("🔄 Loading saved FAISS index...")
    index = faiss.read_index(FAISS_PATH)

    with open(CHUNKS_PATH, "rb") as f:
        document_chunks = pickle.load(f)

    print("✅ Index + chunks loaded")
else:
    print("⚠️ No saved index found")


# ✅ DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ READ FILE
def read_file(path):
    try:
        if not os.path.exists(path):
            print("❌ File not found:", path)
            return ""

        if path.lower().endswith(".txt"):
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()

        elif path.lower().endswith(".pdf"):
            text = ""
            reader = PdfReader(path)

            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

            # OCR fallback
            if not text.strip():
                print("⚠️ OCR fallback:", path)
                images = convert_from_path(path)

                for img in images:
                    text += pytesseract.image_to_string(img)

            return text

    except Exception as e:
        print("❌ Read error:", e)

    return ""


# ✅ SPLIT TEXT
def split_text(text, chunk_size=150):
    text = text.strip()
    if not text:
        return []

    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]


# ✅ BUILD INDEX
@router.post("/build-index")
def build_index(db: Session = Depends(get_db)):
    global document_chunks, index

    docs = db.query(Document).all()

    print("\n========== BUILD INDEX ==========")
    print("📄 TOTAL DOCS:", len(docs))

    document_chunks = []
    index = faiss.IndexFlatL2(dimension)

    for doc in docs:
        file_path = os.path.join(UPLOAD_FOLDER, doc.file_path.strip())
        file_path = os.path.normpath(file_path)

        print("\n--- FILE ---")
        print("PATH:", file_path)

        if not os.path.exists(file_path):
            print("❌ NOT FOUND")
            continue

        text = read_file(file_path)

        print("TEXT LENGTH:", len(text))

        if not text.strip():
            print("⚠️ EMPTY TEXT")
            continue

        chunks = split_text(text)
        print("CHUNKS:", len(chunks))

        document_chunks.extend(chunks)

    print("\n✅ FINAL CHUNKS:", len(document_chunks))

    if document_chunks:
        embeddings = model.encode(document_chunks)
        index.add(np.array(embeddings))

        # 💾 SAVE INDEX
        faiss.write_index(index, FAISS_PATH)

        with open(CHUNKS_PATH, "wb") as f:
            pickle.dump(document_chunks, f)

        print("💾 Index saved")

    else:
        print("❌ NO CHUNKS")

    return {
        "message": "Index built successfully",
        "chunks": len(document_chunks)
    }


# ✅ SEARCH (SMART QA)
# ✅ SEARCH (FINAL IMPROVED SEMANTIC SEARCH)
@router.post("/")
def search_documents(
    payload: dict,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    global index, document_chunks

    query = payload.get("query", "").strip().lower()

    if not query:
        return {"answer": ""}

    if not document_chunks or index is None:
        return {"answer": "❌ Build index first"}

    # 🔥 LOG SEARCH
    log_activity(
        db,
        user["user_id"],
        "SEARCH",
        f"Query: {query}"
    )

    clean_query = re.sub(r'[^a-zA-Z0-9 ]', '', query)
    query_words = [w for w in clean_query.split() if len(w) > 2]

    query_embedding = model.encode([clean_query])

    distances, indices = index.search(np.array(query_embedding), 5)

    scored_chunks = []

    for i, idx in enumerate(indices[0]):
        if 0 <= idx < len(document_chunks):
            scored_chunks.append((document_chunks[idx], distances[0][i]))

    scored_chunks = sorted(scored_chunks, key=lambda x: x[1])

    answers = []

    for chunk, dist in scored_chunks:
        sentences = chunk.split(".")

        for sentence in sentences:
            sentence_clean = sentence.lower().strip()

            if not sentence_clean:
                continue

            if "very important" in sentence_clean:
                continue

            if len(sentence_clean) < 10:
                continue

            keyword_score = sum(word in sentence_clean for word in query_words)

            if keyword_score > 0:
                answers.append((sentence.strip(), keyword_score, dist))

    answers = sorted(answers, key=lambda x: (-x[1], x[2]))

    final_sentences = []
    seen = set()

    for sentence, _, _ in answers:
        if sentence not in seen:
            final_sentences.append(sentence)
            seen.add(sentence)

    if final_sentences:
        return {"answer": ". ".join(final_sentences[:2]) + "."}

    if scored_chunks:
        return {"answer": scored_chunks[0][0]}

    return {"answer": "No answer found"}