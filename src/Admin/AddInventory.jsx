import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import SearchBar from "../../Shared UI/searchBar";
// import AccInfo from "../../Shared UI/AccInfo";
import axios from "axios";

function AddInventory({ setAddInventory }) {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [error, setError] = useState(null);

  const [newItem, setNewItem] = useState({
    prodName: "",
    prodDesc: "",
    prodCategory: "",
    prodPrice: "",
    stock: "",
    dateAdded: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message


  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Ensure the correct token key is used
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.post(
        "http://localhost:3000/addinventory",
        newItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setInventory((prev) => [...prev, response.data]);
      setFilteredInventory((prev) => [...prev, response.data]);
      setNewItem({
        prodName: "",
        prodDesc: "",
        prodCategory: "",
        prodPrice: "",
        stock: "",
        dateAdded: "",
      });
      setSuccessMessage("Inventory successfully recorded!"); // Set success message
      window.location.reload(); // Reload the page
      setAddInventory(false); // Close AddInventory component
    } catch (error) {
      setError(error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setAddInventory(false); // Close AddInventory component
  };

  const user = JSON.parse(localStorage.getItem("user")); // Get user details

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 font-poppins z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <div className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 text-green-950">Add Inventory</h1>
          <form onSubmit={handleSubmit}>
            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}
            {error && <p className="text-red-500 mb-4">{error.message}</p>}

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Name</label>
              <input
                type="text"
                name="prodName"
                value={newItem.prodName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Description</label>
              <input
                type="text"
                name="prodDesc"
                value={newItem.prodDesc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                placeholder="Enter product description"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Category</label>
              <select
                name="prodCategory"
                value={newItem.prodCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                required
              >
                <option value="">Select category</option>
                <option value="Foot Care">Foot Care</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Hair Care">Hair Care</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Unit Price</label>
              <input
                type="number"
                name="prodPrice"
                value={newItem.prodPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                placeholder="Enter unit price"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Quantity</label>
              <input
                type="number"
                name="stock"
                value={newItem.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                placeholder="Enter quantity"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Date Added</label>
              <input
                type="date"
                name="dateAdded"
                value={newItem.dateAdded}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                placeholder="Enter date added"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-black bg-gray-200 rounded-lg focus:outline-none mr-2"              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-950 rounded-lg focus:outline-none"             >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddInventory;
