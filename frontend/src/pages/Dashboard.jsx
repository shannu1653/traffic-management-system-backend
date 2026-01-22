import { useEffect, useState } from "react";
import { getProfile } from "../services/profile";

import AdminDashboard from "./dashboard/AdminDashboard";
import OfficerDashboard from "./dashboard/OfficerDashboard";
import UserDashboard from "./dashboard/UserDashboard";

function Dashboard() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setRole(data.role);
        localStorage.setItem("role", data.role); // optional cache
      } catch (error) {
        console.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (role === "admin") return <AdminDashboard />;
  if (role === "officer") return <OfficerDashboard />;
  return <UserDashboard />;
}

export default Dashboard;
