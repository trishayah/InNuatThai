import React, { useState } from "react";
import logo from "../src/assets/NUAT THAI LOGO.svg"
const Sidebar = ({ role }) => {
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleDropdown = (menuName) => {
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

    // Centralized menu structure
    const menuItems = {
        admin: [
            { name: "Dashboard", url: "/dashboard" },
            { name: "Request", url: "/request" },
            { name: "Inventory", url: "/inventory" },
            {
                name: "Reports",
                isDropdown: true,
                subItems: [
                    { name: "Delivery Instruction Form", route: "/reports/dif" },
                    { name: "Warehouse Stock Receiving Report", route: "/reports/wsrr" },
                    { name: "Purchase Order", route: "/reports/po" },
                ],
            },
            { name: "Archive", url: "/archive" },
            { name: "Sign Out", url: "/signout" },
        ],
        accounting: [
            { name: "Dashboard", url: "/dashboard" },
            { name: "Request", url: "/request" },
            { name: "Inventory", url: "/inventory" },
            {
                name: "Reports",
                isDropdown: true,
                subItems: [
                    { name: "Delivery Instruction Form", route: "/reports/dif" },
                    { name: "Warehouse Stock Receiving Report", route: "/reports/wsrr" },
                    { name: "Purchase Order", route: "/reports/po" },
                ],
            },
            { name: "Archive", url: "/archive" },
            { name: "Sign Out", url: "/signout" },
        ],
        warehouse: [
            { name: "Dashboard", url: "/dashboard" },
            { name: "Inventory", url: "/inventory" },
            { name: "Archive", url: "/archive" },
            { name: "Sign Out", url: "/signout" },
        ],
        branch: [
            { name: "Dashboard", url: "/dashboard" },
            { name: "Request", url: "/request" },
            { name: "Archive", url: "/archive" },
            { name: "Sign Out", url: "/signout" },
        ],
    };

    // Function to render menu
    const renderMenu = (items) => (
        items.map((item, index) => (
            <div key={index}>
                {item.isDropdown ? (
                    <div>
                        <button
                            onClick={() => toggleDropdown(item.name)}
                            className="w-full text-left px-4 py-2 hover:bg-[#001302] transition-colors flex justify-between items-center text-white font-poppins"
                        >
                            <span>{item.name}</span>
                            <span>{activeMenu === item.name ? "▲" : "▼"}</span>
                        </button>
                        {activeMenu === item.name && (
                            <div className="bg-[#133517]">
                                {item.subItems.map((subItem, subIndex) => (
                                    <a
                                        key={subIndex}
                                        href={subItem.route}
                                        className="block px-6 py-2 hover:bg-[#001302] text-white"
                                    >
                                        {subItem.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <a
                        href={item.url}
                        className="block px-4 py-2 hover:bg-[#001302] transition-colors text-white font-poppins"
                    >
                        {item.name}
                    </a>
                )}
            </div>
        ))
    );

    return (
        <div className="h-screen bg-[#26582D] w-64 flex flex-col justify-between text-white font-poppins">
            <div className="p-4">
                <img
                    className="w-[80px] sm:w-[120px] lg:w-[150px] h-auto object-contain"
                    alt="Logo"
                    src={logo}
                />
            </div>

            {/* Menu Items */}
            <nav className="space-y-2">
                {renderMenu(menuItems[role] || [])}
            </nav>
        </div>
       
    );
};

export default Sidebar;
