// src/components/Header.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles/header.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Students", path: "/pages/students" },
  { name: "Teachers", path: "/pages/teachers" },
  { name: "Parents", path: "/pages/parents" },
  { name: "Classes", path: "/pages/classes" },
  { name: "Attendance", path: "/pages/attendance" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>
    </header>
  );
}
