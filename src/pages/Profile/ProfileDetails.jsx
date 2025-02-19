import React, { useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/users";
import { userActions } from "../../redux/userSlice";

function ProfileDetails() {
  const { user } = useSelector((state) => state.users);
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await updateUser({ ...user, name: name });
      if (response.success) {
        message.success(response.message);
        dispatch(userActions.setCurrentUser(response.data))
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mw-500 px-3">
      <h2>Profile</h2>
      <Form layout="vertical">
        <Form.Item label="Email">
          <Input value={user.email} disabled />
        </Form.Item>
        <Form.Item label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Button
          type="primary"
          onClick={handleUpdate}
          disabled={user.name === name}
        >
          Update Profile
        </Button>
      </Form>
      <Button
        type="link"
        onClick={() => navigate("/profile-settings/change-password")}
      >
        Change Password
      </Button>
      <div>{loading && <Spin size="default" />}</div>
    </section>
  );
}

export default ProfileDetails;
