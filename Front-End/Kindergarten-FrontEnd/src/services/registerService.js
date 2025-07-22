import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const createUser = (user) => axios.post(API_URL, user);
export const getAllUsers = () => axios.get(API_URL);
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
