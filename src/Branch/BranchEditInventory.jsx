import React, { useState } from "react";
import axios from "axios";

const BranchEditInventory = ({
  modalData: initialData,
  handleModalClose,
  setInventory,
  setFilteredInventory,
  inventory,
  filteredInventory,
}) => {
  const [modalData, setModalData] = useState(initialData);

  const handleSave = async () => {
    try {
      const updatedData = {
        br_inv_id: modalData.br_inv_id, 
        br_inv_name: modalData.br_inv_name,
        br_inv_desc: modalData.br_inv_desc,
        br_inv_category: modalData.br_inv_category,
        br_inv_price: modalData.br_inv_price,
        br_inv_stock: modalData.br_inv_stock,
        br_inv_date: modalData.br_inv_date,
        acc_id: modalData.acc_id,
      };
  
      await axios.put("http://localhost:3000/update-branch-inventory", updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      // Update state after successful update
      setInventory((prev) =>
        prev.map((item) =>
          item.br_inv_id === modalData.br_inv_id ? { ...item, ...updatedData } : item
        )
      );
      setFilteredInventory((prev) =>
        prev.map((item) =>
          item.br_inv_id === modalData.br_inv_id ? { ...item, ...updatedData } : item
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 font-poppins z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <div className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-green-950">
            Edit Inventory
          </h2>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="br_inv_name"
                value={modalData.br_inv_name || ""}
                onChange={handleInputChange}
                placeholder="br_invuct Name"
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">
                Description
              </label>
              <input
                type="text"
                name="br_inv_desc"
                value={modalData.br_inv_desc || ""}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">
                Category
              </label>
              <select
                name="br_inv_category" // Ensure the correct name attribute
                value={modalData.br_inv_category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
              >
                <option value="">Select Category</option>
                <option value="Foot Care">Foot Care</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Hair Care">Hair Care</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">
                Price
              </label>
              <input
                type="number"
                name="br_inv_price"
                value={modalData.br_inv_price || ""}
                onChange={handleInputChange}
                placeholder="Unit Price"
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">
                Stock
              </label>
              <input
                type="number"
                name="br_inv_stock
                "
                value={modalData.br_inv_stock
                   || ""}
                onChange={handleInputChange}
                placeholder="Stock"
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">
                Date Added
              </label>
              <input
                type="date"
                name="br_inv_date"
                value={modalData.br_inv_date ? new Date(modalData.br_inv_date).toISOString().split('T')[0] : ""}
                onChange={handleInputChange}
                placeholder="Date Added"
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 text-black bg-gray-200 rounded-lg focus:outline-none mr-2"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-950 rounded-lg focus:outline-none"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BranchEditInventory;
