import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import AppNavbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Traffic from "./pages/Traffic";
import Incidents from "./pages/Incidents";
import Violations from "./pages/Violations";

import AdminDashboard from "./pages/dashboard/AdminDashboard";
import OfficerDashboard from "./pages/dashboard/OfficerDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>

        {/* 🌐 Public Routes */}
        <Route
          path="/"
          element={
            <>
              <AppNavbar />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Role Dashboards */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/officer" element={<OfficerDashboard />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />

          {/* Common Pages */}
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/violations" element={<Violations />} />
        </Route>

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </AnimatePresence>
  );
}

export default App;
