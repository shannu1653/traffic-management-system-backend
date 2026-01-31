import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTrafficLight,
  FaExclamationTriangle,
  FaChartBar,
  FaFileAlt,
  FaBars,
  FaAngleLeft,
  FaUserShield,
  FaUserTie,
  FaUser
} from "react-icons/fa";
import { useState, useEffect } from "react";
import "../styles/layout.css";

function Sidebar() {
  const role = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ===============================
     SCREEN SIZE HANDLING
  =============================== */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ===============================
     HELPERS
  =============================== */
  const isActive = (path) => location.pathname.startsWith(path);

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "officer"
      ? "/dashboard/officer"
      : "/dashboard/user";

  const roleIcon =
    role === "admin" ? <FaUserShield /> :
    role === "officer" ? <FaUserTie /> :
    <FaUser />;

  const roleLabel =
    role === "admin"
      ? "Admin Panel"
      : role === "officer"
      ? "Officer Panel"
      : "User Panel";

  /* ===============================
     RENDER
  =============================== */
  return (
    <>
      {/* ===============================
         MOBILE TOP BAR
      =============================== */}
      {isMobile && (
        <div className="mobile-topbar">
          <FaBars onClick={() => setMobileOpen(true)} />
          <span>Smart Traffic</span>
        </div>
      )}

      {/* ===============================
         MOBILE OVERLAY
      =============================== */}
      {isMobile && mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===============================
         SIDEBAR
      =============================== */}
      <aside
        className={`sidebar 
          ${collapsed ? "collapsed" : ""} 
          ${isMobile && mobileOpen ? "open" : ""}`}
      >
        {/* HEADER */}
        <div className="sidebar-header">
          {!collapsed && (
            <div className="flex items-center gap-2">
              {roleIcon}
              <h4>{roleLabel}</h4>
            </div>
          )}

          {!isMobile && (
            <FaAngleLeft
              className={`collapse-btn ${collapsed ? "rotate" : ""}`}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="sidebar-nav">

          <SidebarLink
            to={dashboardPath}
            icon={<FaHome />}
            label="Dashboard"
            active={isActive("/dashboard")}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />

          {(role === "admin" || role === "officer") && (
            <SidebarLink
              to="/traffic"
              icon={<FaTrafficLight />}
              label="Traffic"
              active={isActive("/traffic")}
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />
          )}

          <SidebarLink
            to="/incidents"
            icon={<FaExclamationTriangle />}
            label="Incidents"
            active={isActive("/incidents")}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />

          {(role === "admin" || role === "officer") && (
            <SidebarLink
              to="/violations"
              icon={<FaFileAlt />}
              label="Violations"
              active={isActive("/violations")}
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />
          )}

          {role === "admin" && (
            <SidebarLink
              to="/analytics"
              icon={<FaChartBar />}
              label="Analytics"
              active={isActive("/analytics")}
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />
          )}

        </nav>
      </aside>
    </>
  );
}

/* ===============================
   SIDEBAR LINK COMPONENT
=============================== */
function SidebarLink({ to, icon, label, active, collapsed, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`sidebar-link ${active ? "active" : ""}`}
      title={collapsed ? label : ""}
    >
      <span className="icon">{icon}</span>
      {!collapsed && <span className="label">{label}</span>}
    </Link>
  );
}

export default Sidebar;
