import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';

const Notification = ({ modifiedItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <FiBell className="w-5 h-5 text-green-600" />
        {modifiedItems.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {modifiedItems.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="py-2">
            {modifiedItems.length > 0 ? (
              modifiedItems.map((item, index) => (
                <div key={index} className="px-4 py-2 hover:bg-gray-100">
                  <p className="text-sm text-gray-700">
                    {item.message}
                  </p>
                </div>
              ))
            ) : (
              <p className="px-4 py-2 text-sm text-gray-700">No new notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

