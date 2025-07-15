import axios from "axios";

const API = "http://localhost:8080/api/auth";

// Register a new user
export const registerUser = (userData) => {
  return axios.post(`${API}/register`, userData);
};

// Login using Basic Auth (optional check if needed)
export const loginUser = (username, password) => {
  return axios.get(`${API}/me`, {
    auth: {
      username,
      password,
    },
  });
};
