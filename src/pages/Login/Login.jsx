import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, forgotPassword, verify2FA } from "../../api/users";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    try {
      setLoading(true)
      let response = await loginUser(values);
      console.log(response);
      if (response.success) {
        if (response.requires2FA) {
          setShow2FA(true);
          setTempEmail(values.email);
          message.info("Enter OTP to continue.");
        } else {
          message.success(response.message);
          navigate("/");
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      message.error(
        error.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false)
    }
  };

  const handleVerify2FA = async (otp) => {
    try {
      const response = await verify2FA({ email: tempEmail, otp });
      if (response.success) {
        message.success("2FA verified. Login successful.");
        navigate("/");
      } else {
        message.error("Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("2FA verification failed:", error);
      message.error("Invalid OTP. Try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      return message.error("Please enter an email.");
    }

    try {
      setLoading(true)
      const response = await forgotPassword({ email });
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error sending reset password email:", error);
      message.error(
        error.response?.data?.message || "Failed to send email. Try again"
      );
    } finally{
      setLoading(false)
    }
  };

  return (
    <main className="App-header">
      <h1>Login</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical" onFinish={onFinish}>
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
            rules={[{ required: true, message: "Password is required!" }]}
          >
            <Input.Password placeholder="Enter your Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
        <div>
          <p>
            New User?{" "}
            <Link style={{ textDecoration: "none" }} to="/register">
              Register
            </Link>
          </p>
          <Button type="link" onClick={handleForgotPassword}>
            Forgot Password?
          </Button>
        </div>
        {loading && <Spin size="default"/>}
      </section>

      {/* OTP Verification Modal */}
      <Modal
        title="Enter OTP"
        open={show2FA}
        onOk={() => handleVerify2FA(token)}
        onCancel={() => setShow2FA(false)}
      >
        <Input
          placeholder="Enter OTP"
          onChange={(e) => setToken(e.target.value)}
        />
      </Modal>
    </main>
  );
}

export default Login;
