import React, { useEffect, useState } from "react";
import {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../../services/classService";
import { getAllTeachers } from "../../services/teacherService";
import "../styles/classes.css";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    className: "",
    academicYear: "",
    capacity: "",
    teacherId: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData(); // Combined loading
  }, []);

  const loadData = async () => {
    const [classesRes, teachersRes] = await Promise.all([
      getAllClasses(),
      getAllTeachers(),
    ]);

    const allTeachers = teachersRes.data;
    setTeachers(allTeachers);

    // Map teachers to classes (handle both teacherId and teacher object)
    const classesWithTeachers = classesRes.data.map((c) => {
      // Prefer c.teacher.teacherId if present, else c.teacherId
      const teacherId =
        c.teacher && c.teacher.teacherId ? c.teacher.teacherId : c.teacherId;

      const assignedTeacher = allTeachers.find(
        (t) => String(t.teacherId) === String(teacherId)
      );

      return {
        ...c,
        teacher: assignedTeacher || null,
      };
    });
    setClasses(classesWithTeachers);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert teacherId to number
    const payload = {
      ...form,
      teacher: { teacherId: Number(form.teacherId) },
    };
    try {
      if (editingId) {
        await updateClass(editingId, payload);
      } else {
        await createClass(payload);
      }
      setForm({
        className: "",
        academicYear: "",
        capacity: "",
        teacherId: "",
      });
      setEditingId(null);
      loadData(); // Reload all data
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 409 ||
          err.response.data?.message?.toLowerCase().includes("duplicate"))
      ) {
        alert("This class already exists. Please enter a unique class.");
      } else {
        alert("Failed to save class. Please try again.");
      }
      console.error("Class submit error:", err.response?.data || err.message);
    }
  };

  const handleEdit = (c) => {
    setForm({
      className: c.className,
      academicYear: c.academicYear,
      capacity: c.capacity,
      teacherId: c.teacher?.teacherId || "", // This part is already correct
    });
    setEditingId(c.classId);
  };

  const handleDelete = async (id) => {
    await deleteClass(id);
    loadData(); // Reload all data
  };

  return (
    <div className="class-container">
      <h2 className="class-title">Class Management</h2>

      <form className="class-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="className"
          placeholder="Class Name"
          value={form.className}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="academicYear"
          placeholder="Academic Year"
          value={form.academicYear}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          max={50} // Assuming a max capacity of 100
          onChange={handleChange}
          required
        />
        <select
          name="teacherId"
          value={form.teacherId}
          onChange={handleChange}
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.teacherId} value={t.teacherId}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </select>
        <button type="submit">
          {editingId ? "Update Class" : "Add Class"}
        </button>
      </form>

      <div className="class-table-wrapper">
        <table className="class-table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Academic Year</th>
              <th>Capacity</th>
              <th>Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.classId}>
                <td>{c.className}</td>
                <td>{c.academicYear}</td>
                <td>{c.capacity}</td>
                <td>
                  {c.teacher
                    ? `${c.teacher.firstName} ${c.teacher.lastName}`
                    : "Not Assigned"}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(c)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(c.classId)}
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

export default Classes;
