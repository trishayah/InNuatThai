import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import SearchBar from "./searchBar";
import AccInfo from "../../Shared UI/accInfo";

function ApprovalRemoveInventory() {
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
      <h1 className="approval text-2xl font-500 text-[#133517] mt-4 font-poppins mr-4 p-4">Remove Request</h1>
      <div className="requestTable">
        <AccInfo />
        <div className="reqbox">
          <h2 className="reqform">Inventory</h2>
          <h3 className="reqformdetails">This is strictly for viewing only.</h3>
        <div className='form-container'>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="itemdetail" className="item">Item name</label>
              <input type="text" id="invitem" className="form-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="ctgry">Category</label>
              <select id="ctgr" className="form-input">
                <option value="">Select</option>
                <option value="op1">lulu romualdez</option>
                <option value="op2">Marcos yawa</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price" className="unitprc">Unit Price</label>
              <input type="text" id="invunitprice" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="qty">Quantity</label>
              <input type="text" id="invquantity" className="form-input" />
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

export default ApprovalRemoveInventory;