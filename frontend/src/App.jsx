import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/layout/Navbar";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import TaskPage from "./components/task/TaskPage";
import UserContext from "./components/store/UserContext";

function App() {
  const [user, setUser] = useState({})
  //   {
  //   const savedUser = localStorage.getItem("user");
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });

  // useEffect(() => {
  //   if (user) {
  //     console.log(user?.name);
  //     localStorage.setItem("user", JSON.stringify(user));
  //   } else {
  //     localStorage.removeItem("user");
  //   }
  // }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/task" element={<TaskPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
