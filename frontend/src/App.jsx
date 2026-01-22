import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


import Traffic from "./pages/Traffic";
import Incidents from "./pages/Incidents";
import Violations from "./pages/Violations";


function App() {
  return (
    <>
      <AppNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/traffic"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Traffic />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/incidents"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Incidents />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/violations"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Violations />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


      </Routes>
    </>
  );
}

export default App;
