from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import os
import shutil

from app.database.db import SessionLocal
from app.models.document import Document
from app.utils.dependencies import get_current_user
from app.utils.activity_logger import log_activity   # ✅ ADD THIS

router = APIRouter(prefix="/documents", tags=["Documents"])

# DB SESSION
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


UPLOAD_FOLDER = "app/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ==========================================
# 🔥 ADMIN UPLOAD DOCUMENT
# ==========================================
@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # ADMIN ONLY
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admin allowed")

    # ✅ SAVE FILE
    save_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ✅ SAVE IN DB
    doc = Document(
        title=file.filename,
        file_path=file.filename,
        uploaded_by=user["user_id"]
    )

    db.add(doc)
    db.commit()
    db.refresh(doc)

    # 🔥 ✅ LOG ACTIVITY (MANDATORY)
    log_activity(
        db,
        user["user_id"],
        "DOCUMENT_UPLOAD",
        f"{file.filename} uploaded"
    )

    return {
        "message": "File uploaded successfully",
        "id": doc.id
    }


# ==========================================
# 🔥 VIEW DOCUMENTS
# ==========================================
@router.get("/")
def get_documents(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Document).all()