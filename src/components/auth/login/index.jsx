import React, { useState } from "react";
import "../login/style.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "admin@mail.com" && password === "Admin") {
      setSuccess("Admin login successful");
      setError("");
      console.log("Admin logged in");
      sessionStorage.setItem("userId", "admin");
      sessionStorage.setItem("role", "admin");

      // ✅ Dispatch event to update Navbar instantly
      window.dispatchEvent(new Event("userLoggedIn"));

      navigate("/admin");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      setSuccess(response.data.message);
      setError("");
      console.log("Token:", response.data.token);

      // ✅ Store user ID & token in sessionStorage
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("username", response.data.username);

      // ✅ Dispatch event to update Navbar instantly
      window.dispatchEvent(new Event("userLoggedIn"));

      navigate("/"); // Redirect to Home
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      setSuccess("");
    }
  };

  return (
    <div className="auth">
      <h1 className="auth__heading">Login</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__form__field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="auth__form__field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="auth__button">
          Login
        </button>
        {error && <p className="auth__error">{error}</p>}
        {success && <p className="auth__success">{success}</p>}
      </form>
      <p className="auth__register-link">
        New User? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
