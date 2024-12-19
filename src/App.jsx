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

// Auth Wrapper
const isAuthenticated = () => !!localStorage.getItem("token");

// Layout with Sidebar
const ProtectedLayout = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Fetch user data
  return isAuthenticated() ? (
    <div className="flex h-screen">
      <Sidebar role={user?.role} /> {/* Pass role dynamically */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
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
    path: "/dashboard",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // Add other protected routes here
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;