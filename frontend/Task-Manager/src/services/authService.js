import axios from "axios";

// 🔴 CHANGE THIS ALSO TO YOUR RENDER URL
const AUTH_URL = "https://task-manager-9c40.onrender.com/api/auth";

export const signupUser = (data) => {
  return axios.post(`${AUTH_URL}/signup`, data);
};

export const loginUser = (data) => {
  return axios.post(`${AUTH_URL}/login`, data);
};

export const updateProfile = (id, data, token) => {
  return axios.put(`${AUTH_URL}/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
