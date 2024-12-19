import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../Shared UI/sidebar.jsx";
import Dashboard from "../../Shared UI/dashboard.jsx";
import Request from "../../Shared UI/request.jsx";
import AccInfo from "../../Shared UI/accInfo.jsx";
import SearchBar from "../../Shared UI/searchBar.jsx";
// import Inventory from "../Shared UI/inventory.jsx";
// import Reports from "../Shared UI/reports.jsx";
// import Archive from "../Shared UI/archive.jsx";

const AccountingMain = () => {
    return (
        <div className="flex h-screen w-screen">
            {/* Sidebar */}
            <Sidebar role="accounting" />

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                {/* Header: AccInfo and SearchBar */}
                <div className="mb-4">
                    <SearchBar />
                    <AccInfo />
                </div>

                {/* Routing Logic */}
                <Routes>
                    {/* <Route path="/accounting/dashboard" element={<Dashboard />} /> */}
                    <Route path="/accounting/request" element={<Request />} />
                    {/* Add other accounting-related routes here */}
                    {/* <Route path="/accounting/inventory" element={<Inventory />} /> */}
                    {/* <Route path="/accounting/reports" element={<Reports />} /> */}
                    {/* <Route path="/accounting/archive" element={<Archive />} /> */}
                    {/* Redirect to dashboard by default */}
                    <Route path="*" element={<Navigate to="/accounting/dashboard" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default AccountingMain;
