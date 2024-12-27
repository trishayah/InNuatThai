import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccInfo from "./accInfo";

function Inventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]); // State for filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Sample data to be used in place of the API response
  const sampleData = [
    {
      inventoryNo: "001",
      itemName: "Laptop",
      category: "Electronics",
      unitPrice: "24000",
      stock: "100",
      dateAdded: "12-24-2023",
    },
    {
      inventoryNo: "002",
      itemName: "Printer Cartridge",
      category: "Electronics",
      unitPrice: "300",
      stock: "199",
      dateAdded: "2024-12-02",
    },
    {
      inventoryNo: "003",
      itemName: "Projector",
      category: "Electronics",
      unitPrice: "12000",
      stock: "50",
      dateAdded: "2024-12-02",
    },
  ];

  // Simulate fetching data
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        // Simulating API call by setting the sample data
        setInventory(sampleData);
        setFilteredInventory(sampleData); // Initialize filtered inventory
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // Handle search query change
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredInventory(inventory);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = inventory.filter(
        (item) =>
          item.itemName.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
      setFilteredInventory(filtered);
    }
  }, [searchQuery, inventory]);

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
      sortedInventory.sort(
        (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)
      );
    }

    setFilteredInventory(sortedInventory);
  };

  return (
    <div className="flex flex-col w-full min-w-screen h-full min-h-screen bg-[#D9D9D9]">
      <h1 className="text-2xl font-500 text-[#133517] font-poppins mt-4 mr-4 p-4">
        Inventory
      </h1>
      <div className="inventoryTable ml-2 mr-2">
        <AccInfo />
        <div className="search flex items-center justify-between">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Inventory"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[400px] h-[40px] bg-white rounded-[10px] pl-3 font-poppins hover:ring-2 hover:ring-[#105D2B] shadow-md border border-[#105D2B] text-black text-sm focus:outline-none"
          />
          <select
            style={{ backgroundColor: "#133517", color: "#FFFFFF" }}
            className="sorting"
            onChange={handleSort}
          >
            <option value="">Sort by</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            <option value="category">Category</option>
            <option value="dateAdded">Date Added</option>
          </select>
        </div>

        <table className="inventoryTabletable-fixed border-spacing-2 w-full border-collapse border border-gray-300 font-poppins font-semibold">
          <thead>
            <tr
              style={{ backgroundColor: "#133517", color: "#FFFFFF" }}
              className="border border-gray-300"
            >
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
                <td className="px-4 py-2 border text-center">
                  {inventory.inventoryNo}
                </td>
                <td className="px-4 py-2 border text-center">
                  {inventory.itemName}
                </td>
                <td className="px-4 py-2 border text-center">
                  {inventory.category}
                </td>
                <td className="px-4 py-2 border text-center">
                  {inventory.unitPrice}
                </td>
                <td className="px-4 py-2 border text-center">
                  {inventory.stock}
                </td>
                <td className="px-4 py-2 border text-center">
                  {inventory.dateAdded}
                </td>
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

export default Inventory;
