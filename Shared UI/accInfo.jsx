import React from 'react';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AccInfo = ({ user }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/editprofile"); // Adjust the route to match your routing setup
  }
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-green-100 rounded-full p-2">
        <FiUser className="w-5 h-5 text-green-600 mr-1" />
      </div>
      <div>
        <p className="text-sm font-medium font-poppins text-green-900">{user?.name || "User"}</p>
      </div>
    </div>
  );
};

export default AccInfo;

