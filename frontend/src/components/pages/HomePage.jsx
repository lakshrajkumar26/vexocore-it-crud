import React from "react";
import { CheckCircle, Plus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Organize your day with <span className="text-blue-600">TodoApp</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Stay productive, manage your tasks, and never miss a deadline.  
          A simple, elegant, and fast way to track your daily todos.
        </p>
        <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700">
          <Plus size={20} /> Create Your First Task
        </button>
      </section>

      {/* Task Preview Section */}
      <section id="tasks" className="bg-white py-12 shadow-inner">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-center">Task Preview</h3>
          <div className="space-y-4">
            {["Finish React project", "Buy groceries", "Read 20 pages of book"].map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm"
              >
                <span className="text-lg">{task}</span>
                <CheckCircle className="text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-100 py-4 text-center text-gray-500">
        © {new Date().getFullYear()} TodoApp. All rights reserved.
      </footer>
    </div>
  );
}
