import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';



function ChangePassword() {
    const [showNewPassword, setShowNewPassword] = useState(false); // sets the default value to false
    const [showReEnterPassword, setShowReEnterPassword] = useState(false);// sets the default value to false
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const toggleNewPasswordVisibility = () => { // function helps to hide/show the password
        setShowNewPassword((showNewPassword) => !showNewPassword);
    };

    const toggleReEnterPasswordVisibility = () => { // function helps to hide/show the re-enter password
        setShowReEnterPassword((showReEnterPassword) => !showReEnterPassword);
    };

    const typedNewPass = (e) => {
        setNewPassword(e.target.value)
    }

    const reEnterPass = (e) => {
        setConfirmPassword(e.target.value)
    }
    const FPfieldIcon = "absolute left-3 top-1/2 transform -translate-y-1/2 text-hoverloginBlue";

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-[#D9D9D9]">
            <div className="w-full sm:w-[420px] bg-white rounded-[15px] p-8 sm:p-12 flex flex-col items-center">
                <div className="text-center text-1xl sm:text-2xl lg:text-3xl font-bold text-[#105D2B] mb-4 font-poppins">
                    Set New Password
                </div>

                <div className="relative w-full sm:w-[350px] h-[40px] sm:h-[40px] bg-white rounded-[10px] mb-6 flex items-center pl-4 font-poppins ring-1 ring-[#D9D9D9] hover:ring-[#105D2B] transition duration-300">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={typedNewPass}
                        className="w-full h-full bg-transparent outline-none"
                    />
                    <button // button to hide/show password
                        type="button"
                        onClick={toggleNewPasswordVisibility} // calls the function to hide/shows password
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hoverloginBlue">
                        {newPassword !== '' ? (showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />) : ''} {/*changes the icon if there's a text in textfield*/}
                    </button>
                </div>
                <div className="relative w-full sm:w-[350px] h-[40px] sm:h-[40px] bg-white rounded-[10px] mb-6 flex items-center pl-4 font-poppins ring-1 ring-[#D9D9D9] hover:ring-[#105D2B] transition duration-300">
                    <input
                        type={showReEnterPassword ? "text" : "password"}
                        placeholder="Re-enter New Password"
                        value={confirmPassword}
                        onChange={reEnterPass}
                        className="w-full h-full bg-transparent outline-none"
                    />
                    <button // button to hide/show password
                        type="button"
                        onClick={toggleReEnterPasswordVisibility} // calls the function to hide/shows password
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hoverloginBlue"
                    >
                        {confirmPassword !== '' ? (showReEnterPassword ? <FaRegEye /> : <FaRegEyeSlash />) : ''} {/*changes the icon if there's a text in textfield*/}
                    </button>
                </div>
                <Link to="/">
                    <div className="w-full sm:w-[250px] h-[50px] sm:h-[40px] bg-[#105D2B] rounded-[10px] mb-4 flex items-center justify-center hover:bg-[#003d1a] transition duration-300 shadow-m3-elevation-light-4">
                        <button className="w-full h-full bg-transparent outline-none text-white font-bold">
                            Update Password
                        </button>
                    </div>
                </Link>
                {/* <p className="text-black mb-6 font-poppins" style={{ fontSize: "12px" }}>
                Password must be at least 8 characters long with at least one uppercase letter, one lowercase letter, one number, and one special character.
                </p> */}
            </div>
        </div>
    );
}

export default ChangePassword;
