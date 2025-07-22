import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/userService";
import { useAuth } from "./AuthContext";
import "./styles/loginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 use login from context

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials); // should return user object with role
      console.log("LOGIN RESPONSE:", response.data);

      login(response.data); // save user globally + localStorage

      // Dynamic redirect based on role
      const role = response.data.role;
      if (role === "admin") {
        navigate("/home");
      } else {
        navigate("/pages/students"); // default for teachers, parents
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p className="register-link">
          Don’t have an account?{" "}
          <Link className="link" to="/register">
            Create New User
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
