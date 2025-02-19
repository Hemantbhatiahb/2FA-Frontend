import React, { useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/users";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState("");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!newPassword) return message.error("Enter your new password.");

    try {
      setLoading(true)
      const response = await resetPassword({ token, newPassword });
      if (response.success) {
        message.success("Password reset successfully. You can log in now.");
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Invalid or expired link.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <main className="App-header">
      <h1>Reset Password</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical">
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
          <Button type="primary" onClick={handleReset}>
            Reset Password
          </Button>
        </Form>
        { loading && <Spin size='default' />}
      </section>
    </main>
  );
}

export default ResetPassword;
