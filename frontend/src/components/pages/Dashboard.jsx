import React, { useEffect, useState } from "react";
import baseAPI from "../axiosApi/axiosApi";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await baseAPI.get("/api/task", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const today = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Today: {today}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Tasks</h2>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>

        {/* Completed Tasks */}
        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Completed</h2>
          <p className="text-2xl font-bold">{completedTasks}</p>
        </div>

        {/* Pending Tasks */}
        <div className="p-6 bg-yellow-100 dark:bg-yellow-800 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Pending</h2>
          <p className="text-2xl font-bold">{pendingTasks}</p>
        </div>

        {/* Completion Percentage */}
        <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Completion</h2>
          <p className="text-2xl font-bold">{completionPercent}%</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
