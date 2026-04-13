import { useEffect, useState } from 'react';
import api from '../services/api';
import './Analytics.css';

export default function Analytics() {
  const [stats, setStats] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0,
    total_documents: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/analytics');

        // 🔥 FIX: handle both possible response formats
        const data = res.data?.data || res.data;

        setStats({
          total_tasks: data.total_tasks || 0,
          completed_tasks: data.completed_tasks || 0,
          pending_tasks: data.pending_tasks || 0,
          total_documents: data.total_documents || 0,
        });
      } catch (error) {
        console.error("Analytics API error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Analytics</h2>

      <div className="analytics-grid">
        <div className="analytics-card">
          📊 Total Tasks: {stats.total_tasks}
        </div>

        <div className="analytics-card">
          ✅ Completed: {stats.completed_tasks}
        </div>

        <div className="analytics-card">
          ⏳ Pending: {stats.pending_tasks}
        </div>

        <div className="analytics-card">
          📁 Total Documents: {stats.total_documents}
        </div>
      </div>
    </div>
  );
}