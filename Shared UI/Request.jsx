import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";
import AccInfo from "./AccInfo.jsx";
import DIFDownload from "./DIFDownloadButton.jsx";
import PODownload from "./PODownloadButton.jsx";

function Request() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]); // For displaying filtered results
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sampleData = [
    {
      requestNo: "001",
      title: "Massage Bed",
      branch: "Main",
      requestDate: "2024-12-01",
      dateNeeded: "2025-2-5",
      requester: "John Doe",
      status: "Pending",
    },
    {
      requestNo: "002",
      title: "Uniform",
      branch: "Branch A",
      requestDate: "2024-12-02",
      dateNeeded: "2025-2-15",
      requester: "Jane Smith",
      status: "Approved",
    },
    {
      requestNo: "003",
      title: "Essential Oil",
      branch: "Branch B",
      requestDate: "2024-12-10",
      dateNeeded: "2025-1-10",
      requester: "Michael Johnson",
      status: "Completed",
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setRequests(sampleData); // Simulating API response
        setFilteredRequests(sampleData); // Initialize filtered requests
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };


    fetchRequests();
  }, []);

  // Handle search input
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = requests.filter(
      (request) =>
        request.title.toLowerCase().includes(lowerCaseQuery) ||
        request.branch.toLowerCase().includes(lowerCaseQuery) ||
        request.requester.toLowerCase().includes(lowerCaseQuery) ||
        request.status.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRequests(filtered); // Update filtered results
  };

  // Handle row click to navigate to the details page
  const handleRowClick = (request) => {
    navigate(`/request/${request.requestNo}`);
  };

  // Sorting function
  const handleSort = (e) => {
    const sortOption = e.target.value;
    const sortedRequests = [...filteredRequests];

    if (sortOption === "asc") {
      sortedRequests.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "desc") {
      sortedRequests.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "reqdate") {
      sortedRequests.sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));
    } else if (sortOption === "dateNeeded") {
      sortedRequests.sort((a, b) => new Date(a.dateNeeded) - new Date(b.dateNeeded));
    } else if (sortOption === "status") {
      sortedRequests.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredRequests(sortedRequests); // Update filtered results
  };
  const user = JSON.parse(localStorage.getItem("user")); // Get user details

  return (
    <div className="flex flex-col w-full min-w-screen h-full min-h-screen bg-[#D9D9D9]">
      <h1 className="text-2xl font-semibold text-[#133517] mt-4 font-poppins mr-4 p-4 ml-6">Request</h1>
      <div className="requestTable">
        <AccInfo user={user} />
        <div className="request flex items-center gap-4">
          <SearchBar onSearch={handleSearch} />
          <select
            style={{ backgroundColor: "#133517", color: "#FFFFFF", fontFamily: "Poppins", fontSize: "12px" }}
            className="sorting"
            onChange={handleSort}
          >
            <option value="">Sort by</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            <option value="reqdate">Request Date</option>
            <option value="dateNeeded">Date Needed</option>
            <option value="status">Status</option>
          </select>
          <PODownload />
          <DIFDownload />
        </div>
        <table className="table-fixed border-spacing-2 w-full border-collapse border border-gray-300 font-poppins">
          <thead>
            <tr
              style={{ backgroundColor: "#133517", color: "#FFFFFF" }}
              className="border border-gray-300"
            >
              <th className="px-4 py-2 text-center">Request No.</th>
              <th className="px-4 py-2 text-center">Title</th>
              <th className="px-4 py-2 text-center">Branch</th>
              <th className="px-4 py-2 text-center">Request Date</th>
              <th className="px-4 py-2 text-center">Date Needed</th>
              <th className="px-4 py-2 text-center">Requester</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request, index) => (
              <tr
                key={request.requestNo}
                onClick={() => handleRowClick(request)}
                style={{
                  backgroundColor: index % 2 === 0 ? "#FFF5F5" : "#D3DDD6",
                  cursor: "pointer",
                }}
              >
                <td className="px-4 py-2 border text-center">{request.requestNo}</td>
                <td className="px-4 py-2 border text-center">{request.title}</td>
                <td className="px-4 py-2 border text-center">{request.branch}</td>
                <td className="px-4 py-2 border text-center">{request.requestDate}</td>
                <td className="px-4 py-2 border text-center">{request.dateNeeded}</td>
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
