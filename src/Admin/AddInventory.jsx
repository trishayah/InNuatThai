import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import SearchBar from "../../Shared UI/searchBar";
import AccInfo from "../../Shared UI/AccInfo";
import axios from "axios";

function AddInventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [newItem, setNewItem] = useState({
    prodName: "",
    prodDesc: "",
    prodCategory: "",
    prodPrice: "",
    stock: "",
    dateAdded: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // // Fetch inventory data from API
  // useEffect(() => {
  //   const fetchInventory = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(
  //         "http://localhost:3000/inventory",
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       setInventory(response.data);
  //       setFilteredInventory(response.data); // Initialize filtered inventory
  //     } catch (error) {
  //       setError(error);

        // } finally {
        //   setLoading(false);
        // }
    //   }
    // };
    //   fetchInventory();
    // }, []);

  // // Handle search query change
  // useEffect(() => {
  //   if (searchQuery.trim() === "") {
  //     setFilteredInventory(inventory); // Reset to full inventory
  //   } else {
  //     const query = searchQuery.toLowerCase();
  //     const filtered = inventory.filter(
  //       (item) =>
  //         item.itemName.toLowerCase().includes(query) ||
  //         item.category.toLowerCase().includes(query)
  //     );
  //     setFilteredInventory(filtered);
  //   }
  // }, [searchQuery, inventory]);

  // // Sorting function
  // const handleSort = (e) => {
  //   const sortOption = e.target.value;
  //   const sortedInventory = [...filteredInventory];

  //   if (sortOption === "asc") {
  //     sortedInventory.sort((a, b) => a.itemName.localeCompare(b.itemName));
  //   } else if (sortOption === "desc") {
  //     sortedInventory.sort((a, b) => b.itemName.localeCompare(a.itemName));
  //   } else if (sortOption === "category") {
  //     sortedInventory.sort((a, b) => a.category.localeCompare(b.category));
  //   } else if (sortOption === "dateAdded") {
  //     sortedInventory.sort(
  //       (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)
  //     );
  //   }

  //   setFilteredInventory(sortedInventory);
  // };

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
      navigate("/inventory"); // Navigate back to the Inventory component
    } catch (error) {
      setError(error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/inventory");
  };

  const user = JSON.parse(localStorage.getItem("user")); // Get user details

  // const handleOptionChange = (e) => {
  //   const option = e.target.value;
  //   if (option === "update") {
  //     navigate("/update-inventory");
  //   } else if (option === "remove") {
  //     navigate("/remove-inventory");
  //   } else if (option === "view") {
  //     navigate("/inventory");
  //   }
  // };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#D9D9D9]"> {/* Updated class name */}
      <h1 className="text-2xl font-semibold text-[#133517] font-poppins mt-4 mr-4 ml-6 p-4">
        Inventory &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; Add Inventory
      </h1>
      <div className="inventoryTable ml-2 mr-2">
        <AccInfo user={user} />
        {/* <div className="flex items-center gap-4">
          <select
            style={{ backgroundColor: "#133517", color: "#FFFFFF", fontFamily: "Poppins", fontSize: "12px" }}
            className="option"
            onChange={handleOptionChange} // Handle option change
          >
            <option value="update">Update Inventory</option>
            <option value="remove">Remove Inventory</option>
            <option value="view">View Inventory</option>
          </select>
        </div> */}
        <div className="flex flex-col justify-items-center bg-[#164E28] p-4 rounded-3xl mt-6 w-[800px] h-[450px] mx-auto items-center">
          <form
            onSubmit={handleSubmit}
            className="font-poppins grid grid-cols-2 gap-4 mt-11"
          >
            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}
            {error && <p className="text-red-500 mb-4">{error.message}</p>}

            <div className="mb-4">
              <label className="block text-white font-medium mb-2">Product Name</label>
              <input
                type="text"
                name="prodName"
                value={newItem.prodName}
                onChange={handleInputChange}
                className="w-80 px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-medium mb-2">Product Description</label>
              <input
                type="text"
                name="prodDesc"
                value={newItem.prodDesc}
                onChange={handleInputChange}
                className="w-80 px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter product description"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-medium mb-2">Category</label>
              <select
                name="prodCategory"
                value={newItem.prodCategory}
                onChange={handleInputChange}
                className="w-80 px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              >
                <option value="">Select category</option>
                <option value="Foot Care">Foot Care</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Hair Care">Hair Care</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-white font-medium mb-2">Unit Price</label>
              <input
                type="number"
                name="prodPrice"
                value={newItem.prodPrice}
                onChange={handleInputChange}
                className="w-80 px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter unit price"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-medium mb-2">Quantity</label>
              <input
                type="number"
                name="stock"
                value={newItem.stock}
                onChange={handleInputChange}
                className="w-80 px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter quantity"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-medium mb-2">Date Added</label>
              <input
                type="date"
                name="dateAdded"
                value={newItem.dateAdded}
                onChange={handleInputChange}
                className="w-80 px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter date added"
                required
              />
            </div>

            <div className="col-span-2 flex justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="w-20 px-20 h-8 bg-[#1E7239] text-white text-sm py-6 rounded-full tracking-widest font-600 flex items-center justify-center shadow-lg"
                style={{ boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-20 px-20 h-8 bg-[#1E7239] text-white py-6 text-sm rounded-full tracking-widest font-600 flex items-center justify-center shadow-lg"
                style={{ boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}
              >
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
