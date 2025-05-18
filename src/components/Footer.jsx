// File: src/components/Footer.jsx
import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} MemeVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
