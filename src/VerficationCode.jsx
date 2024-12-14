import React, { useState } from "react";
import { Link } from 'react-router-dom'


function VerifyCode() {
    const [code, setCode] = useState("");

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-[#D9D9D9]">
            <div className="w-full sm:w-[400px] bg-white rounded-[10px] p-8 sm:p-12 flex flex-col items-center relative">
                <div className="text-center text-1xl sm:text-2xl lg:text-3xl font-bold text-[#105D2B] mb-4 font-poppins">
                    Check your email
                </div>
                <p className="text-black mb-6 font-poppins" style={{ fontSize: "12px" }}>
                    Enter the 6-digit verification code that was sent to your email.
                </p>

                <div className="relative w-full sm:w-[350px] h-[40px] sm:h-[40px] bg-white rounded-[10px] mb-6 flex items-center pl-4 font-poppins ring-1 ring-[#D9D9D9] hover:ring-[#105D2B] transition duration-300">
                    <input
                        type="number"
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-transparent outline-none"
                    />
                </div>
                <Link to="/ChangePassword" >
                    <div className="w-full sm:w-[250px] h-[40px] sm:h-[40px] bg-[#105D2B] rounded-[10px] mb-4 flex items-center justify-center hover:bg-[#003d1a] transition duration-300 shadow-m3-elevation-light-4">
                        <button className="w-full h-full bg-transparent outline-none text-white font-bold">
                            Verify
                        </button>
                    </div>
                </Link>
                <p className="text-black mb-6 font-poppins" style={{ fontSize: "12px" }}>
                    Didn't receive the code?
                </p>
            </div>
        </div>
    );
}

export default VerifyCode;
