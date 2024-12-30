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

  return (
    <div className="flex flex-col w-full min-w-screen h-screen min-h-screen bg-[#D9D9D9]">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-semibold font-poppins text-[#133517] mt-4 ml-6">Create Request</h2>
        <AccInfo user={user} />
      </div>

      <div className="flex items-center justify-center rounded-[15px] h-screen bg-[#164E28] mb-20">
        <div className="w-[900px] h-[600px] bg-[#105D2B] text-white rounded-[15px] p-6 shadow-md mb-20">
          <h2 className="text-2xl font-semibold font-poppins text-white mt-6">Request Form</h2>
          <p className="text-base font-poppins mb-6 ml-10">Please fill all information on the fields.</p>
          <form className="grid grid-cols-2 gap-4">
            {/* Left Column Fields */}
            <div className="flex flex-col">
              <label className="text-base font-poppins mb-4 mt-10 " htmlFor="date">Date</label>
              <input
                id="date"
                type="text"
                value={request.requestDate}
                onChange={(e) => setRequest({ ...request, requestDate: e.target.value })}
                className="bg-white text-black p-2 rounded-[10px] font-poppins"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-base font-poppins mb-4" htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={request.title}
                onChange={(e) => setRequest({ ...request, title: e.target.value })}
                className="bg-white text-black p-2 rounded-[10px] font-poppins"
              />
            </div>


            <div className="form-row text-base font-poppins mb-4">
            <div className="form-group">
              <label htmlFor="price" className="title">Title</label>
              <input type="text" id="invtitle" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="branch">Date</label>
              <input type="text" id="invtitle" className="form-input" />
            </div>
          </div>


            <div className="flex form-row text-base font-poppins mb-4 text-black p-2 rounded-[10px] font-poppins">
            <div className="form-group ">
              <label htmlFor="price" className="requester">Requester</label>
              <input type="text" id="invreq" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="branch">Branch</label>
              <input type="text" id="invbranch" className="form-input" />
            </div>
          </div>

{/*            
            <div className="flex flex-col mt-4">
              <label className="text-base font-poppins mb-4" htmlFor="requester">Requester</label>
              <input
                id="requester"
                type="text"
                value={request.requester}
                onChange={(e) => setRequest({ ...request, requester: e.target.value })}
                className="bg-white text-black p-2 rounded-[10px] font-poppins"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-base font-poppins mb-4" htmlFor="branch">Branch</label>
              <input
                id="branch"
                type="text"
                value={request.branch}
                onChange={(e) => setRequest({ ...request, branch: e.target.value })}
                className="bg-white text-black p-2 rounded-[10px] font-poppins"
              />
            </div> */}
          </form>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleCancel} // Attach the cancel handler
              type="button"
              className="flex items-center justify-center sm:justify-start w-[40px] sm:w-[150px] h-[30px] bg-[#1E7239] rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,1)] text-white text-base sm:text-lg font-poppins font-medium hover:bg-[#1E7239] transition duration-300 ml-6"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex items-center justify-center sm:justify-start w-[40px] sm:w-[150px] h-[30px] bg-[#1E7239] rounded-[15px] shadow-m3-elevation-light-4 text-white text-base sm:text-lg font-poppins font-medium hover:bg-[#1E7239] transition duration-300 ml-20"
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
