import axios from "axios";

const API = "http://localhost:8080/api/users";

export const loginUser = (credentials) =>
  axios.post(`${API}/login`, credentials);
