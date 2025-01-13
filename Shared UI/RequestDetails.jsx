import React, { useEffect, useState } from "react";
import axios from "axios";

function RequestDetails({ request, onClose }) {
  const [requestDetails, setRequestDetails] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!request) return;

    // Fetch request and products
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/request-details/${request.rf_id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Example of using a token from localStorage
          },
        });

        setRequestDetails(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching request details:", error);
      }
    };

    fetchRequestDetails();
  }, [request]);

  if (!request)
    return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 font-poppins z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <div className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 text-green-950">Request Details</h1>
          <div className="mb-4">
            <label className="block text-green-900 text-base font-semibold mb-2">Request No</label>
            <input
              type="text"
              value={request.rf_id}
              readOnly
              className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-900 text-base font-semibold mb-2">Request Title</label>
            <input
              type="text"
              value={request.rf_title}
              readOnly
              className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-900 text-base font-semibold mb-2">Request Date</label>
            <input
              type="text"
              value={new Date(request.rf_date).toLocaleDateString()}
              readOnly
              className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-900 text-base font-semibold mb-2">Date Needed</label>
            <input
              type="text"
              value={new Date(request.rf_date_needed).toLocaleDateString()}
              readOnly
              className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-900 text-base font-semibold mb-2">Branch</label>
            <input
              type="text"
              value={request.rf_branch}
              readOnly
              className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-900 text-base font-semibold mb-2">Requester Name</label>
            <input
              type="text"
              value={request.rf_title}
              readOnly
              className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-900 text-base font-semibold mb-2">Products</label>
            <ul className="list-disc pl-5 text-black">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((request) => (
                  <li key={request.rp_id} className="mb-2">
                    <p>
                      <strong>Product Name:</strong> {request.prod_name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {request.rp_quantity}
                    </p>
                    <p>
                      <strong>Description:</strong> {request.rp_description || "N/A"}
                    </p>
                  </li>
                ))
              ) : (
                <li>No products available</li>
              )}
            </ul>
          </div>
          <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-950 text-white rounded"
          >
            Close
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default RequestDetails;
