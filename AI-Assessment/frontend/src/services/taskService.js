import API from "./api";

// 🔥 Get all tasks (user-specific from backend)
export const getTasks = async () => {
  const res = await API.get("/tasks/");
  return res.data;
};

// 🔥 Create task (ADMIN ONLY)
export const createTask = async (taskData) => {
  const res = await API.post("/tasks/", taskData);
  return res.data;
};

// 🔥 Submit task answer (USER)
export const submitTask = async (taskId, answer_text) => {
  const res = await API.put(`/tasks/${taskId}/submit`, {
    answer_text,
  });
  return res.data;
};