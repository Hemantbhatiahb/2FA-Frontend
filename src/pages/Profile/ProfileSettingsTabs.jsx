import React, {useState} from "react";
import ProfileDetails from "./ProfileDetails";
import Authentication from "./Authentication";
import { Tabs } from "antd";
function ProfileSettingsTabs() {
  const [currentTab, setCurrentTab] = useState("profile-details");
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <Tabs activeKey={currentTab} onChange={handleTabChange}>
      <Tabs.TabPane tab="Profile Details" key="profile-details">
        <ProfileDetails />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Authentication" key="authentication">
        <Authentication />
      </Tabs.TabPane>
    </Tabs>
  );
}

export default ProfileSettingsTabs;
