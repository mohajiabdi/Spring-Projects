import axios from "axios";

const API = "http://localhost:8080/api/student-parents";

export const getAllStudentParents = () => axios.get(API);
export const getStudentParentById = (id) => axios.get(`${API}/${id}`);
export const assignParent = (data) => axios.post(API, data);
export const updateStudentParent = (id, data) =>
  axios.put(`${API}/${id}`, data);
export const deleteStudentParent = (id) => axios.delete(`${API}/${id}`);
