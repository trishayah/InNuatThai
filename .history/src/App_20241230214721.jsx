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
import Request from "../Shared UI/Request.jsx";
import Inventory from "../Shared UI/Inventory.jsx";
import DeliveryInstructionForm from "../Shared UI/DIF.jsx";
import StockReceivingReport from "../Shared UI/WSRR.jsx";
import PurchaseOrder from "../Shared UI/PO.jsx";
import ApprovalRequest from "../src/Admin/ApprovalRequest.jsx";
import NextApprovalRequest from "../src/Admin/NextApprovalRequest.jsx";
import AddInventory from "../src/Admin/AddInventory.jsx";
import UpdateInventory from "../src/Admin/UpdateInventory.jsx";
import RemoveInventory from "../src/Admin/RemoveInventory.jsx";
import ApprovalAddInventory from "./Admin/ApprovalAddInventory.jsx";
import ApprovalUpdateInventory from "./Admin/ApprovalUpdateInventory.jsx";
import ApprovalRemoveInventory from "./Admin/ApprovalRemoveInventory.jsx";

// Auth Wrapper
const isAuthenticated = () => !!localStorage.getItem("token");

// Layout with Sidebar
const ProtectedLayout = () => {
  return isAuthenticated() ? (
    <div className="flex h-screen">
      <Sidebar role={JSON.parse(localStorage.getItem("user"))?.role || "guest"} />
      <div className="flex-1 ml-60 w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};


const router = createBrowserRouter([
  { path: "/", element: <LogIn /> },
  { path: "/VerifyEmail", element: <VerifyEmail /> },
  { path: "/VerifyCode", element: <VerifyCode /> },
  { path: "/ChangePassword", element: <ChangePassword /> },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "request", element: <Request /> },
      { path: "inventory", element: <Inventory /> },
      { path: "dif", element: <DeliveryInstructionForm /> },
      { path: "wsrr", element: <StockReceivingReport /> },
      { path: "po", element: <PurchaseOrder /> },
      { path: "approvalreq", element: <ApprovalRequest /> },
      { path: "nxtapprovalreq", element: <NextApprovalRequest /> },
      { path: "addinv", element: <AddInventory /> },
      { path: "updateinv", element: <UpdateInventory /> },
      { path: "rmvinv", element: <RemoveInventory /> },
      { path: "approveadd", element: <ApprovalAddInventory /> },
      { path: "approveupdate", element: <ApprovalUpdateInventory /> },
      { path: "approvermv", element: <ApprovalRemoveInventory /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
