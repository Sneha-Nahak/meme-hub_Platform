// File: src/components/Navbar.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePublish = () => {
    alert("Publishing functionality to be added.");
  };

  return (
    <div className="navbar">
      {user && (
        <button className="navbar-icon" onClick={onToggleSidebar}>
          <FaBars />
        </button>
      )}

      <div className="navbar-title">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          MemeZone
        </Link>
      </div>

      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button className="publish-button" onClick={handlePublish}>Publish</button>
          <button className="publish-button" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/login" className="publish-button">Login</Link>
          <Link to="/register" className="publish-button">Register</Link>
        </div>
      )}
    </div>
  );
}
