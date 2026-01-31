import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../services/profile";
import DashboardLayout from "../components/DashboardLayout";

import AdminDashboard from "./dashboard/AdminDashboard";
import OfficerDashboard from "./dashboard/OfficerDashboard";
import UserDashboard from "./dashboard/UserDashboard";

function Dashboard() {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        if (!data?.role) {
          navigate("/login", { replace: true });
          return;
        }

        if (isMounted) {
          setRole(data.role);
          localStorage.setItem("role", data.role);
        }
      } catch (error) {
        console.error("Profile fetch failed", error);
        navigate("/login", { replace: true });
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3>Loading dashboard...</h3>
        <p>Please wait</p>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "officer":
        return <OfficerDashboard />;
      case "user":
      default:
        return <UserDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}

export default Dashboard;
