import { Link } from "react-router-dom";

function Sidebar() {
  let role = "";

  try {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    }
  } catch (err) {
    console.log("Token decode error:", err);
  }

  return (
    <div style={{ width: "220px", background: "#eee", height: "100vh", padding: "10px" }}>
      <ul>

        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>

        {/* 👤 USER */}
        {role === "user" && (
          <>
            <li><Link to="/user-documents">My Documents</Link></li>
            <li><Link to="/search">AI Search</Link></li>
          </>
        )}

        {/* 👑 ADMIN */}
        {role === "admin" && (
          <>
            <li><Link to="/admin-documents">Upload Documents</Link></li>
            <li><Link to="/create-task">Create Task</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
          </>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;