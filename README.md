📘 AI Assessment System
📌 Overview

The AI Assessment System is a full-stack web application built using FastAPI (backend) and React.js (frontend). It provides task management, document handling, AI-based semantic search, and analytics with role-based authentication.

The system integrates MySQL (XAMPP) as the database and uses AI embeddings with vector search for intelligent document retrieval.

🚀 Tech Stack
🔹 Backend

The backend of this project is built using FastAPI, a modern Python framework for building APIs. It uses SQLAlchemy ORM for database interactions and PyMySQL to connect with MySQL (XAMPP) as the database. The backend is developed using Python 3.12, ensuring high performance and modern language features.

🔹 Frontend

The frontend is developed using React.js, which provides a dynamic and responsive user interface. Axios is used for making API calls between frontend and backend. The UI styling is handled using custom CSS, allowing full control over design and layout.

🔹 AI / Search

The AI and search functionality is powered by Sentence Transformers, which generate text embeddings for semantic understanding. These embeddings are indexed using FAISS (Facebook AI Similarity Search) for fast vector-based retrieval. Additionally, Cosine Similarity-based Semantic Search is used to improve the accuracy of search results based on meaning rather than exact keywords.

⚙️ Features
🔐 Authentication & Authorization

The system supports secure user registration and login. It includes role-based access control for Admin and User, along with token-based authentication to protect APIs.

📋 Task Management

Users can create, update, and delete tasks. Each task supports status tracking such as Pending and Completed, enabling better workflow management.

📁 Document Management

The platform allows users to upload and manage documents efficiently. It also stores and tracks document metadata for easy access and organization.

🤖 AI-Powered Search

The system provides intelligent semantic search using embeddings. Documents are converted into vectors and matched using FAISS-based similarity search, enabling accurate and context-aware results.

📊 Analytics Dashboard

The analytics module displays insights such as total tasks, completed vs pending tasks, total documents, and most searched queries (admin-only access).

🗄️ Database Setup (XAMPP MySQL)

To set up the database, start XAMPP and open phpMyAdmin. Create a database named:

ai_project

Then configure the backend connection using:

DATABASE_URL = "mysql+pymysql://root:@localhost:3306/ai_project"
⚙️ Setup Instructions
🔧 Backend Setup

Install dependencies and start the backend server:

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
💻 Frontend Setup

Install dependencies and start the frontend application:

cd frontend
npm install
npm start
📊 API Endpoints
🔐 Authentication
POST /auth/register
POST /auth/login
📋 Tasks
GET /tasks
POST /tasks
PUT /tasks/{id}
DELETE /tasks/{id}
📁 Documents
GET /documents
POST /documents
📊 Analytics
GET /analytics
🤖 AI Features

The system converts text into embeddings and stores them in a vector database. These embeddings are compared using similarity algorithms to perform fast and intelligent semantic search. This improves accuracy significantly compared to traditional keyword-based search systems.

📈 Analytics Output

The dashboard provides insights such as total tasks, completed tasks, pending tasks, total documents, and most searched queries (admin-only access).

👨‍💻 Author

Muthuraja


🏁 Final Note

This project demonstrates a scalable full-stack AI-powered system with modular architecture, secure authentication, and intelligent search capabilities powered by modern machine learning techniques.
