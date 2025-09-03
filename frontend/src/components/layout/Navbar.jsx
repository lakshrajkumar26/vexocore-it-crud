import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../store/UserContext";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Logout
  const handleClick = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm dark:bg-gray-900 border-b dark:text-white border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">TodoApp</h1>

        <nav className="space-x-6 flex items-center">
          <Link className="hover:text-blue-600" to="/">Home</Link>
          <Link className="hover:text-blue-600" to="/features">Features</Link>
          

          {user?.name ? (
            <>
               <Link className="hover:text-blue-600" to="/task">Your Tasks</Link>
              <Link className="hover:text-blue-600" to="/dashboard">Dashboard</Link>

              <Link className="hover:text-blue-600" to="/profile">
                Welcome, {user.name}
              </Link>
             
              <button
                onClick={handleClick}
                className="hover:text-blue-600 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
                  Login
                </button>
              </Link>
              <Link className="hover:text-blue-600" to="/about">About</Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
