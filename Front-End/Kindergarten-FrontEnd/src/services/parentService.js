import axios from "axios";

const API = "http://localhost:8080/api/parents";

export const getAllParents = () => axios.get(API);
export const createParent = (data) => axios.post(API, data);
export const updateParent = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteParent = (id) => axios.delete(`${API}/${id}`);
