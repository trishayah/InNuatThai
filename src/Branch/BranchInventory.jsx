import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../Shared UI/searchBar";
import AccInfo from "../../Shared UI/AccInfo";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import BranchEditInventory from "./BranchEditInventory";
import BranchAddInventory from "./BranchAddInventory";

function BranchInventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [editedRows, setEditedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [addInventory, setAddInventory] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
        try {
            const response = await axios.get("http://localhost:3000/display-branch-inventory", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setInventory(response.data); 
            setFilteredInventory(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };
    fetchInventory();
}, []);

  
  // Sorting function
  const handleSort = (e) => {
    const sortOption = e.target.value;
    const sortedInventory = [...filteredInventory];

    if (sortOption === "asc") {
      sortedInventory.sort((a, b) => a.inv_name.localeCompare(b.inv_name));
    } else if (sortOption === "desc") {
      sortedInventory.sort((a, b) => b.inv_name.localeCompare(a.inv_name));
    } else if (sortOption === "category") {
      sortedInventory.sort((a, b) => a.inv_category.localeCompare(b.inv_category));
    } else if (sortOption === "dateAdded") {
      sortedInventory.sort((a, b) => new Date(a.inv_dateadded) - new Date(b.inv_dateadded));
    }
    setFilteredInventory(sortedInventory);
  };

  // Handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = inventory.filter(
      (item) =>
        item.inv_name.toLowerCase().includes(query.toLowerCase()) ||
        item.inv_category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInventory(filteredData);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddInventory = () => {
    setAddInventory(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setModalData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${item.inv_name}?`);
    if (!confirmDelete) return;
  
    try {
      console.log('Deleting product with br_inv_id:', item.br_inv_id);  // Log br_inv_id
      const br_inv_id = item.br_inv_id;
  
      await axios.delete(`http://localhost:3000/delete-branch-inventory/${br_inv_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      // Update state after deletion
      setInventory(inventory.filter(i => i.br_inv_id !== br_inv_id));
      setFilteredInventory(filteredInventory.filter(i => i.br_inv_id !== br_inv_id));
  
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData({});
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#D9D9D9] font-poppins">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold text-[#133517] mt-4 ml-6">Inventory</h1>
        <div className="flex items-center space-x-4">
          <AccInfo user={user} />
        </div>
      </div>
      <div className="px-4 mt-4">
        <div className="flex items-center gap-4 mb-2">
          <SearchBar onSearch={handleSearch} />
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
          <button onClick={handleAddInventory} className="downloadbutton">
            Add Inventory
          </button>
        </div>
        <div>
          <table className="table-fixed border-spacing-2 w-full border-collapse border border-gray-300 font-poppins text-sm">
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
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item, index) => (
                <tr
                  key={item.br_inv_id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#FFF5F5" : "#D3DDD6",
                    cursor: "pointer",
                  }}
                >
                    <td className="px-4 py-2 border text-center">{item.br_inv_id}</td>
                    <td className="px-4 py-2 border text-center">{item.br_inv_name}</td>
                    <td className="px-4 py-2 border text-center">{item.br_inv_desc}</td>
                    <td className="px-4 py-2 border text-center">{item.br_inv_category}</td>
                    <td className="px-4 py-2 border text-center">{item.br_inv_price}</td>
                    <td className="px-4 py-2 border text-center">{item.br_inv_stock}</td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(item.br_inv_date).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      <button onClick={() => handleEdit(item)}
                        className="mr-4 p-2 rounded-[15px]">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(item)}
                        className="p-2 rounded-[15px]">
                        <MdDelete />
                      </button>
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
          {isModalOpen && (
            <BranchEditInventory
              modalData={modalData}
              handleModalChange={handleModalChange}
              handleModalClose={handleModalClose}
              setInventory={setInventory}
              setFilteredInventory={setFilteredInventory}
              inventory={inventory}
              filteredInventory={filteredInventory}
            />
          )}
          {addInventory && (
            <BranchAddInventory
              setAddInventory={setAddInventory}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BranchInventory;
