import React, { useEffect, useState } from "react";
import {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../services/teacherService.js";
import "../styles/teacher.css";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    hireDate: "",
    qualifications: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    const res = await getAllTeachers();
    setTeachers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateTeacher(editingId, form);
    } else {
      await createTeacher(form);
    }
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      hireDate: "",
      qualifications: "",
    });
    setEditingId(null);
    loadTeachers();
  };

  const handleEdit = (teacher) => {
    setForm({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      phoneNumber: teacher.phoneNumber,
      hireDate: teacher.hireDate,
      qualifications: teacher.qualifications,
    });
    setEditingId(teacher.teacherId);
  };

  const handleDelete = async (id) => {
    await deleteTeacher(id);
    loadTeachers();
  };

  return (
    <div className="teacher-container">
      <h2 className="teacher-title">Teacher Management</h2>

      <form className="teacher-form" onSubmit={handleSubmit}>
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
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="hireDate"
          placeholder="Hire Date"
          value={form.hireDate}
          onChange={handleChange}
          required
        />
        <textarea
          name="qualifications"
          placeholder="Qualifications"
          value={form.qualifications}
          onChange={handleChange}
          rows={3}
          required
        />
        <button type="submit">
          {editingId ? "Update Teacher" : "Add Teacher"}
        </button>
      </form>

      <div className="teacher-table-wrapper">
        <table className="teacher-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Hire Date</th>
              <th>Qualifications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.teacherId}>
                <td>{t.firstName}</td>
                <td>{t.lastName}</td>
                <td>{t.email}</td>
                <td>{t.phoneNumber}</td>
                <td>{t.hireDate}</td>
                <td>{t.qualifications}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(t)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t.teacherId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;
