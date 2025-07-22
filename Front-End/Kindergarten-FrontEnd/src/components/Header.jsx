import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ adjust path
import "./styles/header.css";

const navLinks = [
  { name: "Home", path: "/home" },
  { name: "Students", path: "/pages/students" },
  { name: "Teachers", path: "/pages/teachers" },
  { name: "Parents", path: "/pages/parents" },
  { name: "Classes", path: "/pages/classes" },
  { name: "Attendance", path: "/pages/attendance" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">Kindergarten Management System</div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {user ? (
          <div
            className="user-profile"
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <div className="user-name">
              {user.username || "User"} ({user.role || "Guest"})
            </div>
            {profileOpen && (
              <div className="profile-dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/" className="nav-link">
            Login
          </NavLink>
        )}

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>
    </header>
  );
}
