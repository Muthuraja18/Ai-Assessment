import { useState } from "react";
import API from "../services/api";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const createTask = async () => {
    try {
      if (!title || !description || !assignedTo) {
        alert("Please fill all fields");
        return;
      }

      const res = await API.post("/tasks/", {
        title,
        description,
        assigned_to: Number(assignedTo),
      });

      console.log("TASK CREATED:", res.data);

      alert("Task created successfully");

      setTitle("");
      setDescription("");
      setAssignedTo("");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.detail || "Error creating task");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Create Task (Admin)</h2>

      <input
        className="border p-2 w-full mt-2"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mt-2"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2 w-full mt-2"
        placeholder="Assign User ID"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />

      <button
        onClick={createTask}
        className="bg-green-600 text-white px-4 py-2 mt-3"
      >
        Create Task
      </button>
    </div>
  );
}