import React, { useEffect, useState } from "react";
import { getAllClasses } from "../../services/classService";
import { getAllStudentClasses } from "../../services/studentClassService";
import { createAttendance } from "../../services/attendanceService";
import "../styles/attendance.css";

const AttendanceByClass = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [students, setStudents] = useState([]);
  const [presentMap, setPresentMap] = useState({});

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await getAllClasses();
    setClasses(res.data);
  };

  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setSelectedClassId(classId);

    try {
      const res = await getAllStudentClasses();
      const filtered = res.data.filter(
        (item) =>
          String(item.classEntity?.classId) === String(classId) ||
          String(item.schoolClass?.classId) === String(classId)
      );

      const extractedStudents = filtered
        .map((sc) => sc.student)
        .filter((s) => s && s.studentId);

      setStudents(extractedStudents);

      const initialMap = {};
      extractedStudents.forEach((s) => {
        initialMap[s.studentId] = true;
      });
      setPresentMap(initialMap);
    } catch (err) {
      console.error("\u274C Error loading student classes:", err.message);
      alert("Failed to load students for class.");
    }
  };

  const handleCheckboxChange = (id) => {
    setPresentMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const date = new Date().toISOString().split("T")[0];
      for (const s of students) {
        await createAttendance({
          student: { studentId: parseInt(s.studentId) },
          classId: parseInt(selectedClassId),
          status: presentMap[s.studentId] ? "Present" : "Absent",
        });
      }
      alert("Attendance saved!");
      setSelectedClassId("");
      setStudents([]);
      setPresentMap({});
    } catch (err) {
      console.error("❌ Submit Error:", err.response?.data || err.message);
      alert("Failed to save attendance.");
      // Do NOT reset state here
    }
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Mark Attendance by Class</h2>

      <div className="attendance-form">
        <select value={selectedClassId} onChange={handleClassChange} required>
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.classId} value={c.classId}>
              {c.className} ({c.academicYear})
            </option>
          ))}
        </select>
      </div>

      {selectedClassId && students.length > 0 && (
        <form onSubmit={handleSubmit}>
          <div className="attendance-table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Present</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.studentId}>
                    <td>
                      {s.firstName} {s.lastName}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={presentMap[s.studentId] || false}
                        onChange={() => handleCheckboxChange(s.studentId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="submit-btn" type="submit">
            Submit Attendance
          </button>
        </form>
      )}

      {selectedClassId && students.length === 0 && (
        <p className="no-students-message">
          No students found for this class !
        </p>
      )}
    </div>
  );
};

export default AttendanceByClass;
