import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";
import AccInfo from "./accInfo";

function NextApprovalRequest() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
          <h2 className="reqform">Request Form</h2>
          <h3 className="reqformdetails">Please fill all information on the fields.</h3>
        <div className='form-container'>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date" className="reqdate">Date</label>
              <input type="date" id="date" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="title" className="reqtitle">Title</label>
              <input type="text" id="title" className="form-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="requester" className="reqman">Requester</label>
              <input type="text" id="requester" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="branch" className="reqbranch">Branch</label>
              <input type="text" id="branch" className="form-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="receivedBy" className="reqrcv">Received by</label>
              <select id="receivedBy" className="form-input">
                <option value="">Select</option>
                <option value="person1">lulu romualdez</option>
                <option value="person2">Marcos yawa</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="decisionPersonnel" className="reqdecision">Decision Personnel</label>
              <select id="decisionPersonnel" className="form-input">
                <option value="">Select</option>
                <option value="person1">Beyonce</option>
                <option value="person2">Shaq</option>
              </select>
            </div>
          </div>
          </div>
          <div className="buttonContainer">
            <button className="button1">Cancel</button>
            <button className="button3">Decline</button>
            <button className="button4">Approve</button>
          </div>
        </div>
      </div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} */}
    </div>
  );
}

export default NextApprovalRequest;