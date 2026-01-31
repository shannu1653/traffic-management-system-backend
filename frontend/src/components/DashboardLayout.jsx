import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-main">
        <Navbar />

        {/* Animated Page Content */}
        <motion.div
          className="dashboard-content"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </div>

    </div>
  );
}

export default DashboardLayout;
