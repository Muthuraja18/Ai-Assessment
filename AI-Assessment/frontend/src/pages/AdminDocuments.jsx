import { useState, useEffect } from "react";
import api from "../services/api";

export default function AdminDocuments() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const uploadFile = async () => {
    if (!file) return alert("Select file first");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/documents/upload", formData);

      alert(res.data.message || "Uploaded successfully");
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 ROLE CHECK
  if (role !== "admin") {
    return <h2 style={{ color: "red" }}>Access Denied (Admin only)</h2>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin - Upload Documents</h2>

      <input
        type="file"
        className="mt-4 border p-2"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadFile}
        disabled={loading}
        className="ml-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}