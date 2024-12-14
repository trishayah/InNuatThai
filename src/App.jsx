import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css'
import LogIn from './LogIn.jsx'
import VerifyEmail from './EmailVerfication.jsx';
import VerifyCode from './VerficationCode.jsx';
import ChangePassword from './ChangePassword.jsx';
import Sidebar from '../Shared UI/sidebar.jsx';
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />,
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
    }
      
  ]);
  return (
    <RouterProvider router={router} />
  );
}

    export default App;
