import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, Star, Sun, Moon } from "lucide-react";
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handlePending = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await baseAPI.patch(`/api/task/${id}/status/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await baseAPI.patch(`/api/task/${id}/pending/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "important" && !todo.important) return false;
    if (activeTab === "tasks" && todo.type !== "task") return false;
    if (showCompleted && !todo.completed) return false;
    if (!showCompleted && todo.completed) return false;
    return true;
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Categories</h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <nav className="space-y-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${
                activeTab === "all"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Clock size={18} /> All
            </button>
            <button
              onClick={() => setActiveTab("important")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${
                activeTab === "important"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Star size={18} /> Important
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${
                activeTab === "tasks"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <CheckCircle size={18} /> Tasks
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold capitalize">{activeTab} Todos</h2>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {showCompleted ? "Show Pending" : "Show Completed"}
            </button>
          </div>

          {/* Todo List */}
          {filteredTodos.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No todos found.
            </p>
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
                  {/* Editable text / input */}
                  {editingId === todo._id ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(todo._id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(todo._id);
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

                  {todo.completed ? (
                    <CheckCircle
                      className="text-green-600 cursor-pointer"
                      onClick={() => handleComplete(todo._id)}
                    />
                    
                  ) : (
                    <Clock
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handlePending(todo._id)}
                    /> 
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
