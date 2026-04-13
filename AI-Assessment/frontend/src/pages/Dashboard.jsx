import Layout from "../components/Layout";

function Dashboard() {
  let role = "";

  try {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <Layout>
      <h1>Dashboard</h1>

      <p>Welcome 👋</p>
      <p>Role: {role}</p>

      {/* ✅ ADMIN VIEW */}
      {role === "admin" && (
        <div>
          <div className="card">Total Users</div>
          <div className="card">All Tasks</div>
          <div className="card">Analytics</div>
        </div>
      )}

      {/* ✅ USER VIEW */}
      {role === "user" && (
        <div>
          <div className="card">My Tasks</div>
          <div className="card">My Progress</div>
          <div className="card">My Documents</div>
        </div>
      )}

    </Layout>
  );
}

export default Dashboard;