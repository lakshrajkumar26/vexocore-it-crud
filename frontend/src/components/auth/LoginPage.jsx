import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseAPI from "../axiosApi/axiosApi";
import UserContext from "../store/UserContext";

const LoginPage = () => {

  const {user,setUser} = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
 const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const res = await baseAPI.post("/api/auth/login", formData);
      console.log(res);

      if (res?.data.success) setMessage(res?.data?.message);
      //  console.log(res.data.data)
      const token = res.data?.token;
      const userData = res.data?.data;

      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData)); 
      navigate("/task")
    } catch (err) {
      
      setError(err?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-row bg-gray-100 text-gray-900 dark:bg-gray-900  dark:text-white ">
        <div className=" flex  flex-1 justify-center items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">Vaid PR EMS Portal</h1>
            <p className="text-sm text-gray-900 dark:text-gray-400 py-2">
              Personal relation company to handle the relationship for you. so
              you can work peacefully.
            </p>
          </div>
          {/* left section */}
        </div>
        {/* right section */}
        <div className="flex flex-1 justify-center items-center ">
          <div className=" bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-80 p-10 m-2  shadow-lg rounded-2xl w-full max-w-md">
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">
              {" "}
              Welcome to Vaid PR{" "}
            </h2>
            <p className="text-sm text-gray-900 dark:text-gray-400 mb-4">
              Log in to continue with blogs
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6">
                <label className="mb-2 ">Email</label>
                <input
                  className="py-2 px-4 bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>
              <div className=" flex flex-col mb-6">
                <label className="mb-2">password</label>
                <input
                  className=" px-4 py-2 bg-gray-100  dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                />
              </div>

            
              <button
                type="submit"
                className="mb-4 bg-blue-600 hover:bg-blue-800  w-full p-2 rounded-xl text-white"
              >
                {" "}
                Log in
              </button>
            </form>

            <div className="flex justify-between items-center ">
              {" "}
              <p className="text-sm text-gray-900 dark:text-gray-400 py-2">
                Not a member yet?
                <Link  to="/register" className="text-blue-500 hover:underline text-base px-1">
                  Sign Up
                </Link>
              </p>
              <Link  className="text-sm text-gray-900 dark:text-gray-400 py-2 hover:text-blue-500 ">
                forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
