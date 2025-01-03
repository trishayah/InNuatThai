import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import AccInfo from "../../Shared UI/AccInfo";

function RequestDetails() {
  const { requestNo } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [request, setRequest] = useState({
    requestDate: "",
    title: "",
    requester: "",
    branch: "",
  });
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

  // Cancel button handler
  const handleCancel = () => {
    navigate("/branchreq"); // Navigate to the branch request page
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const user = JSON.parse(localStorage.getItem("user"));

  // Handle row click to navigate to the details page
  const handleRowClick = (request) => {
    // Redirect to the request details page with the request number in the URL
    navigate(`/request/${request.requestNo}`);
  };

  return (
    <div className="flex flex-col w-full min-w-screen h-full min-h-screen bg-[#D9D9D9]">
      <h1 className="approval text-2xl mt-4 font-semibold font-poppins text-[#133517] mr-4 p-4">Create Request</h1>
      <div className="requestTable">
        <AccInfo />
        <div className="reqbox">
          <h2 className="reqform text-2xl font-semibold font-poppins text">Request Form</h2>
          <h3 className="reqformdetails font-poppins mb-6 ml-10">Please fill all information on the fields.</h3>
          <div className="form-container">
            <div className="form-row font-poppins">
              <div className="form-group">
                <label htmlFor="invdate" className="date">Date</label>
                <input
                  type="date"
                  id="invdate"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="invtitle" className="title">Title</label>
                <select id="invtitle" className="form-input">
                  <option value="">Select Title</option>
                  <option value="Option1">Option 1</option>
                  <option value="Option2">Option 2</option>
                  <option value="Option3">Option 3</option>
                </select>
              </div>
            </div>

            <div className="form-row font-poppins">
              <div className="form-group">
                <label htmlFor="invreq" className="unitprc">Requester</label>
                <select id="invreq" className="form-input">
                  <option value="">Select Requester</option>
                  <option value="Requester1">Requester 1</option>
                  <option value="Requester2">Requester 2</option>
                  <option value="Requester3">Requester 3</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="invbranch" className="qty">Branch</label>
                <select id="invbranch" className="form-input">
                  <option value="">Select Branch</option>
                  <option value="Branch1">Branch 1</option>
                  <option value="Branch2">Branch 2</option>
                  <option value="Branch3">Branch 3</option>
                </select>
              </div>
            </div>

          </div>

          <div className="buttonContainer flex items-center justify-between px-8 mt-8">
            <button
              onClick={handleCancel}
              className="button1 font-poppins font-medium bg-[#2F4F2F] text-white px-6 py-2 rounded shadow-md hover:bg-[#276427] transition-all"
            >
              Cancel
            </button>
            <button
              className="button4 font-poppins font-medium bg-[#2F4F2F] text-white px-6 py-2 rounded shadow-md hover:bg-[#276427] transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
