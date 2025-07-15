import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../styles/home.css";
import { getAllStudents } from "../../services/studentService";
import { getAllTeachers } from "../../services/teacherService";
import { getAllClasses } from "../../services/classService";
import { getAllAttendances } from "../../services/attendanceService";
import "react-calendar/dist/Calendar.css";

const Home = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const [students, teachers, classes, attendances] = await Promise.all([
      getAllStudents(),
      getAllTeachers(),
      getAllClasses(),
      getAllAttendances(),
    ]);

    setStudentCount(students.data.length);
    setTeacherCount(teachers.data.length);
    setClassCount(classes.data.length);

    // Filter attendances for last 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const recentAttendances = attendances.data.filter((a) => {
      const attDate = new Date(a.date);
      return attDate >= thirtyDaysAgo && attDate <= now;
    });

    const total = recentAttendances.length;
    const present = recentAttendances.filter(
      (a) => a.status === "Present"
    ).length;
    setAttendanceRate(total ? Math.round((present / total) * 100) : 0);
  };

  return (
    <div className="dashboard">
      <div className="hero-section">
        <h1>Welcome to the Kindergarten System</h1>
      </div>

      <div className="card-grid">
        <div className="dash-card students">
          <h3>Students</h3>
          <p>{studentCount}</p>
        </div>
        <div className="dash-card teachers">
          <h3>Teachers</h3>
          <p>{teacherCount}</p>
        </div>
        <div className="dash-card classes">
          <h3>Classes</h3>
          <p>{classCount}</p>
        </div>
        <div className="dash-card attendance">
          <h3>Attendance Rate</h3>
          <p>{attendanceRate}%</p>
        </div>
      </div>

      <div className="calendar-section">
        <h3>Today: {date.toDateString()}</h3>
        <div>
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
    </div>
  );
};

export default Home;
