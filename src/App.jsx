import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileSetting from "./pages/Profile/ProfileSetting";
import TwoFactorSetup from "./pages/Profile/TwoFactorSetup/TwoFactorSetup";
import ProfileSettingsTabs from "./pages/Profile/ProfileSettingsTabs";
import ResetPassword from "./pages/ResetPass/ResetPassword";
import ChangePassword from './pages/Profile/ChangePass/ChangePassword';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile-settings",
        element: (
          <ProtectedRoute>
            <ProfileSetting />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ProfileSettingsTabs />,
          },
          { path: "2fa", element: <TwoFactorSetup /> },
          { path: 'change-password', element: <ChangePassword />}
        ],
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
