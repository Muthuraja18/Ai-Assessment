import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    API.get("/tasks/")   // ✅ FIXED
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const submitTask = async (taskId) => {
    const answer = answers[taskId];

    if (!answer || answer.trim() === "") {
      alert("Please write an answer before submitting");
      return;
    }

    try {
      await API.put(`/tasks/${taskId}/submit`, {
        answer_text: answer
      });

      alert("Task submitted successfully");

      // update UI instantly
      setTasks(prev =>
        prev.map(t =>
          t.id === taskId ? { ...t, status: "completed" } : t
        )
      );

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.detail || "Submission failed");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="border p-4 my-3 rounded">

            <TaskCard task={task} />

            <textarea
              className="w-full border mt-2 p-2"
              placeholder="Write your answer..."
              value={answers[task.id] || ""}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [task.id]: e.target.value
                })
              }
            />

            <button
              onClick={() => submitTask(task.id)}
              className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
            >
              Submit Task
            </button>

            <p className="mt-2">
              Status: <b>{task.status}</b>
            </p>

          </div>
        ))
      )}
    </Layout>
  );
}

export default Tasks;