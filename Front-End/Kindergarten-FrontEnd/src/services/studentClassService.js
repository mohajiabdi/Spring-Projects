import axios from "axios";

const API = "http://localhost:8080/api/student-classes";

export const getAllStudentClasses = () => axios.get(API);

export const getStudentClassById = (id) => axios.get(`${API}/${id}`);

// ✅ Rename this to match the component
export const createStudentClass = (data) => axios.post(API, data);

export const updateStudentClass = (id, data) => axios.put(`${API}/${id}`, data);

export const deleteStudentClass = (id) => axios.delete(`${API}/${id}`);
