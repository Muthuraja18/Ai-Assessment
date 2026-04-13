import { useEffect, useState } from "react";
import api from "../services/api";
import "./UserDocuments.css";

export default function UserDocuments() {
  const [docs, setDocs] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
      } catch (err) {
        console.log("Token decode error:", err);
      }
    }

    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await api.get("/documents");

      const cleanedDocs = res.data.map((doc) => ({
        ...doc,
        file_path: doc.file_path
          .replace("app/uploads/", "")
          .replace("uploads\\", "")
          .replace("uploads/", "")
          .replace(/\\/g, "/"),
      }));

      setDocs(cleanedDocs);
    } catch (err) {
      console.log("Fetch docs error:", err);
    }
  };

  if (role !== "user") {
    return (
      <div className="access-denied">
        Access Denied (User only)
      </div>
    );
  }

  return (
    <div className="user-doc-container">
      <div className="user-doc-wrapper">

        {/* Heading */}
        <div className="heading-box">
          <h2>My Documents</h2>
          <p>View and open uploaded study materials</p>
        </div>

        {/* Documents */}
        {docs.length === 0 ? (
          <div className="empty-box">
            No documents available
          </div>
        ) : (
          <div className="doc-grid">
            {docs.map((doc) => (
              <div key={doc.id} className="doc-card">
                <div className="doc-info">
                  <h3>📄 {doc.title}</h3>
                  <p>Uploaded file available for review</p>
                </div>

                <a
                  href={`http://localhost:8000/uploads/${doc.file_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="open-btn"
                >
                  Open Document
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}