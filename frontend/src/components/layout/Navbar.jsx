import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../store/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const Navigate = useNavigate();
  //logout
  const handleClick = () => {
     setUser(null)
     Navigate("/login")

  }
  return (
    <div>
      {/* Navbar */}
      <header className="w-full bg-white shadow-sm dark:bg-gray-900 border-b dark:text-white border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">TodoApp</h1>
          <nav className="space-x-6">
            <Link className="hover:text-blue-600" to="/">
              {" "}
              Home
            </Link>
            <Link className="hover:text-blue-600" to="/features">
              {" "}
              Features
            </Link>

            {user.name ? (
              <>
                {" "}
                <Link className="hover:text-blue-600" to="/task">
                  {" "}
                  Dashboard
                </Link>
                <Link className="hover:text-blue-600" to="/profile">
                  {" "}
                  Welcome, {user.name}
                </Link>
                <button className="hover:text-blue-600 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 " onClick={handleClick} >
                  {" "}
                  Logout
                </button>
              </>
            ) : (
              <>
                {" "}
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
              </>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
