import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { forgotPassword } from "../../api/users";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !newPassword) {
      return message.error("Please enter email and new password.");
    }

    try {
      const response = await forgotPassword({ email, newPassword });
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <main className="App-header">
      <h1>Forgot Password</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical">
          <Form.Item
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="New Password"
            rules={[
              { required: true, message: "Password is required!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </section>
    </main>
  );
}

export default ForgotPassword;
