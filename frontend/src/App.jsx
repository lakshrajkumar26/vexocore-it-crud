import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/layout/Navbar";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import TaskPage from "./components/task/TaskPage";
import UserContext from "./components/store/UserContext";
import FeaturesPage from "./components/pages/FeaturesPage";
import AboutPage from "./components/pages/AboutPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import NotFoundPage from "./components/pages/NotFoundPage";
import Dashboard from "./components/pages/Dashboard";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
         
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />

        <Route path="/task" element={<ProtectedRoute> <TaskPage /> </ProtectedRoute>} />
         <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
        
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
