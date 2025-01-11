import React, { useState, useEffect } from "react";
import AccInfo from "./AccInfo";
import Notification from "../src/Modal/Notification";
import SearchBar from "./searchBar";
import PODownload from "./PODownloadButton";
import DIFDownload from "./DIFDownloadButton";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedRows, setEditedRows] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const Request = [
          { id: 1, requestDate: "2024-03-08", dateNeeded: "2024-03-15", status: "Pending", item: "Item A" },
          { id: 2, requestDate: "2024-03-10", dateNeeded: "2024-03-18", status: "Approved", item: "Item B" },
          { id: 3, requestDate: "2024-03-12", dateNeeded: "2024-03-20", status: "Rejected", item: "Item C" },
        ];
        setRequests(Request);
        setFilteredRequests(Request);
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

  const handleEdit = (e, id, field) => {
    const value = e.target.value;
    setFilteredRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

    setEditedRows((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value,
      },
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const modifiedItems = Object.entries(editedRows).map(([id, changes]) => ({
        id,
        changes,
      }));

      for (const { id, changes } of modifiedItems) {
        console.log(`Saving changes for request ${id}:`, changes);
      }

      setEditedRows({});
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

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
          <PODownload />
          <DIFDownload />
        </div>
        <table className="table-fixed border-spacing-2 w-full border-collapse border border-gray-300 font-poppins text-center">
          <thead>
            <tr
              style={{ backgroundColor: "#133517", color: "#FFFFFF" }}
              className="border border-gray-300 text-sm"
            >
              <th className="border border-gray-300 px-4 py-2">Item</th>
              <th className="border border-gray-300 px-4 py-2">Request Date</th>
              <th className="border border-gray-300 px-4 py-2">Date Needed</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr
                  key={request.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#FFF5F5" : "#D3DDD6",
                    cursor: "pointer",
                  }}
                >
                  <td className="border border-gray-300 px-4 py-2">{request.item}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.requestDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.dateNeeded}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border text-center">
                  No request Request available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Request;