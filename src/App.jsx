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
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;