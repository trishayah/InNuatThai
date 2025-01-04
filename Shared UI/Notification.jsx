import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const Notification = ({ modifiedItems }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setNotifications((prev) => [
      ...prev,
      ...modifiedItems.map(
        ({ inventoryNo, changes }) =>
          `Item ${inventoryNo} modified: ${JSON.stringify(changes)}`
      ),
    ]);
  }, [modifiedItems]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div style={{ position: "absolute", top: "41px", marginLeft: "880px",}}>
      <button onClick={handleNotificationClick}>
        <FaBell className="text-[#133517] " /> {/* Notification icon */}
      </button>
      {showNotifications && (
        <div className="notifications bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;