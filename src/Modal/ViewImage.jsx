import React from 'react';
import { FaXmark } from "react-icons/fa6";

const ViewImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative">
        <img src={imageUrl} alt="Selected" className="max-w-[90vw] max-h-[90vh]" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#105D2B] text-white rounded-full p-2"
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
};

export default ViewImage;
