import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import AccInfo from "./accInfo";

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
      <h1 className="approval text-2xl font-500 text-[#133517] mt-4 font-semibold font-poppins text-[#133517] mr-4 p-4">Create Request</h1>
      <div className="requestTable">
        <AccInfo />
        <div className="reqbox">
          <h2 className="reqform text-2xl font-semibold font-poppins text">Request Form</h2>
          <h3 className="reqformdetails font-poppins mb-6 ml-10">Please fill all information on the fields.</h3>
        <div className='form-container'>
         
        <div className="form-row font-poppins">
            <div className="form-group">
              <label htmlFor="price" className="date">Date</label>
              <input type="text" id="invdate" className="form-input  " />
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="title">Title</label>
              <input type="text" id="invtitle" className="form-input" />
            </div>
          </div>

          <div className="form-row font-poppins">
            <div className="form-group">
              <label htmlFor="price" className="unitprc">Requester</label>
              <input type="text" id="invreq" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="qty">Branch</label>
              <input type="text" id="invbranch" className="form-input" />
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
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} */}
    </div>
  );
}

export default RequestDetails;