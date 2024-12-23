import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import SearchBar from "./searchBar";
import AccInfo from "../../Shared UI/accInfo";

function ApprovalRequest() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data to be used in place of the API response
    const sampleData = [
      {
        item: "001",
        description: "Hot Oil",
        quantity: "100",
        dateNeeded: "2024-12-01",
        comments: "authentic",
      },
      {
        item: "002",
        description: "Hot Wax",
        quantity: "120",
        dateNeeded: "2024-12-09",
        comments: "hurry",
      },
      {
        item: "003",
        description: "Wax Strip",
        quantity: "150",
        dateNeeded: "2024-12-21",
        comments: "sticky",
      },
      {
        item: "004",
        description: "Wax Strip",
        quantity: "150",
        dateNeeded: "2024-12-21",
        comments: "sticky",
      },
      {
        item: "005",
        description: "Wax Strip",
        quantity: "150",
        dateNeeded: "2024-12-21",
        comments: "sticky",
      },
      {
        item: "006",
        description: "Wax Strip",
        quantity: "150",
        dateNeeded: "2024-12-21",
        comments: "sticky",
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
  
//     // Handle row click to navigate to the details page
//     const handleRowClick = (request) => {
//       // Redirect to the request details page with the request number in the URL
//       navigate(`/request/${request.requestNo}`);
//     };

  return (
    <div className="flex flex-col w-full min-w-screen h-full min-h-screen bg-[#D9D9D9]">
      <h1 className="approval text-2xl font-500 text-[#133517] mt-4 font-poppins mr-4 p-4">For Approval</h1>
      <div className="requestTable">
      <AccInfo />      
      <div className="reqbox">
        <table className="approvaltable w-full border-gray-300 font-poppins font-semibold">
            <thead>
            <tr style={{ backgroundColor: "#133517", color: "#FFFFFF" }} className="border border-gray-300">
                <th className="px-4 py-2 text-center">Item</th>
                <th className="px-4 py-2 text-center">Description</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Date Needed</th>
                <th className="px-4 py-2 text-center">Comments</th>
            </tr>
            </thead>
            <tbody>
            {requests.map((request, index) => (
                <tr
                key={request.requestNo}
                style={{
                    backgroundColor: index % 2 === 0 ? "#FFF5F5" : "#D3DDD6",
                    cursor: "pointer",
                }}
                >
                <td className="px-4 py-2 border text-center">{request.item}</td>
                <td className="px-4 py-2 border text-center">{request.description}</td>
                <td className="px-4 py-2 border text-center">{request.quantity}</td>
                <td className="px-4 py-2 border text-center">{request.dateNeeded}</td>
                <td className="px-4 py-2 border text-center">{request.comments}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="buttonContainer">
            <button className="button1">Cancel</button>
            <button className="button2">Next</button>
        </div>

        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default ApprovalRequest;