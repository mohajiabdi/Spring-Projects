import React, { useEffect, useState } from "react";
import {
  getAllStudentClasses,
  createStudentClass,
  updateStudentClass,
  deleteStudentClass,
} from "../../services/studentClassService";
import { getAllStudents } from "../../services/studentService";
import { getAllClasses } from "../../services/classService";
import "../styles/studentClass.css";

const StudentClass = () => {
  const [studentClasses, setStudentClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    classId: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [studentRes, classRes, studentClassRes] = await Promise.all([
        getAllStudents(),
        getAllClasses(),
        getAllStudentClasses(),
      ]);

      const students = studentRes.data;
      const classes = classRes.data;

      setStudents(students);
      setClasses(classes);

      const mapped = studentClassRes.data.map((sc) => {
        const student =
          sc.student && sc.student.studentId
            ? sc.student
            : students.find(
                (s) => String(s.studentId) === String(sc.studentId)
              );

        const schoolClass =
          sc.schoolClass && sc.schoolClass.classId
            ? sc.schoolClass
            : classes.find((c) => String(c.classId) === String(sc.classId));

        return {
          ...sc,
          student,
          schoolClass,
        };
      });

      setStudentClasses(mapped);
    } catch (err) {
      console.error("❌ Failed to load student-class data:", err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      studentId: Number(form.studentId),
      classId: Number(form.classId),
    };

    try {
      if (editingId) {
        await updateStudentClass(editingId, payload);
      } else {
        await createStudentClass(payload);
      }
      setForm({ studentId: "", classId: "" });
      setEditingId(null);
      loadAllData();
    } catch (err) {
      alert("❌ Failed to save assignment.");
      console.error("Submit Error:", err.response?.data || err.message);
    }
  };

  const handleEdit = (item) => {
    setForm({
      studentId: item.student?.studentId || item.studentId,
      classId: item.schoolClass?.classId || item.classId,
    });
    setEditingId(item.studentClassId);
  };

  const handleDelete = async (id) => {
    await deleteStudentClass(id);
    loadAllData();
  };

  const isStudentAssigned = !!studentClasses.find(
    (sc) => String(sc.student?.studentId) === String(form.studentId)
  );

  return (
    <div className="student-class-container">
      <h2 className="student-class-title">Assign Student to Class</h2>

      <form className="student-class-form" onSubmit={handleSubmit}>
        <select
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          required
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.studentId} value={s.studentId}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>

        <select
          name="classId"
          value={form.classId}
          onChange={handleChange}
          required
          disabled={isStudentAssigned}
        >
          <option value="">Select Class</option>
          {classes.map((c) => {
            const assignedCount = studentClasses.filter(
              (sc) => sc.schoolClass?.classId === c.classId
            ).length;
            const isFull = assignedCount >= c.capacity;
            return (
              <option key={c.classId} value={c.classId} disabled={isFull}>
                {c.className} ({c.academicYear}) {isFull ? "- FULL" : ""}
              </option>
            );
          })}
        </select>

        <button type="submit" disabled={isStudentAssigned}>
          {editingId ? "Update Assignment" : "Assign Student"}
        </button>
      </form>

      {isStudentAssigned && (
        <div style={{ color: "red", marginTop: "8px" }}>
          This student is already assigned to a class.
        </div>
      )}

      <div className="student-class-table-wrapper">
        <table className="student-class-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Academic Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentClasses.map((sc) => (
              <tr key={sc.studentClassId}>
                <td>
                  {sc.student
                    ? `${sc.student.firstName} ${sc.student.lastName}`
                    : "Unknown"}
                </td>
                <td>{sc.schoolClass?.className || "N/A"}</td>
                <td>{sc.schoolClass?.academicYear || "N/A"}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(sc)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(sc.studentClassId)}
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

export default StudentClass;
