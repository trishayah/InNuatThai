import React, { useState } from "react";
import { Link } from 'react-router-dom';
// import Logo from './assets/NUAT THAI LOGO.svg'; 

function VerifyEmail() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#105D2B] bg-opacity-50">
      <div className="w-full sm:w-[400px] bg-white rounded-[10px] p-8 sm:p-12 flex flex-col items-center relative">

        {/* Content */}
        <div className="text-center text-1xl sm:text-2xl lg:text-3xl font-bold text-[#105D2B] mb-4 font-poppins">
          Forgot Password
        </div>
        <p className="text-black mb-6 font-poppins" style={{ fontSize: "12px" }}>
          Enter your email to receive a verification code.
        </p>
        <div className="relative w-full sm:w-[350px] h-[40px] sm:h-[40px] bg-white rounded-[10px] mb-6 flex items-center pl-4 font-poppins ring-1 ring-[#D9D9D9] hover:ring-[#105D2B] transition duration-300">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
        <Link to="/VerifyCode">
          <div className="w-full sm:w-[250px] h-[40px] sm:h-[40px] bg-[#105D2B] rounded-[10px] mb-4 flex items-center justify-center hover:bg-[#003d1a] transition duration-300 shadow-m3-elevation-light-4">
            <button className="w-full h-full bg-transparent outline-none text-white font-bold">
              Submit
            </button>
          </div>
        </Link>
        <Link to="/">
          <div className="w-full sm:w-[250px] h-[50px] sm:h-[40px] bg-[#105D2B] rounded-[10px] mb-4 flex items-center justify-center hover:bg-[#003d1a] transition duration-300 shadow-m3-elevation-light-4">
            <button className="w-full h-full bg-transparent outline-none text-white font-bold">
              Cancel
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmail;
