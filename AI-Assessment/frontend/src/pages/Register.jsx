import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully ✅");
      navigate("/");
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>📝 Register</h2>

        <input placeholder="Name"
          onChange={(e) => setForm({...form, name: e.target.value})} />

        <input placeholder="Email"
          onChange={(e) => setForm({...form, email: e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={(e) => setForm({...form, password: e.target.value})} />

        <select
          onChange={(e) => setForm({...form, role: e.target.value})}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister}>Register</button>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#6366f1", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;