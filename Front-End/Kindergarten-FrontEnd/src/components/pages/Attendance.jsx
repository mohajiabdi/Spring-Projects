import React, { useEffect, useState } from "react";
import { getAllClasses } from "../../services/classService";
import { getAllStudentClasses } from "../../services/studentClassService";
import { createAttendance } from "../../services/attendanceService";
import { getAllAttendances } from "../../services/attendanceService";
import "../styles/attendance.css";

const AttendanceByClass = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [students, setStudents] = useState([]);
  const [presentMap, setPresentMap] = useState({});
  const [reportClassId, setReportClassId] = useState("");
  const [reportFrom, setReportFrom] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0]
  );
  const [reportTo, setReportTo] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [reportData, setReportData] = useState([]);

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filterClassId, setFilterClassId] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    loadFilteredAttendance();
  }, [filterClassId, startDate, endDate]);

  const loadFilteredAttendance = async () => {
    try {
      const res = await getAllAttendances();
      const allData = res.data;

      const filtered = allData.filter((a) => {
        const date = new Date(a.attendanceDate || a.date);
        const classId = a.schoolClass?.classId || a.classEntity?.classId;
        return (
          (!filterClassId || String(classId) === String(filterClassId)) &&
          date >= new Date(startDate) &&
          date <= new Date(endDate)
        );
      });

      setAttendanceRecords(filtered);
    } catch (err) {
      console.error("❌ Failed to load attendance records:", err.message);
    }
  };

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
      for (const s of students) {
        await createAttendance({
          studentId: parseInt(s.studentId),
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
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const today = new Date().toISOString().split("T")[0];

  //   try {
  //     // Fetch all existing attendance records
  //     const existing = await getAllAttendances();

  //     // Filter records for the selected class and today's date
  //     const todayCount = existing.data.filter(
  //       (a) =>
  //         String(a.classEntity?.classId) === String(selectedClassId) &&
  //         a.attendanceDate?.split("T")[0] === today
  //     ).length;

  //     if (todayCount >= 6) {
  //       alert(
  //         "⚠️ This class has already taken 6 attendance entries today. Please try again tomorrow."
  //       );
  //       return;
  //     }

  //     // Proceed with creating attendance
  //     for (const s of students) {
  //       await createAttendance({
  //         student: { studentId: parseInt(s.studentId) },
  //         classId: parseInt(selectedClassId),
  //         status: presentMap[s.studentId] ? "Present" : "Absent",
  //       });
  //     }

  //     alert("✅ Attendance saved!");
  //     setSelectedClassId("");
  //     setStudents([]);
  //     setPresentMap({});
  //   } catch (err) {
  //     console.error("❌ Submit Error:", err.response?.data || err.message);
  //     alert("Failed to save attendance.");
  //   }
  // };

  const loadReportData = async () => {
    try {
      const res = await getAllAttendances();
      const all = res.data;

      const filtered = all.filter((att) => {
        const attDate = new Date(att.attendanceDate);
        const from = new Date(reportFrom);
        const to = new Date(reportTo);

        const matchesClass =
          !reportClassId ||
          String(att.classEntity?.classId) === String(reportClassId);
        const inRange = attDate >= from && attDate <= to;

        return matchesClass && inRange;
      });

      setReportData(filtered);
    } catch (err) {
      console.error("❌ Failed to load report data:", err.message);
      alert("Failed to fetch report.");
    }
  };
  useEffect(() => {
    loadReportData();
  }, [reportClassId, reportFrom, reportTo]);

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

      <div className="report-section">
        <h3 className="report-title">Attendance Report</h3>

        <div className="report-filters">
          <select
            value={filterClassId}
            onChange={(e) => setFilterClassId(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c.classId} value={c.classId}>
                {c.className} ({c.academicYear})
              </option>
            ))}
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="report-table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Class</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((rec) => (
                  <tr key={rec.attendanceId}>
                    <td>
                      {new Date(rec.attendanceDate || rec.date).toDateString()}
                    </td>
                    <td>
                      {rec.student
                        ? `${rec.student.firstName} ${rec.student.lastName}`
                        : "Unknown"}
                    </td>
                    <td>
                      {rec.schoolClass?.className ||
                        rec.classEntity?.className ||
                        "N/A"}
                    </td>
                    <td>{rec.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceByClass;
