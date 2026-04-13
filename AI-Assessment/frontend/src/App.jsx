import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import Tasks from "./pages/Tasks";

import AdminDocuments from "./pages/AdminDocuments";   // ✅ NEW
import UserDocuments from "./pages/UserDocuments";     // ✅ NEW

import Search from "./pages/Search";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* COMMON */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />

        {/* 🔥 ROLE SEPARATED DOCUMENT PAGES */}
        <Route path="/admin-documents" element={<AdminDocuments />} />
        <Route path="/user-documents" element={<UserDocuments />} />

        {/* ADMIN ONLY FEATURES */}
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* USER FEATURE */}
        <Route path="/search" element={<Search />} />
        

      </Routes>
    </Router>
  );
}

export default App;