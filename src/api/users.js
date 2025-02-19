import { axiosInstance } from ".";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/users/register", userData);
    console.log("response: ", response);
    return response.data;
  } catch (error) {
    console.log("error registering user: ", error);
    throw error;
  }
};

export const resendVerificationEmail = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/resend-verification",
      data
    );
    return response.data;
  } catch (error) {
    console.log("error verification user: ", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/users/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (data) => {
  const response = await axiosInstance.post("/api/users/forgot-password", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/api/users/current-user", {
    withCredentials: true,
  });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axiosInstance.post("/api/users/reset-password", data);
  return response.data;
};

export const enable2FA = async (data) => {
  const response = await axiosInstance.post("/api/users/enable-2fa", data);
  return response.data;
};

export const disable2FA = async (data) => {
  const response = await axiosInstance.post("/api/users/disable-2fa", data);
  return response.data;
};

export const verify2FA = async (data) => {
  const response = await axiosInstance.post("/api/users/verify-2fa", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/api/users/logout", {
    withCredentials: true,
  });
  return response.data;
};

export const updateUser = async (data) => {
  const response = await axiosInstance.put(`/api/users/update-user/${data._id}`, data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await axiosInstance.put("/api/users/change-password", data);
  return response.data;
};
