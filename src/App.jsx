// File: src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { MemeProvider } from "./context/MemeContext";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TrendingPage from "./pages/TrendingPage";
import MostLikedPage from "./pages/MostLikedPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";

import "./App.css";
import "./index.css";
import Footer from "./components/Footer";

function AppWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-close sidebar on route change
  const location = useLocation();
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
      
          <Route
            path="/trending"
            element={
              <PrivateRoute>
                <TrendingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/most-liked"
            element={
              <PrivateRoute>
                <MostLikedPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <AboutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <ContactPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <PrivateRoute>
                <FaqPage />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer/>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MemeProvider>
        <Router>
          <AppWrapper />
        </Router>
      </MemeProvider>
    </AuthProvider>
  );
}
