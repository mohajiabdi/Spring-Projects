import axios from "axios";

const API = "http://localhost:8080/api/exam-results";

export const getAllResults = () => axios.get(API);
export const getResultById = (id) => axios.get(`${API}/${id}`);
export const createResult = (data) => axios.post(API, data);
export const updateResult = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteResult = (id) => axios.delete(`${API}/${id}`);
