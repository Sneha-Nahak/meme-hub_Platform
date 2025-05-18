// File: src/components/Sidebar.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useContext(AuthContext);

  if (!user) return null; // Do not render sidebar if not logged in

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>MemeZone</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" onClick={onClose} className={({ isActive }) => isActive ? "active-link" : ""}>
          🏠 Feed
        </NavLink>
        <NavLink to="/trending" onClick={onClose} className={({ isActive }) => isActive ? "active-link" : ""}>
          🔥 Trending
        </NavLink>
        <NavLink to="/most-liked" onClick={onClose} className={({ isActive }) => isActive ? "active-link" : ""}>
          ❤️ Most Liked
        </NavLink>
        <NavLink to="/about" onClick={onClose} className={({ isActive }) => isActive ? "active-link" : ""}>
          ℹ️ About Us
        </NavLink>
        <NavLink to="/contact" onClick={onClose} className={({ isActive }) => isActive ? "active-link" : ""}>
          📞 Contact
        </NavLink>
        <NavLink to="/faq" onClick={onClose} className={({ isActive }) => isActive ? "active-link" : ""}>
          ❓ FAQ
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="close-btn" onClick={onClose}>❌</button>
      </div>
    </div>
  );
}
