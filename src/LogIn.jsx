import React, { useState } from "react";
import logo from "./assets/NUAT THAI LOGO.svg";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Username and password cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      // Store user data and token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: response.data.username,
          role: response.data.role.toLowerCase(),
          name: response.data.name,
        })
      );
  
      // Navigate to dashboard after successful login
      window.location.href = "/dashboard";
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        (error.response?.status === 500
          ? "Server error. Please try again later."
          : "Login failed. Please check your credentials.");
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-row w-full min-h-screen bg-[#105D2B]">
      <div className="relative w-1/2 min-h-screen">
        <img
          className="absolute w-[100px] sm:w-[190px] lg:w-[350px] h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain z-10"
          alt="Logo"
          src={logo}
        />
      </div>
      <div className="relative w-1/2 flex flex-col justify-center items-center min-h-screen bg-cover bg-center">
        <div className="w-full sm:w-[420px] bg-[#D9D9D9] rounded-[15px] p-8 sm:p-12 flex flex-col items-center">
          <div className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#105D2B] mb-6 font-poppins">
            Welcome!
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4 font-poppins">{errorMessage}</div>
          )}

          <div className="relative w-full sm:w-[350px] h-[40px] bg-white rounded-[10px] mb-4 flex items-center pl-4 font-poppins hover:ring-2 hover:ring-black">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-full bg-transparent text-black text-sm sm:text-base focus:outline-none pl-2 rounded-[15px]"
            />
          </div>

          <div className="relative w-full sm:w-[350px] h-[40px] bg-white rounded-[10px] mb-6 flex items-center pl-4 font-poppins hover:ring-2 hover:ring-black">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full bg-transparent text-black text-sm sm:text-base focus:outline-none pl-2 rounded-[15px]"
            />
            <div
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hoverloginBlue"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-[60%] sm:w-[200px] h-[40px] bg-[#105D2B] rounded-[15px] shadow-m3-elevation-light-4 text-white text-base sm:text-lg font-medium hover:bg-[#003d1a] transition duration-300"
          >
            {isLoading ? "Logging in..." : "LOGIN"}
          </button>

          <div className="w-full flex justify-center mt-4">
            <Link
              to="/VerifyEmail"
              className="text-[#105D2B] text-sm sm:text-base underline hover:text-black"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;