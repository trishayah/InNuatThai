import React, { useState } from "react";
import logo from "../src/assets/NUAT THAI LOGO2.png";
import {
  MdDashboard,
  MdAssignment,
  MdInventory,
  MdDescription,
  MdArchive,
  MdLogout,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const menuItems = {
  admin: [
    { name: "Dashboard", url: "/dashboard", icon: MdDashboard },
    { name: "Request", url: "/request", icon: MdAssignment },
    { name: "Inventory", url: "/inventory", icon: MdInventory },
    {
      name: "Reports",
      icon: MdDescription,
      isDropdown: true,
      subItems: [
        { name: "Delivery Instruction Form", route: "/dif" },
        { name: "Stock Receiving Report", route: "/wsrr" },
        { name: "Purchase Order", route: "/po" },
      ],
    },
    // { name: "Archive", url: "/archive", icon: MdArchive },
  ],
  accounting: [
    { name: "Dashboard", url: "/dashboard", icon: MdDashboard },
    { name: "Request", url: "/request", icon: MdAssignment },
    {name: "Inventory", url: "/inventory", icon: MdInventory,},
    {
      name: "Reports",
      icon: MdDescription,
      isDropdown: true,
      spacing: true,
      subItems: [
        {name: "Delivery Instruction Form", route: "/dif",},
        { name: "Stock Receiving Report", route: "/wsrr" },
        { name: "Purchase Order", route: "/po" },
      ],
    },
    // { name: "Archive", url: "/archive", icon: MdArchive },
  ],
  warehouse: [
    { name: "Dashboard", url: "/dashboard", icon: MdDashboard },
    { name: "Inventory", url: "/inventory", icon: MdInventory },
    // { name: "Archive", url: "/archive", icon: MdArchive },
  ],
  branch: [
    { name: "Dashboard", url: "/dashboard", icon: MdDashboard },
    { name: "Request", url: "/branchreq", icon: MdAssignment },
    // { name: "Archive", url: "/archive", icon: MdArchive },
  ],
};

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user")); // Get user details
  const role = user?.role;

  // Ensure role exists in menuItems
  const userMenu = menuItems[role];

  if (!userMenu) {
    console.error("Invalid role or menu configuration:", role);
    return <div className="text-white p-4">No menu available for this role.</div>;
  }

  const toggleDropdown = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleLogout = () => {
    // Show confirmation prompt
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
      // Remove user data and token from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Redirect to login page
      navigate('/');
    }
  };

  
  const renderMenu = (items) =>
    items.map((item, index) => (
      <div key={index} className="mb-4">
        {/* dropdown menu */}
        {item.isDropdown ? (
          <div>
            <button
              onClick={() => toggleDropdown(item.name)}
              className="w-full flex items-center justify-between px-6 py-3 hover:bg-[#003d1a] transition duration-300 text-white font-poppins text-base"
            >
              <div className="flex items-center gap-4">
                <item.icon className="w-6 h-6 mr-4"/>
                <span>{item.name}</span>
              </div>
              {activeMenu === item.name ? (
                <MdKeyboardArrowUp className="w-6 h-6" />
              ) : (
                <MdKeyboardArrowDown className="w-6 h-6" />
              )}
            </button>
            {activeMenu === item.name && (
              <ul className="bg-[#224430] py-2">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="pl-16 py-2 hover:bg-[#003d1a]">
                    <a href={subItem.route} className="text-white text-base font-poppins">
                      {subItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          // Regular menu 
          <a
            href={item.url}
            className="group flex items-center px-6 py-3 hover:bg-[#003d1a] transition duration-300 text-white font-poppins text-base"
          >
            <item.icon className="mr-4 w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="ml-4 group-hover:scale-110 transition-transform">{item.name}</span>
          </a>
        )}
      </div>
    ));

  return (
    <>
      {/* Sidebar Container */}
      <div
        className="fixed top-0 left-0 h-screen bg-[#105D2B] shadow-2xl z-50 transition-transform duration-500"
        style={{
          width: "250px",
        }}
      >
        {/* Logo Section */}
        <div className="flex justify-center items-center py-6 bg-[#003d1a] mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 mt-4">{renderMenu(menuItems[role] || [])}</nav>

        {/* Logout Button */}
        <div className="logout absolute bottom-0 w-full">
          <button
            onClick={handleLogout}  // Attach the handleLogout to the button
            className="flex items-center gap-4 px-6 py-3 hover:bg-[#003d1a] transition duration-300 text-white text-lg font-poppins w-full"
          >
            <MdLogout className="w-6 h-6 group-hover:scale-110 transition-transform mr-4" />
            <span className="group-hover:scale-110 transition-transform">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
