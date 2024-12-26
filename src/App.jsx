import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import LogIn from "./LogIn.jsx";
import VerifyEmail from "./EmailVerfication.jsx";
import VerifyCode from "./VerficationCode.jsx";
import ChangePassword from "./ChangePassword.jsx";
import Sidebar from "../Shared UI/sidebar.jsx";
import Dashboard from "../Shared UI/dashboard.jsx";
// import AccountingMain from "./Accounting/accountingMain.jsx";
import Request from "../Shared UI/Request.jsx";
import RequestDetails from "../Shared UI/RequestDetails.jsx";
import Inventory from "../Shared UI/Inventory.jsx";
import DeliveryInstructionForm from "../Shared UI/DIF.jsx";
import AccInfo from "../Shared UI/accInfo.jsx";
import PurchaseOrder from "../Shared UI/PurchaseOrder.jsx";
import StockReceivingReport from "../Shared UI/WSRR.jsx";
import ApprovalRequest from "../src/Admin/ApprovalRequest.jsx";
import NextApprovalRequest from "../src/Admin/NextApprovalRequest.jsx";
import AddInventory from "../src/Admin/AddInventory.jsx";
import UpdateInventory from "../src/Admin/UpdateInventory.jsx";
import RemoveInventory from "../src/Admin/RemoveInventory.jsx";
import ApprovalAddInventory from "./Admin/ApprovalAddInventory.jsx";
import ApprovalUpdateInventory from "./Admin/ApprovalUpdateInventory.jsx";
import ApprovalRemoveInventory from "./Admin/ApprovalRemoveInventory.jsx";
import DIFDownload from "../Shared UI/DIFDownloadButton.jsx";
import PODownload from "../Shared UI/PODownloadButton.jsx";
import SelectAndDelete from "../Shared UI/SelectDelete.jsx";
import WSRRDownload from "../Shared UI/WSRRDownload.jsx";
import EditProfile from "../Shared UI/EditProfile.jsx";

// Auth Wrapper
const isAuthenticated = () => !!localStorage.getItem("token");

// Layout with Sidebar
const ProtectedLayout = () => {
  return isAuthenticated() ? (
    <div className="flex h-screen">
      <Sidebar role={JSON.parse(localStorage.getItem("user"))?.role || "guest"} />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

const router = createBrowserRouter([
  {path: "/", element: <DeliveryInstructionForm/>},
  // { path: "/", element: <LogIn /> },
  // { path: "/VerifyEmail", element: <VerifyEmail /> },
  // { path: "/VerifyCode", element: <VerifyCode /> },
  // { path: "/ChangePassword", element: <ChangePassword /> },
  // {
  //   path: "/accounting/*",
  //   element: <ProtectedLayout />,
  //   children: [{ index: true, element: <AccountingMain /> }],
  // },
  // { path: "/dashboard", element: <ProtectedLayout />, 
  //   children: [ 
  //     { index: true, element: <Dashboard /> }
  //   ]
  //   }, 
  // {
  //   path: "admin/dashboard",
  //   element: <ProtectedLayout />,
  //   children: [
  //     { index: true, element: <Dashboard /> },
      // { path: "admin/request", element: <Request /> },
      // { path: "admin/inventory", element: <Inventory /> },
      // { path: "admin/reports/dif", element: <DeliveryInstructionForm /> },
      // { path: "admin/reports/wsrr", element: <StockReceivingReport /> },
      // { path: "admin/reports/po", element: <PurchaseOrder /> },
  //   ],
  // },
  // {
  //   path: "/accounting/dashboard", element: <ProtectedLayout />,
  //   children: [
  //     { index: true, element: <Dashboard /> },
  //     { path: "accounting/request", element: <Request /> },
      // { path: "accounting/inventory", element: <Inventory /> },
      // { path: "accounting/reports/dif", element: <DeliveryInstructionForm /> },
      // { path: "accounting/reports/wsrr", element: <StockReceivingReport /> },
      // { path: "accounting/reports/po", element: <PurchaseOrder /> },
  //   ],
  // },
  // {
  //   path: "/warehouse/dashboard", element: <ProtectedLayout />,
  //   children: [
  //     { index: true, element: <Dashboard /> },
  //     { path: "warehouse/inventory", element: <Inventory /> },
  //   ],
  // },
  // {
  //   path: "/branch/dashboard", element: <ProtectedLayout />,
  //   children: [
  //     { index: true, element: <Dashboard /> },
  //     { path: "branch/request", element: <Request /> },

  //   ],
  // },
]);

const App = () => <RouterProvider router={router} />;

export default App;