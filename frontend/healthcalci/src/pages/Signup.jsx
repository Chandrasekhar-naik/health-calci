import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await signup(username, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <form
        className="card"
        style={{ maxWidth: "400px", margin: "40px auto" }}
        onSubmit={handleSubmit}
      >
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
        )}

        <button type="submit" className="btn btn-blue" style={{ width: "100%" }}>
          Sign Up
        </button>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#007bff" }}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
