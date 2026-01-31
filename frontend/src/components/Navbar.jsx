import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTrafficLight,
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { useState } from "react";
import { logout } from "../utils/auth";
import "../styles/layout.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("access");
  const role = localStorage.getItem("role");

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* ===============================
     HELPERS
  =============================== */
  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "officer"
      ? "/dashboard/officer"
      : "/dashboard/user";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const isDashboard = location.pathname.startsWith("/dashboard");

  /* ===============================
     RENDER
  =============================== */
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={isDashboard ? "dashboard-navbar" : "navbar"}
    >
      {/* BRAND */}
      <Link to="/" className="nav-brand">
        <FaTrafficLight />
        <span>Smart Traffic</span>
      </Link>

      {/* ACTIONS */}
      <div className="nav-actions">

        {/* THEME TOGGLE */}
        {isLoggedIn && (
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        )}

        {/* AUTH ACTIONS */}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-btn outline">
              Login
            </Link>
            <Link to="/register" className="nav-btn primary">
              Register
            </Link>
          </>
        ) : (
          <div className="relative">
            <FaUserCircle
              className="navbar-profile"
              onClick={() => setMenuOpen(!menuOpen)}
            />

            {/* DROPDOWN */}
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="profile-dropdown"
              >
                <Link
                  to={dashboardPath}
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
