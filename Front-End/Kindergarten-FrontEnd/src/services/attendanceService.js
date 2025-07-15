import axios from "axios";
const API = "http://localhost:8080/api/attendance";

export const getAllAttendances = () => axios.get(API);
export const createAttendance = (data) => axios.post(API, data);
export const updateAttendance = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteAttendance = (id) => axios.delete(`${API}/${id}`);
