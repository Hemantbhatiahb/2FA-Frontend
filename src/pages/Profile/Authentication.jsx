import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import { disable2FA } from "../../api/users";
function Authentication() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const is2FAEnabled = user.is2FAEnabled;

  const handleDisable2FA = async () => {
    try {
      const response = await disable2FA({ userId: user._id });
      message.success("2FA Disabled successfully");
      console.log('disable 2fa  :' , response)
      dispatch(userActions.setCurrentUser(response.data));
    } catch (error) {
      message.error("Error disabling 2FA, Try Again");
    }
  };
  return (
    <div>
      <h3>Two-Factor Authentication (2FA)</h3>
      <p>Enhance your account security by enabling 2FA.</p>
      {!is2FAEnabled ? (
        <Button
          type="primary"
          onClick={() => navigate("/profile-settings/2fa")}
        >
          Enable 2FA
        </Button>
      ) : (
        <Button danger="true" onClick={handleDisable2FA}>
          Disable 2FA
        </Button>
      )}
    </div>
  );
}

export default Authentication;
