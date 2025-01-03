import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AccInfo = ({ user }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/editprofile"); // Adjust the route to match your routing setup
  }

  return (
    <div className="account">
      <div className="absolute top-4 right-4 flex items-center space-x-2 cursor-pointer" onClick={handleEditProfile}>
        <div className="flex flex-col items-end mr-[4rem] h-full font-poppins">
          <div className="flex items-center space-x-4 p-2 mt-3">
            <MdAccountCircle className="w-6 h-6 text-[#105D2B]" />
            <p className="text-base font-medium text-[#105D2B]">
              {user?.name || "User"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccInfo;