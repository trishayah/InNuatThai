import React, { useEffect, useState } from "react";
import axios from "axios";

function RequestDetails({ request, onClose }) {
  const [requestDetails, setRequestDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState("");
  const [receivedBy, setReceivedBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!request) return;

    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/request-details/${request.rf_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setRequestDetails(response.data.request);
        setProducts(response.data.products);
        setStatus(response.data.request?.status || "");
        setComments(response.data.request?.comments || "");
        setReceivedBy(response.data.request?.receivedBy || "");
        setApprovedBy(response.data.request?.approvedBy || "");
      } catch (error) {
        console.error("Error fetching request details:", error);
      }
    };

    fetchRequestDetails();
  }, [request]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSaveOrSend = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userRole = user?.role || "guest";

      const updateData = {
        status,  // Ensure this is properly set
        comments,
        receivedBy: userRole === "accounting" ? receivedBy : undefined,
        approvedBy: userRole === "admin" ? approvedBy : undefined,
        userRole,  // Include the role
      };

      const response = await axios.put(
        `http://localhost:3000/update-request/${request.rf_id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert(userRole === "accounting" ? "Request sent successfully!" : "Request saved successfully!");
        onClose();
        window.location.reload();
      } else {
        alert(response.data.message || "Failed to update request.");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update request.");
    }
  };


  if (!request) return null;

  const statusOptions = {
    accounting: ["For Approval", "Pending", "Decline"],
    admin: ["Approve", "Decline"],
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "guest";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 font-poppins z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <div className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-green-950">Request Details</h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Request Details Fields */}
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

          {/* Products Section */}
          <div className="mb-4">
            <label className="block text-black text-xl font-bold mb-2">Requested Products</label>
            <ul className="list-disc pl-5 text-black">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <li key={product.rp_id} className="mb-2">
                    <div className="mb-4">
                      <label className="block text-green-900 text-base font-semibold mb-2">Product Name</label>
                      <input
                        type="text"
                        value={product.prod_name}
                        readOnly
                        className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-green-900 text-base font-semibold mb-2">Description</label>
                      <input
                        type="text"
                        value={product.rp_description}
                        readOnly
                        className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-green-900 text-base font-semibold mb-2">Quantity</label>
                      <input
                        type="text"
                        value={product.rp_quantity}
                        readOnly
                        className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
                      />
                    </div>
                  </li>
                ))
              ) : (
                <li>No products available for this request</li>
              )}
            </ul>
          </div>

          {/* Conditional rendering for admin and accounting users */}
          {(userRole === "admin" || userRole === "accounting") && (
            <>
              <div className="mb-4">
                <label className="block text-green-900 text-base font-semibold mb-2">Status</label>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
                >
                  <option value="">Select status</option>
                  {statusOptions[userRole]?.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-green-900 text-base font-semibold mb-2">Comments</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
                  rows={4}
                />
              </div>
            </>
          )}

          {/* Role-specific fields */}
          {userRole === "accounting" && (
            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Received By</label>
              <input
                type="text"
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>
          )}

          {userRole === "admin" && (
            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Approved By</label>
              <input
                type="text"
                value={approvedBy}
                onChange={(e) => setApprovedBy(e.target.value)}
                className="w-full px-3 py-2 text-black border rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>
          )}

          {/* Footer buttons based on user role */}
          <div className="flex justify-end">
            {userRole === "branch" ? (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-green-950 text-white rounded-lg"
              >
                Close
              </button>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-black bg-gray-200 rounded-lg focus:outline-none mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveOrSend}
                  className="px-4 py-2 bg-green-950 text-white rounded-lg"
                >
                  {userRole === "accounting" ? "Send" : "Save"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
