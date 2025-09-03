import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  Star,
  Sun,
  Moon,
  Trash2,
  Plus,
} from "lucide-react";
import baseAPI from "../axiosApi/axiosApi";

export default function TodoWithSidebar() {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showCompleted, setShowCompleted] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch all todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await baseAPI.get("/api/task", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [refresh]);

  // Start editing
  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditValue(todo.text);
  };

  // Save update
  const handleSave = async (id) => {
    if (!editValue.trim()) return;
    try {
      const token = localStorage.getItem("token");
      await baseAPI.put(
        `/api/task/${id}`,
        { text: editValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, text: editValue } : t))
      );
      setEditingId(null);
      setEditValue("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Toggle task status
  const toggleStatus = async (id, completed) => {
    try {
      const token = localStorage.getItem("token");
      await baseAPI.patch(
        `/api/task/${id}/${completed ? "pending" : "status"}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await baseAPI.delete(`/api/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Add new task
  const handleAddTask = async () => {
    const taskText = prompt("Enter new task:");
    if (!taskText) return;

    try {
      const token = localStorage.getItem("token");
      const res = await baseAPI.post(
        "/api/task",
        { text: taskText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prev) => [res.data?.data, ...prev]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle important
  const toggleImportant = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await baseAPI.patch(
        `/api/task/${id}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );
    } catch (err) {
      console.error("Error marking important:", err);
    }
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    const today = new Date();
    const taskDate = new Date(todo.createdAt);

    const isToday =
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate();

    if (activeTab === "today" && !isToday) return false;
    if (activeTab === "important" && !todo.important) return false;
    if (activeTab === "tasks" && todo.type !== "task") return false;
    if (showCompleted && !todo.completed) return false;
    return true;
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Categories</h2>
          </div>
          <nav className="space-y-3">
            {["all", "today", "important", "tasks"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {tab === "all" && <Clock size={18} />}
                {tab === "today" && <Sun size={18} />}
                {tab === "important" && <Star size={18} />}
                {tab === "tasks" && <CheckCircle size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold capitalize">{activeTab} Todos</h2>
            <div className="flex gap-2">
              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
              >
                <Plus size={16} /> Add Task
              </button>
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                {showCompleted ? "Show Pending" : "Show Completed"}
              </button>
            </div>
          </div>

          {/* Todo List */}
          {filteredTodos.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No todos found.</p>
          ) : (
            <div className="space-y-4">
              {filteredTodos.map((todo) => (
                <div
                  key={todo._id}
                  className={`flex items-center justify-between p-4 rounded-xl shadow-md transition ${
                    todo.completed
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  {editingId === todo._id ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(todo._id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(todo._id);
                        if (e.key === "Escape") {
                          setEditingId(null);
                          setEditValue("");
                        }
                      }}
                      className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => handleEdit(todo)}
                      className={`cursor-pointer flex-1 ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-lg"
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    {todo.completed ? (
                      <CheckCircle
                        className="text-green-600 cursor-pointer"
                        onClick={() => toggleStatus(todo._id, true)}
                      />
                    ) : (
                      <Clock
                        className="text-yellow-500 cursor-pointer"
                        onClick={() => toggleStatus(todo._id, false)}
                      />
                    )}
                    <Trash2
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(todo._id)}
                    />
                    <Star
                      className={`cursor-pointer ${
                        todo.important ? "text-yellow-400" : "text-gray-400"
                      }`}
                      onClick={() => toggleImportant(todo._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
