import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";
  const role = (localStorage.getItem("role") || "").toLowerCase();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      
      {/* LEFT SIDE */}
      <div className="nav-left">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="profile-img"
        />

        <div>
          <p className="username">{username}</p>
          <p className="role">{role}</p>
        </div>
      </div>

      {/* CENTER TITLE */}
      <h3>AI Task System</h3>

      {/* RIGHT SIDE */}
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;