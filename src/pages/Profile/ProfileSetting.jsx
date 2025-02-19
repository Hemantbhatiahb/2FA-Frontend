import { Tabs } from "antd";
import { Outlet } from "react-router-dom";

const ProfileSettings = () => {
  return (
    <div>
      <h2>Profile Settings</h2>
      <Outlet />
    </div>
  );
};

export default ProfileSettings;
