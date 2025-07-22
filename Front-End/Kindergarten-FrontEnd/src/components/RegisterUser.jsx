import React, { useState } from "react";
import { createUser } from "../services/registerService";
import { useNavigate, Link } from "react-router-dom";
import "./styles/RegisterUser.css"; // Assuming you have a CSS file for styling

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      alert("User registered successfully!");
      setFormData({ username: "", password: "", role: "" });
    } catch (err) {
      console.error("Registration failed:", err.message);
      alert("Error registering user");
    }
  };

  return (
    <div className="register-form">
      <h2>Register New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="TEACHER">TEACHER</option>
        </select>
        <button type="submit">Register</button>
        <p className="register-link">
          Already have Acccount{" "}
          <Link className="link" to="/">
            Login Existing Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterUser;
