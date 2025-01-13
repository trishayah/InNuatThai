import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdAddCircle, MdDelete } from "react-icons/md";

function CreateRequest({ setCreateReq }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [newItem, setNewItem] = useState({
    title: "",
    branch: "",
    requestDate: "",
    requesterName: "",
    dateNeed: "",
    products: [{ productId: "", desc: "", quantity: "" }],
  });

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/display-inventory", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  const handleCancel = () => {
    setCreateReq(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = newItem.products.map((product, i) => {
      if (i === index) {
        if (field === "productId") {
          // Find the selected product
          const selectedProduct = products.find(p => p.prod_id.toString() === value);
          return {
            ...product,
            productId: value,
            desc: selectedProduct ? selectedProduct.prod_desc : "", // Auto-fill description
          };
        }
        return { ...product, [field]: value };
      }
      return product;
    });

    setNewItem((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
  };

  const addProductField = () => {
    setNewItem((prev) => ({
      ...prev,
      products: [...prev.products, { productId: "", desc: "", quantity: "" }],
    }));
  };

  const removeProductField = (index) => {
    setNewItem((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const requestData = {
        title: newItem.title,
        branch: newItem.branch,
        requestDate: newItem.requestDate,
        requesterName: newItem.requesterName,
        dateNeed: newItem.dateNeed,
        products: newItem.products.map((product) => ({
          prod_id: parseInt(product.productId, 10),
          desc: product.desc,
          quantity: parseInt(product.quantity, 10),
        })),
      };
  
      await axios.post("http://localhost:3000/add-request", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setSuccessMessage("Request successfully created!");
      setNewItem({
        title: "",
        branch: "",
        requestDate: "",
        requesterName: "",
        dateNeed: "",
        products: [{ productId: "", desc: "", quantity: "" }],
      });
      window.location.reload();
      setCreateReq(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to create request");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 font-poppins z-50 font-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <div className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-2 text-green-950">Request Form</h1>
          <p className="text-sm mb-4 text-green-950">Please fill all the necessary information.</p>

          <form onSubmit={handleSubmit}>
            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newItem.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                placeholder="Enter request title"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Branch</label>
              <input
                type="text"
                name="branch"
                value={newItem.branch}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                placeholder="Enter branch"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Date</label>
              <input
                type="date"
                name="requestDate"
                value={newItem.requestDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                required
              />
            </div>

            {/* Products Section */}
            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">
                Items
                <button
                  type="button"
                  onClick={addProductField}
                  className="ml-2 px-1 py-1 text-green-950 rounded-full hover:bg-green-700 hover:text-white"
                >
                  <MdAddCircle size={20} />
                </button>
              </label>

              {newItem.products.map((product, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-green-900 font-semibold">Product {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeProductField(index)}
                      className="px-1 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>

                  <div className="mb-2">
                    <label className="block text-green-900 text-sm mb-1">Select Product</label>
                    <select
                      value={product.productId}
                      onChange={(e) => handleProductChange(index, "productId", e.target.value)}
                      className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                      required
                    >
                      <option value="">Select a product</option>
                      {products.map((p) => (
                        <option key={p.prod_id} value={p.prod_id}>
                          {p.prod_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="block text-green-900 text-sm mb-1">Description</label>
                    <input
                      type="text"
                      value={product.desc}
                      onChange={(e) => handleProductChange(index, "desc", e.target.value)}
                      className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none"
                      placeholder="Product description"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-green-900 text-sm mb-1">Quantity</label>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                      className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none"
                      placeholder="Enter quantity"
                      required
                      min="1"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Date Needed</label>
              <input
                type="date"
                name="dateNeed"
                value={newItem.dateNeed}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-green-900 text-base font-semibold mb-2">Requester Name</label>
              <input
                type="text"
                name="requesterName"
                value={newItem.requesterName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
                placeholder="Enter name"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-black bg-gray-200 rounded-lg focus:outline-none mr-2 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-950 rounded-lg focus:outline-none hover:bg-green-900"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;