import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Student from "./components/pages/Student";
import Parents from "./components/pages/Parents";
import Teacher from "./components/pages/Teacher";
import StudentWithClasses from "./components/pages/StudentWithClasses.jsx";
import Attendance from "./components/pages/Attendance.jsx";
import Home from "./components/pages/Home.jsx";
import RegisterUser from "./components/RegisterUser.jsx";
import LoginForm from "./components/LoginForm.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login and Register - Without Header/Footer */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* All other routes with Header/Footer layout */}
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/pages/students"
          element={
            <>
              <Header />
              <Student />
              <Footer />
            </>
          }
        />
        <Route
          path="/pages/parents"
          element={
            <>
              <Header />
              <Parents />
              <Footer />
            </>
          }
        />
        <Route
          path="/pages/teachers"
          element={
            <>
              <Header />
              <Teacher />
              <Footer />
            </>
          }
        />
        <Route
          path="/pages/classes"
          element={
            <>
              <Header />
              <StudentWithClasses />
              <Footer />
            </>
          }
        />
        <Route
          path="/pages/attendance"
          element={
            <>
              <Header />
              <Attendance />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
