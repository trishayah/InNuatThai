import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LogIn from "./LogIn.jsx";
import VerifyEmail from "./EmailVerfication.jsx";
import VerifyCode from "./VerficationCode.jsx";
import ChangePassword from "./ChangePassword.jsx";
// import Sidebar from "../Shared UI/sidebar.jsx";
import Dashboard from "../Shared UI/dashboard.jsx";

// Protected Route wrapper
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<Dashboard />} />,
    },
    {
      path: "/VerifyEmail",
      element: <VerifyEmail />,
    },
    {
      path: "/VerifyCode",
      element: <VerifyCode />,
    },
    {
      path: "/ChangePassword",
      element: <ChangePassword />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
