import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTrafficLight,
  FaExclamationTriangle,
  FaChartBar,
  FaFileAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useState, useEffect } from "react";

function Sidebar() {
  const role = localStorage.getItem("role");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "10px",
    marginBottom: "6px",
    textDecoration: "none",
    color: location.pathname === path ? "#fff" : "#c7d2fe",
    background: location.pathname === path ? "#2563eb" : "transparent"
  });

  return (
    <>
      {/* Mobile Top Bar */}
      {isMobile && (
        <div
          style={{
            height: "55px",
            background: "#020617",
            color: "white",
            display: "flex",
            alignItems: "center",
            padding: "0 16px"
          }}
        >
          <FaBars
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
          />
          <span style={{ marginLeft: "12px", fontWeight: "600" }}>
            Smart Traffic
          </span>
        </div>
      )}

      {/* Overlay (Mobile) */}
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: isMobile ? "fixed" : "relative",
          left: isMobile ? (open ? "0" : "-260px") : "0",
          top: isMobile ? "0" : "auto",
          width: "240px",
          minHeight: "100vh",
          background: "linear-gradient(180deg, #020617, #0f172a)",
          color: "white",
          padding: "16px",
          transition: "left 0.3s ease",
          zIndex: 10
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px"
          }}
        >
          <h5 style={{ margin: 0 }}>Dashboard</h5>
          {isMobile && (
            <FaTimes
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            />
          )}
        </div>

        <Link to="/dashboard" style={linkStyle("/dashboard")} onClick={() => setOpen(false)}>
          <FaHome /> Dashboard
        </Link>

        {(role === "admin" || role === "officer") && (
          <Link to="/traffic" style={linkStyle("/traffic")} onClick={() => setOpen(false)}>
            <FaTrafficLight /> Traffic
          </Link>
        )}

        <Link to="/incidents" style={linkStyle("/incidents")} onClick={() => setOpen(false)}>
          <FaExclamationTriangle /> Incidents
        </Link>

        {(role === "admin" || role === "officer") && (
          <Link to="/violations" style={linkStyle("/violations")} onClick={() => setOpen(false)}>
            <FaFileAlt /> Violations
          </Link>
        )}

        {role === "admin" && (
          <Link to="/dashboard" style={linkStyle("/dashboard")} onClick={() => setOpen(false)}>
            <FaChartBar /> Analytics
          </Link>
        )}
      </div>
    </>
  );
}

export default Sidebar;
