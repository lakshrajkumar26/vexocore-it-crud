import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, Star } from "lucide-react";
import baseAPI from "../axiosApi/axiosApi";

export default function TodoWithSidebar() {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showCompleted, setShowCompleted] = useState(false);

  const [editingId, setEditingId] = useState(null); // which todo is being edited
  const [editValue, setEditValue] = useState(""); // current input value

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
  }, []);

  // Start editing
  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditValue(todo.title);
  };

  // Save update
  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await baseAPI.put(
        `/api/task/${id}`,
        { title: editValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // update local state immediately
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, title: editValue } : t))
      );

      setEditingId(null);
      setEditValue("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Filter todos by tab & toggle
  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "important" && !todo.important) return false;
    if (activeTab === "tasks" && todo.type !== "task") return false;

    if (showCompleted && !todo.completed) return false;
    if (!showCompleted && todo.completed) return false;

    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Todo Categories</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <Clock size={18} /> All
          </button>
          <button
            onClick={() => setActiveTab("important")}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg ${
              activeTab === "important"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <Star size={18} /> Important
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg ${
              activeTab === "tasks"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <CheckCircle size={18} /> Tasks
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold capitalize">{activeTab} Todos</h2>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {showCompleted ? "Show Pending" : "Show Completed"}
          </button>
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <p className="text-gray-500">No todos found.</p>
        ) : (
          <div className="space-y-3">
            {filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
                  todo.completed ? "bg-green-50" : "bg-white"
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
                    className="flex-1 px-2 py-1 border rounded"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => handleEdit(todo)}
                    className={`cursor-pointer ${
                      todo.completed
                        ? "line-through text-gray-400 w-full"
                        : "text-lg"
                    }`}
                  >
                    {todo.text}
                  </span>
                )}

                {todo.completed ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <Clock className="text-yellow-500" />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
