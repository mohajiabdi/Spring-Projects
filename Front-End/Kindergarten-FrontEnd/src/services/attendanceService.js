import axios from "axios";
const API = "http://localhost:8080/api/attendance";

export const getAllAttendances = () => axios.get(API);
export const createAttendance = (attendanceData) => {
  return axios.post(API, attendanceData); // this should send a flat DTO
};
export const updateAttendance = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteAttendance = (id) => axios.delete(`${API}/${id}`);
