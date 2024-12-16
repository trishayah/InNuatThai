import React, { useState } from "react";
import logo from "../src/assets/NUAT THAI LOGO.svg";
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

const Sidebar = ({ role }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleDropdown = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

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
          { name: "Delivery Instruction Form", route: "/reports/dif" },
          { name: "Stock Receiving Report", route: "/reports/wsrr" },
          { name: "Purchase Order", route: "/reports/po" },
        ],
      },
      { name: "Archive", url: "/archive", icon: MdArchive },
    ],
    accounting: [
      { name: "Dashboard", url: "/dashboard", icon: MdDashboard },
      { name: "Request", url: "/request", icon: MdAssignment },
      {
        name: "Inventory",
        url: "/inventory",
        icon: MdInventory,
        spacing: true,
      },
      {
        name: "Reports",
        icon: MdDescription,
        isDropdown: true,
        spacing: true,
        subItems: [
          {
            name: "Delivery Instruction Form",
            route: "/reports/dif",
            spacing: true,
          },
          { name: "Stock Receiving Report", route: "/reports/wsrr" },
          { name: "Purchase Order", route: "/reports/po" },
        ],
      },
      { name: "Archive", url: "/archive", icon: MdArchive },
    ],
    warehouse: [
      { name: "Dashboard", url: "/dashboard", icon: MdDashboard },
      { name: "Inventory", url: "/inventory", icon: MdInventory },
      { name: "Archive", url: "/archive", icon: MdArchive },
    ],
    branch: [
      { name: "Dashboard", url: "/dashboard", icon: MdDashboard },
      { name: "Request", url: "/request", icon: MdAssignment },
      { name: "Archive", url: "/archive", icon: MdArchive },
    ],
  };

  const renderMenu = (items) =>
    items.map((item, index) => (
      <div key={index} className="mb-2">
        {item.isDropdown ? (
          <div>
            <button
              onClick={() => toggleDropdown(item.name)}
              className="ml-1 w-full justify-between items-center px-6 py-4 hover:bg-[#003d1a] transition duration-300 text-white font-medium text-lg flex gap-8"
            >
              <div className="flex items-center gap-10 w-full ml-1">
                <item.icon className="w-6 h-6" />
                <span>{item.name}</span>
              </div>
              {activeMenu === item.name ? (
                <MdKeyboardArrowUp className="w-6 h-6" />
              ) : (
                <MdKeyboardArrowDown className="w-6 h-6" />
              )}
            </button>
            {activeMenu === item.name && (
              <ul className="bg-[#224430] py-2 ml-1">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="pl-16 py-3 hover:bg-[#003d1a]">
                    <a href={subItem.route} className="text-white text-base">
                      {subItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <a
            href={item.url}
            className="flex items-center px-6 py-4 hover:bg-[#003d1a] transition duration-300 text-white font-medium text-lg gap-10"
          >
            <item.icon className="w-6 h-6" />
            <span>{item.name}</span>
          </a>
        )}
      </div>
    ));

  return (
    <div className="h-screen bg-[#105D2B] w-72 flex flex-col justify-between text-white">
      {/* <img src={logo} alt="Logo" className="inline-flex float-left w-2 h-3" /> */}

      <nav className="flex-1">{renderMenu(menuItems[role] || [])}</nav>

      <div className="mb-6">
        <a
          href="/signout"
          className="flex items-center px-6 py-4 hover:bg-[#003d1a] transition duration-300 text-white font-medium text-lg gap-10"
        >
          <MdLogout className="w-6 h-6" />
          <span>Sign Out</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
