import React, { useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../api/users";

function ChangePassword() {
  const { user } = useSelector((state) => state.users);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      return message.error("Please fill in both fields.");
    }

    try {
      setLoading(true);
      const response = await changePassword({
        userId: user._id,
        oldPassword,
        newPassword,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile-settings");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mw-500 px-3">
      <h2>Change Password</h2>
      <Form layout="vertical">
        <Form.Item label="Old Password">
          <Input.Password onChange={(e) => setOldPassword(e.target.value)} />
        </Form.Item>
        <Form.Item label="New Password">
          <Input.Password onChange={(e) => setNewPassword(e.target.value)} />
        </Form.Item>
        <Button type="primary" onClick={handleChangePassword}>
          Update Password
        </Button>
        <div>{loading && <Spin size="default" />}</div>
      </Form>
    </section>
  );
}

export default ChangePassword;
