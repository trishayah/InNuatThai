import React, { useState, useEffect } from "react";
import AccInfo from "./AccInfo";
import Notification from "../src/Modal/Notification";
import SearchBar from "./searchBar";
import PODownload from "./PODownloadButton";
import DIFDownload from "./DIFDownloadButton";
import BranchCreateReq from "../src/Branch/BranchCreateReq";
import axios from "axios";
import RequestDetails from "../Shared UI/RequestDetails";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedRows, setEditedRows] = useState({});
  const [createReq, setCreateReq] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/display-request", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRequests(response.data);
        setFilteredRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredRequest = requests.filter((request) =>
      request.item.toLowerCase().includes(query.toLowerCase()) ||
      request.status.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequests(filteredRequest);
  };

  const handleSort = (e) => {
    const sortOption = e.target.value;
    const sortedRequest = [...filteredRequests];

    if (sortOption === "asc") {
      sortedRequest.sort((a, b) => a.item.localeCompare(b.item));
    } else if (sortOption === "desc") {
      sortedRequest.sort((a, b) => b.item.localeCompare(a.item));
    } else if (sortOption === "reqdate") {
      sortedRequest.sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));
    } else if (sortOption === "dateNeeded") {
      sortedRequest.sort((a, b) => new Date(a.dateNeeded) - new Date(b.dateNeeded));
    } else if (sortOption === "status") {
      sortedRequest.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredRequests(sortedRequest);
  };


  const handleRowClick = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleCreateReq = () => {
    setCreateReq(true);
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "guest"; // Default role is 'guest' if no user is logged in


  return (
    <div className="flex flex-col w-full min-h-screen bg-[#D9D9D9] font-poppins">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold text-[#133517] mt-4 ml-6">Request</h1>
        <div className="flex items-center space-x-4">
          {/* <Notification
            modifiedItems={Object.entries(editedRows).map(([id, changes]) => ({ id, changes }))}
          /> */}
          <AccInfo user={user} />
        </div>
      </div>
      <div className="px-4 mt-4">
        <div className="flex items-center gap-4 mb-2">
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
          {/* Conditionally render buttons based on user role */}
          {["admin", "accounting"].includes(userRole) && (
            <>
              <PODownload />
              <DIFDownload />
            </>
          )}
          {/* Create Request button for branch */}
          {userRole === "branch" && (
            <button
              onClick={handleCreateReq}
              className="downloadbutton"
            >
              Create Request
            </button>
          )}
        </div>
        <table className="table-fixed border-spacing-2 w-full border-collapse border border-gray-300 font-poppins text-center">
          <thead>
            <tr
              style={{ backgroundColor: "#133517", color: "#FFFFFF" }}
              className="border border-gray-300 text-sm"
            >
              <th className="border border-gray-300 px-4 py-2">Request No.</th>
              <th className="border border-gray-300 px-4 py-2">Request Title</th>
              <th className="border border-gray-300 px-4 py-2">Branch</th>
              <th className="border border-gray-300 px-4 py-2">Request Date</th>
              <th className="border border-gray-300 px-4 py-2">Date Needed</th>
              <th className="border border-gray-300 px-4 py-2">Requestor Name</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr
                  key={request.rf_id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#FFF5F5" : "#D3DDD6",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick(request)}
                >
                  <td className="border border-gray-300 px-4 py-2">{request.rf_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.rf_title}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.rf_branch}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(request.rf_date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(request.rf_date_needed).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.rf_requestor_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.rf_status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border text-center">
                  No requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {createReq && <BranchCreateReq setCreateReq={setCreateReq} setRequests={setRequests} setFilteredRequests={setFilteredRequests} />}
        {selectedRequest && <RequestDetails request={selectedRequest} onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default Request;