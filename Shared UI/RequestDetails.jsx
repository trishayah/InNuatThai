import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RequestDetails() {
  const { requestNo } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/requests/${requestNo}`);
        setRequest(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequestDetails();
  }, [requestNo]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h3 className="text-2xl font-semibold mb-4 text-[#105D2B]">Request Details</h3>
      <div className="grid grid-cols-1 gap-4">
        <p><strong className="text-[#26582D]">Request No:</strong> {request.requestNo}</p>
        <p><strong className="text-[#26582D]">Title:</strong> {request.title}</p>
        <p><strong className="text-[#26582D]">Branch:</strong> {request.branch}</p>
        <p><strong className="text-[#26582D]">Request Date:</strong> {request.requestDate}</p>
        <p><strong className="text-[#26582D]">Requester:</strong> {request.requester}</p>
        <p><strong className="text-[#26582D]">Status:</strong> {request.status}</p>
        <p><strong className="text-[#26582D]">Item Name:</strong> {request.itemName}</p>
        <p><strong className="text-[#26582D]">Description:</strong> {request.description}</p>
        <p><strong className="text-[#26582D]">Quantity:</strong> {request.quantity}</p>
        <p><strong className="text-[#26582D]">Date Needed:</strong> {request.dateNeeded}</p>
      </div>
    </div>
  );
}

export default RequestDetails;
