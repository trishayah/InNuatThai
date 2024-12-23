import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccInfo from "./accInfo";

const Dashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    pendingRequests: 0,
    lowStockItems: 0,
    totalRequests: 0,
    receivedRequests: 0,
    pendingBranchRequests: 0,
    pendingInventoryRequests: 0,
  });

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userData || !token) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(userData));

    // Fetch metrics with authentication
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/dashboard/metrics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMetrics(response.data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    // Refresh metrics every 5 minutes
    const intervalId = setInterval(fetchMetrics, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  const BranchView = () => (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
      <div className="border-2 rounded-lg p-6 bg-white">
        <h3 className="text-lg font-medium mb-4 font-poppins">
          Pending Requests
        </h3>
        <p className="text-4xl font-bold text-green-800  font-poppins">
          {metrics.pendingRequests}
        </p>
      </div>
    
      <div className="border-2 rounded-lg p-6 md:col-span-2 bg-white">
        <h3 className="text-lg font-medium mb-4 font-poppins">
          Total Requests Made
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins">
          {metrics.totalRequests}
        </p>
      </div>
    </div>
  );

  const WarehouseView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border-2 border-color rounded-lg p-6 bg-white">
        <h3 className="text-lg font-medium mb-4 font-poppins">
          Pending Requests
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins">
          {metrics.pendingRequests}
        </p>
      </div>
      <div className="border-2 rounded-lg p-6 bg-white">
        <h3 className="text-lg font-medium mb-4 font-poppins">
          No. of Item in low stock
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins">
          {metrics.lowStockItems}
        </p>
      </div>
      <div className="border-2 rounded-lg p-6 md:col-span-2 bg-white">
        <h3 className="text-lg font-medium mb-4 font-poppins">
          Total Requests Made
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins">
          {metrics.totalRequests}
        </p>
      </div>
    </div>
  );

  const AccountingView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border-2 rounded-lg p-6 bg-white">
        <h3 className="text-lg font-medium mb-4 font-poppins">
          Received Requests
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins">
          {metrics.receivedRequests}
        </p>
      </div>
      <div className="border-2 rounded-lg p-6 bg-white">
        <h3 className="text-lg font-medium mb-4 font-poppins">
          No. of Item in low stock
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins">
          {metrics.lowStockItems}
        </p>
      </div>
    </div>
  );

  const AdminView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
      {/* Pending Branch Requests */}
      <div className="border rounded-lg p-4 w-[300px] h-[150px] bg-white shadow-md">
        <h3 className="text-md font-medium font-poppins text-center mb-2">
          Pending Branch Requests
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins text-center">
          {metrics.pendingBranchRequests}
        </p>
      </div>
  
      {/* Pending Inventory Requests */}
      <div className="border rounded-lg p-4 w-[300px] h-[150px] bg-white shadow-md">
        <h3 className="text-md font-medium font-poppins text-center mb-2">
          Pending Inventory Requests
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins text-center">
          {metrics.pendingInventoryRequests}
        </p>
      </div>
  
      {/* Received Requests */}
      <div className="border rounded-lg p-4 w-[300px] h-[150px] bg-white shadow-md">
        <h3 className="text-md font-medium font-poppins text-center mb-2">
          Received Requests
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins text-center">
          {metrics.receivedRequests}
        </p>
      </div>
  
      {/* Low Stock Items */}
      <div className="border rounded-lg p-4 w-[300px] h-[150px] bg-white shadow-md">
        <h3 className="text-md font-medium font-poppins text-center mb-2">
          Low Stock Items
        </h3>
        <p className="text-4xl font-bold text-green-800 font-poppins text-center">
          {metrics.lowStockItems}
        </p>
      </div>
    </div>
  );
  

  const renderDashboard = () => {
    if (!user) return null;
    // Convert role to lowercase for consistent comparison
    const userRole = user.role?.toLowerCase();

    switch (userRole) {
      case "accounting":
        return <AccountingView />;
      case "admin":
        return <AdminView />;
      case "branch":
        return <BranchView />;
      case "warehouse":
        return <WarehouseView />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  if (!user) return null;

  
  return (
    <div className = "flex flex-col flex-1 items-end h-full font-poppins bg-[#D9D9D9]">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold text-[#133517] mt-4 ml-6">Dashboard</h2>
          <AccInfo user={user} />
        </div>
          <div className="p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26582D]"></div>
            </div>
          ) : (
            renderDashboard()
          )}
        </div>
  </div>
  );
};

export default Dashboard;
