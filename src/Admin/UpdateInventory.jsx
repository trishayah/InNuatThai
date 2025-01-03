import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../Shared UI/searchBar";
import AccInfo from "../../Shared UI/AccInfo";

function UpdateInventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]); // Added filtered inventory state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query


  // Sorting function
  const handleSort = (e) => {
    const sortOption = e.target.value;
    const sortedInventory = [...filteredInventory];

    if (sortOption === "asc") {
      sortedInventory.sort((a, b) => a.itemName.localeCompare(b.itemName));
    } else if (sortOption === "desc") {
      sortedInventory.sort((a, b) => b.itemName.localeCompare(a.itemName));
    } else if (sortOption === "category") {
      sortedInventory.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortOption === "dateAdded") {
      sortedInventory.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    }
    setFilteredInventory(sortedInventory);
  };

  // Handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = inventory.filter((item) =>
      item.itemName.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInventory(filteredData);
  };

  const user = JSON.parse(localStorage.getItem("user")); // Get user details

  const handleOptionChange = (e) => {
    const option = e.target.value;
    if (option === "add") {
      navigate("/add-inventory");
    } else if (option === "remove") {
      navigate("/remove-inventory");
    } else if (option === "view") {
      navigate("/inventory");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#D9D9D9]">
      <h1 className="text-2xl font-semibold text-[#133517] font-poppins mt-4 mr-4 ml-6 p-4">
        Inventory&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; Update Inventory
      </h1>

      <div className="inventoryTable ml-2 mr-2">
        <AccInfo user={user} />
        <div className="flex items-center gap-4">
          <SearchBar onSearch={handleSearch} /> {/* Pass the search handler */}
          {/* <select style={{ backgroundColor: "#133517", color: "#FFFFFF" }} className="sorting" onChange={handleSort}>
            <option value="">Sort by</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            <option value="category">Category</option>
            <option value="dateAdded">Date Added</option>
          </select> */}
          <select
            style={{ backgroundColor: "#133517", color: "#FFFFFF", fontFamily: "Poppins", fontSize: "12px" }}
            className="option"
            onChange={handleOptionChange} // Handle option change
          >
            <option value="add">Add Inventory</option>
            <option value="remove">Remove Inventory</option>
            <option value="view">View Inventory</option>
          </select>
        </div>

        <table className="inventoryTabletable-fixed border-spacing-2 w-full border-collapse border border-gray-300 font-poppins font-semibold">
          <thead>
            <tr style={{ backgroundColor: "#133517", color: "#FFFFFF" }} className="border border-gray-300">
              <th className="px-4 py-2 text-center">Inventory No.</th>
              <th className="px-4 py-2 text-center">Item Name</th>
              <th className="px-4 py-2 text-center">Category</th>
              <th className="px-4 py-2 text-center">Unit Price</th>
              <th className="px-4 py-2 text-center">Stock</th>
              <th className="px-4 py-2 text-center">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((inventory, index) => (
              <tr
                key={inventory.inventoryNo}
                style={{
                  backgroundColor: index % 2 === 0 ? "#FFF5F5" : "#D3DDD6",
                  cursor: "pointer",
                }}
              >
                <td className="px-4 py-2 border text-center">{inventory.inventoryNo}</td>
                <td className="px-4 py-2 border text-center">{inventory.itemName}</td>
                <td className="px-4 py-2 border text-center">{inventory.category}</td>
                <td className="px-4 py-2 border text-center">{inventory.unitPrice}</td>
                <td className="px-4 py-2 border text-center">{inventory.stock}</td>
                <td className="px-4 py-2 border text-center">{inventory.dateAdded}</td>
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

export default UpdateInventory;
