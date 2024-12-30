import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";
import AccInfo from "./accInfo";
import sortIcon from "../src/assets/filter 1.png";
import createIcon from "../src/assets/inventory 3.png";
import BranchCreateRequest from "../Shared UI/branchCreateReq.jsx";


function Request() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Sample data
  const sampleData = [
    {
      requestNo: "001",
      title: "Laptop Repair",
      branch: "Main",
      requestDate: "2024-12-01",
      requester: "John Doe",
      status: "Pending",
    },
    {
      requestNo: "002",
      title: "Printer Cartridge",
      branch: "Branch A",
      requestDate: "2024-12-02",
      requester: "Jane Smith",
      status: "Approved",
    },
    {
      requestNo: "003",
      title: "Projector Maintenance",
      branch: "Branch B",
      requestDate: "2024-12-10",
      requester: "Michael Johnson",
      status: "Completed",
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setRequests(sampleData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSort = (order) => {
    const sortedRequests = [...requests].sort((a, b) =>
      order === "asc"
        ? a.requestNo.localeCompare(b.requestNo)
        : b.requestNo.localeCompare(a.requestNo)
    );
    setRequests(sortedRequests);
    setSortOrder(order);
    setShowDropdown(false); // Close dropdown after sorting
  };

  const handleCreateRequest = () => {
    navigate("approvaladdinventory");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col w-full min-w-screen h-screen min-h-screen bg-[#D9D9D9]">
      <div className="flex justify-between items-center p-4">
      <h2 className="text-2xl font-semibold font-poppins text-[#133517] mt-4 ml-6">Request Status</h2>

        <AccInfo user={user} />
      </div>
      
      <div className="requestTable">
        <div className="flex items-center justify-between mt-8 ml-4 mr-4">
          <SearchBar />

          
          <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
            {/* Sort By Button */}
            <button
             onClick={() => setShowDropdown((prev) => !prev)}
             className="flex items-center justify-center sm:justify-start w-[40px] sm:w-[150px] h-[30px] bg-[#105D2B] rounded-[15px] shadow-m3-elevation-light-4 text-white text-base sm:text-lg font-poppins font-medium hover:bg-[#003d1a] transition duration-300 ml-6"
           >
            
             <span className="hidden sm:inline">Sort by</span>

             <img
               src={sortIcon}
               alt="Sort Icon"
               className="w-4 h-4 sm:w-6 sm:h-6 ml-2"
             />
            </button>
            {showDropdown && (
              <div className="absolute top-20 left-0 bg-[#105D2B] text-white shadow-lg rounded-b-[15px] w-full sm:w-[150px] z-10">
   
    <ul className="py-2 font-poppins">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-200"
                    onClick={() => handleSort("asc")}
                  >
                    Ascending
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-200"
                    onClick={() => handleSort("desc")}
                  >
                    Descending
                  </li>
                </ul>
              </div>
            )}
            {/* Create Request Button */}
            <button
              onClick={handleCreateRequest}
              className="flex items-center justify-center sm:justify-start w-[40px] sm:w-[200px] h-[30px] bg-[#105D2B] rounded-[15px] shadow-m3-elevation-light-4 text-white text-base sm:text-lg font-poppins font-medium hover:bg-[#003d1a] transition duration-300 ml-6"
            >
              <img
                src={createIcon}
                alt="Create Icon"
                className="w-4 h-4 sm:w-6 sm:h-6 mr-2"
              />
              <span className="hidden sm:inline">Create Request</span>
            </button>
          </div>
        </div>
        <table className="table-fixed border-spacing-2 w-full border-collapse border border-gray-300 font-poppins font-semibold">
          <thead>
            <tr
              style={{ backgroundColor: "#133517", color: "#FFFFFF" }}
              className="border border-gray-300"
            >
              <th className="px-4 py-2 text-center">Request No.</th>
              <th className="px-4 py-2 text-center">Title</th>
              <th className="px-4 py-2 text-center">Branch</th>
              <th className="px-4 py-2 text-center">Request Date</th>
              <th className="px-4 py-2 text-center">Requester</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request.requestNo}
                onClick={() => navigate(`/request/${request.requestNo}`)}
                style={{
                  backgroundColor: index % 2 === 0 ? "#FFF5F5" : "#D3DDD6",
                  cursor: "pointer",
                }}
              >
                <td className="px-4 py-2 border text-center">{request.requestNo}</td>
                <td className="px-4 py-2 border text-center">{request.title}</td>
                <td className="px-4 py-2 border text-center">{request.branch}</td>
                <td className="px-4 py-2 border text-center">{request.requestDate}</td>
                <td className="px-4 py-2 border text-center">{request.requester}</td>
                <td className="px-4 py-2 border text-center">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Request;
