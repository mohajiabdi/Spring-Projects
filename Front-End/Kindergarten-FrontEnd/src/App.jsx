import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Student from "./components/pages/Student";
import Parents from "./components/pages/Parents";
import Teacher from "./components/pages/Teacher";
import StudentWithClasses from "./components/pages/StudentWithClasses.jsx";
import Attendance from "./components/pages/Attendance.jsx";
import Home from "./components/pages/Home.jsx";
import "./index.css"; // Assuming you have a global CSS file

function App() {
  return (
    <Router>
      <div className=" main-content">
        <Header />
        <Routes className="main-content">
          <Route
            path="/"
            element={
              <Home /> // Assuming Home is the main dashboard page
            }
          />

          <Route path="/pages/students" element={<Student />} />
          <Route path="/pages/parents" element={<Parents />} />
          <Route path="/pages/teachers" element={<Teacher />} />
          <Route path="/pages/classes" element={<StudentWithClasses />} />

          <Route path="/pages/attendance" element={<Attendance />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
