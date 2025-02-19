import React, { useEffect } from "react";
import {
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { message, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loaderActions } from "../redux/loaderSlice";
import { userActions } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logoutUser } from "../api/users";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.loaders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Header } = Layout;

  useEffect(() => {
    async function getValidUser() {
      try {
        dispatch(loaderActions.showLoader());
        const response = await getCurrentUser();
        console.log("user fetched: ", response.data);
        dispatch(userActions.setCurrentUser(response.data));
      } catch (error) {
        console.log("Error fetching current user: ", error);
        message.error("Please login again");
        navigate("/login");
      } finally {
        dispatch(loaderActions.hideLoader());
      }
    }

    getValidUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        message.success(response.message);
        dispatch(userActions.setCurrentUser(null));
        navigate("/login"); // Redirect to login after logout
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Logout failed. Try again.");
    }
  };

  const navItems = [
    {
      label: user ? `${user.name}` : "username",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                navigate("/profile-settings");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  return (
    <>
      {loading && <p> Loading...</p>}
      {user && (
        <>
          <Layout>
            <Header
              className="d-flex justify-content-between"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3 className="text-white m-0" style={{ color: "white" }}>
                <Link to='/' style={{color: '#fff'}}> 2 Factor Auth</Link>
              </h3>
              <Menu theme="dark" mode="horizontal" items={navItems} />
            </Header>
            <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
              {children}
            </div>
          </Layout>
        </>
      )}
    </>
  );
}

export default ProtectedRoute;
