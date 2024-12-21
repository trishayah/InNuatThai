import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";
import accInfo from "./accInfo";

function Request() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data to be used in place of the API response
  const sampleData = [
    {
      requestNo: "001",
      title: "Laptop Repair",
      branch: "Main",
      requestDate: "2024-12-01",
      requester: "John Doe",
      status: "Pending",
      itemName: "Laptop",
      description: "Screen cracked",
      quantity: 1,
      dateNeeded: "2024-12-15",
    },
    {
      requestNo: "002",
      title: "Printer Cartridge",
      branch: "Branch A",
      requestDate: "2024-12-02",
      requester: "Jane Smith",
      status: "Approved",
      itemName: "Printer Cartridge",
      description: "Black ink cartridge",
      quantity: 2,
      dateNeeded: "2024-12-05",
    },
    {
      requestNo: "003",
      title: "Projector Maintenance",
      branch: "Branch B",
      requestDate: "2024-12-10",
      requester: "Michael Johnson",
      status: "Completed",
      itemName: "Projector",
      description: "Overheating issue",
      quantity: 1,
      dateNeeded: "2024-12-20",
    },
  ];

  // Simulate fetching data
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        // Simulating API call by setting the sample data
        setRequests(sampleData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Handle row click to navigate to the details page
  const handleRowClick = (request) => {
    // Redirect to the request details page with the request number in the URL
    navigate(`/request/${request.requestNo}`);
  };

  return (
    <div className="flex flex-col w-full min-w-screen h-full min-h-screen bg-[#D9D9D9]">
      <h1 className="text-2xl font-500 text-[#133517] mt-4 font-poppins mr-4 p-4">Request</h1>
      <div className="requestTable">
        <div className="request">
          <SearchBar />
          <accInfo />
          <select style={{ backgroundColor: "#133517", color: "#FFFFFF"}} className="sorting">
              <option value="">Sort by</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
              <option value="branch">Branch</option>
              <option value="reqdate">Request Date</option>
              <option value="status">Status</option>
            </select>  
          </div>        
        <table className="table-fixed border-spacing-2 w-full border-collapse border border-gray-300 font-poppins font-semibold">
          <thead>
            <tr style={{ backgroundColor: "#133517", color: "#FFFFFF" }} className="border border-gray-300">
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