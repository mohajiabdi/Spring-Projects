import axios from "axios";

const API = "http://localhost:8080/api/classes";

export const getAllClasses = () => axios.get(API);
export const getClassById = (id) => axios.get(`${API}/${id}`);
export const createClass = (data) => axios.post(API, data);
export const updateClass = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteClass = (id) => axios.delete(`${API}/${id}`);
