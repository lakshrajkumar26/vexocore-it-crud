import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg"; // replace with your logo path

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-48 mb-8" /> {/* Increased size */}

      <h1 className="text-8xl font-extrabold mb-6">404</h1> {/* Larger */}
      <p className="text-3xl mb-8">Oops! Page Not Found</p> {/* Larger */}

      <button
        onClick={() => navigate("/")}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl rounded-2xl shadow-lg transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
