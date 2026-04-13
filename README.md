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
