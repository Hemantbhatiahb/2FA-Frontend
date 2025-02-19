import React, { useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import { Link } from "react-router-dom";
import { registerUser, resendVerificationEmail } from "../../api/users";

function Register() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await registerUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error registering user: ", error);
      message.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      return message.error("Please enter an email to resend verification.");
    }

    try {
      setLoading(true);
      const response = await resendVerificationEmail({ email });
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      message.error(
        error.response?.data?.message || "Failed to resend verification email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="App-header">
      <h1>Register</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter your Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password is required!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter your Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form>
        <div>
          <p>
            Already a User? <Link to="/login">Login</Link>
          </p>
          <Button type="link" onClick={handleResendVerification}>
            Resend Verification Email
          </Button>
        </div>
        {loading && <Spin size="default" />}
      </section>
    </main>
  );
}

export default Register;
