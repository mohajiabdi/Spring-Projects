// src/pages/Student.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../services/studentService.js";
import "../styles/student.css";

const Student = () => {
  const { user } = useAuth(); // Get current logged-in user
  console.log(user?.role); // Should show "ADMIN" or "TEACHER"
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await getAllStudents();
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateStudent(editingId, form);
    } else {
      await createStudent(form);
    }
    setForm({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
    });
    setEditingId(null);
    loadStudents();
  };

  const handleEdit = (student) => {
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
    });
    setEditingId(student.studentId);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div className="student-container">
      <h2 className="student-title">Student Management</h2>

      {/* Show add form for all users */}
      <form className="student-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="student-table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Gender</th>
              {user?.role === "ADMIN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.studentId}>
                <td>{s.firstName}</td>
                <td>{s.lastName}</td>
                <td>{s.dateOfBirth}</td>
                <td>{s.gender}</td>
                {user.role === "admin" && (
                  <td>
                    <button onClick={() => handleEdit(s.id)}>Edit</button>
                    <button onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
