import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";
import AccInfo from "./AccInfo";
import WSRRDownload from "./WSRRDownload";
import Notification from "./Notification"; // Import the Notification component
import axios from "axios";

function Inventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]); // Added filtered inventory state
  const [editedRows, setEditedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/display-inventory', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Fetched data:', response.data); // Log fetched data
        const data = Array.isArray(response.data) ? response.data : [];
        setInventory(data);
        setFilteredInventory(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
  
    fetchInventory();
  }, []);
  

  // Sorting function
  const handleSort = (e) => {
    const sortOption = e.target.value;
    const sortedInventory = [...filteredInventory]; // Sort based on the filtered data

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

  const handleEdit = (e, inventoryNo, field) => {
    const value = e.target.value;
    setFilteredInventory((prev) =>
      prev.map((item) =>
        item.inventoryNo === inventoryNo ? { ...item, [field]: value } : item
      )
    );

    setEditedRows((prev) => ({
      ...prev,
      [inventoryNo]: {
        ...(prev[inventoryNo] || {}),
        [field]: value,
      },
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const modifiedItems = Object.entries(editedRows).map(([inventoryNo, changes]) => ({
        inventoryNo,
        changes,
      }));

      for (const { inventoryNo, changes } of modifiedItems) {
        await axios.put(`http://localhost:3000/api/inventory/${inventoryNo}`, changes);
      }

      setNotifications((prev) => [
        ...prev,
        ...modifiedItems.map(
          ({ inventoryNo, changes }) =>
            `Item ${inventoryNo} modified: ${JSON.stringify(changes)}`
        ),
      ]);

      setEditedRows({});
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user")); // Get user details

  const handleAddInventory = () => {
    navigate("/add-inventory"); // Adjust this route as needed
  };


  return (
    <div className="flex flex-col w-full min-h-screen bg-[#D9D9D9]">
      <h1 className="text-2xl font-semibold text-[#133517] font-poppins mt-4 mr-4 ml-6 p-4">
        Inventory
      </h1>
      <div className="inventoryTable ml-2 mr-2">
        <div className="flex items-center gap-2">
          <AccInfo user={user} />
          <Notification modifiedItems={Object.entries(editedRows).map(([inventoryNo, changes]) => ({ inventoryNo, changes }))} /> {/* Notification component */}
        </div>
        <div className="flex items-center gap-4">
          <SearchBar onSearch={handleSearch} /> {/* Pass the search handler */}
          <select
            style={{ backgroundColor: "#133517", color: "#FFFFFF", fontFamily: "Poppins", fontSize: "12px" }}
            className="sorting"
            onChange={handleSort}
          >
            <option value="">Sort by</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            <option value="category">Category</option>
            <option value="dateAdded">Date Added</option>
          </select>
          <WSRRDownload />
          <button
            onClick={handleAddInventory}
            className="downloadbutton"
          >
            Add Inventory
          </button>
        </div>


        <table className="table-fixed border-spacing-2 w-full border-collapse border border-gray-300 font-poppins">
          <thead>
            <tr
              style={{ backgroundColor: "#133517", color: "#FFFFFF" }}
              className="border border-gray-300"
            >
              <th className="px-4 py-2 text-center">Inventory No.</th>
              <th className="px-4 py-2 text-center">Product Name</th>
              <th className="px-4 py-2 text-center">Description</th>
              <th className="px-4 py-2 text-center">Category</th>
              <th className="px-4 py-2 text-center">Unit Price</th>
              <th className="px-4 py-2 text-center">Stock</th>
              <th className="px-4 py-2 text-center">Date Added</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item, index) => (
                <tr
                  key={item.inv_no}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#FFF5F5" : "#D3DDD6",
                    cursor: "pointer",
                  }}
                >
                  <td className="px-4 py-2 border text-center">{item.inv_no}</td>
                  <td className="px-4 py-2 border text-center">{item.prod_name}</td>
                  <td className="px-4 py-2 border text-center">{item.prod_desc}</td>
                  <td className="px-4 py-2 border text-center">{item.prod_category}</td>
                  <td className="px-4 py-2 border text-center">{item.prod_price}</td>
                  <td className="px-4 py-2 border text-center">{item.inv_stock}</td>
                  <td className="px-4 py-2 border text-center">
                    {new Date(item.inv_dateadded).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 border text-center">
                  No inventory data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
