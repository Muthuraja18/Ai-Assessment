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
⚙️ Features
🔐 Authentication & Authorization
User registration and login
Role-based access (Admin/User)
Secure token-based authentication
📋 Task Management
Create, update, delete tasks
Task status tracking (Pending / Completed)
📁 Document Management
Upload and manage documents
Track document metadata
🤖 AI-Powered Search
Semantic search using embeddings
Vector similarity matching using FAISS
Intelligent document retrieval
📊 Analytics Dashboard
Total tasks count
Completed vs Pending tasks
Total documents
Most searched queries (admin only)
🗄️ Database Setup (XAMPP MySQL)
Start XAMPP
Open phpMyAdmin
Create database:
ai_project
Configure backend DB:
DATABASE_URL = "mysql+pymysql://root:@localhost:3306/ai_project"
⚙️ Setup Instructions
🔧 Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
💻 Frontend Setup
cd frontend
npm install
npm start
📊 API Endpoints
Authentication
POST /auth/register
POST /auth/login
Tasks
GET /tasks
POST /tasks
PUT /tasks/{id}
DELETE /tasks/{id}
Documents
GET /documents
POST /documents
Analytics
GET /analytics
🤖 AI Features
Text converted into embeddings
Stored and compared using vector similarity
Fast semantic search for documents
Improves search accuracy beyond keyword matching
📈 Analytics Output
Total tasks
Completed tasks
Pending tasks
Total documents
Most searched queries (Admin only)
👨‍💻 Author

Muthu Raja

📌 Future Improvements
Real-time notifications
Advanced dashboard charts
Chatbot integration
Cloud deployment (AWS / Azure)
🏁 Final Note

This project demonstrates a full-stack AI-powered system with clean architecture, scalable backend design, and intelligent search capabilities.