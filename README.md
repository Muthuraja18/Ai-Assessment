📘 AI Assessment System
📌 Overview

The AI Assessment System is a full-stack web application built using FastAPI (backend) and React.js (frontend). It provides task management, document handling, AI-based semantic search, and analytics with role-based authentication.

The system integrates MySQL (XAMPP) as the database and uses AI embeddings with vector search for intelligent document retrieval.

🚀 Tech Stack
🔹 Backend
FastAPI
SQLAlchemy ORM
MySQL (XAMPP)
PyMySQL
Python 3.12
🔹 Frontend
React.js
Axios
CSS (Custom styling)
🔹 AI / Search
Sentence Transformers (Embeddings)
FAISS / Vector Search
Semantic Search (Cosine Similarity)
📂 Project Structure
AI-Assessment/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── utils/
│   │   ├── database/
│   │   └── main.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   ├── package.json
│
└── README.md
