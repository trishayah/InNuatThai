import React, { useState } from "react";
import logo from "./assets/NUAT THAI LOGO.svg";
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import axios from "axios";

  function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // sets the default value to false

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username,
          password,
        });

        // Store user data and token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          username: response.data.username,
          role: response.data.role.toLowerCase(),
          name: response.data.name
        }));

        // Navigate to dashboard after successful login
        window.location.href = '/dashboard';
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
      }
    };

    const viewPassword = () => { // function helps to hide/show the password
      setShowPassword((showNewPassword) => !showNewPassword);
    };


    return (
      <div className="flex flex-row w-full min-h-screen bg-[#105D2B]">
        <div className="relative w-1/2 min-h-screen">
          {/* Logo - Positioned at the Center */}
          <img
            className="absolute w-[100px] sm:w-[190px] lg:w-[350px] h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain z-10"
            alt="Logo"
            src={logo}
          />
        </div>

        {/* Right Side Login Form */}
        <div
          className="relative w-1/2 flex flex-col justify-center items-center min-h-screen bg-cover bg-center">
          <div className="w-full sm:w-[420px] bg-[#D9D9D9] rounded-[15px] p-8 sm:p-12 flex flex-col items-center">
            {/* Welcome Text */}
            <div className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#105D2B] mb-6 font-poppins">
              Welcome!
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-sm mb-4 font-poppins">{errorMessage}</div>
            )}

            {/* Username Input */}
            <div className="relative w-full sm:w-[350px] h-[40px] sm:h-[40px] bg-white rounded-[10px] mb-4 flex items-center pl-4 font-poppins hover:ring-2 hover:ring-black">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-full bg-transparent text-black text-sm sm:text-base focus:outline-none pl-2 rounded-[15px]"
              />
            </div>

            {/* Password Input */}
            <div className="relative w-full sm:w-[350px] h-[40px] sm:h-[40px] bg-white rounded-[10px] mb-6 flex items-center pl-4 font-poppins hover:ring-2 hover:ring-black">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full bg-transparent text-black text-sm sm:text-base focus:outline-none pl-2 rounded-[15px]"
              />
              <button // button to hide/show password
                type="button"
                onClick={viewPassword} // calls the function to hide/shows password
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hoverloginBlue">
                {password !== '' ? (showPassword ? <FaRegEye /> : <FaRegEyeSlash />) : ''} {/*changes the icon if there's a text in textfield*/}
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-[60%] sm:w-[200px] h-[40px] sm:h-[40px] bg-[#105D2B] rounded-[15px] shadow-m3-elevation-light-4 text-white text-base sm:text-lg font-medium hover:bg-[#003d1a] transition duration-300"
            >
              LOGIN
            </button>

            {/* Forgot Password Link */}
            <div className="w-full flex justify-center mt-4">
              <div className="text-center text-[#105D2B] text-sm sm:text-base font-family-semibold italic">
                <Link to='/VerifyEmail' className="underline text-loginTextBlue hover:text-black cursor-pointer" >Forgot Password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default LogIn;
