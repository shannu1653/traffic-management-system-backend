import { useEffect, useState, useRef } from "react";
import { getDashboardStats } from "../../services/analytics";
import {
  connectTrafficSocket,
  disconnectTrafficSocket,
} from "../../services/trafficSocket";

import StatsCards from "../../components/StatsCards";
import TrafficChart from "../../components/TrafficChart";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const socketConnected = useRef(false);

  useEffect(() => {
    /* ===============================
       INITIAL API LOAD
    =============================== */
    const loadData = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin analytics", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    /* ===============================
       WEBSOCKET LIVE UPDATES
    =============================== */
    if (!socketConnected.current) {
      connectTrafficSocket((data) => {
        setStats(data);
      });
      socketConnected.current = true;
    }

    /* ===============================
       CLEANUP
    =============================== */
    return () => {
      socketConnected.current = false;
      disconnectTrafficSocket();
    };
  }, []);

  /* ===============================
     UI STATES
  =============================== */
  if (loading) {
    return (
      <div className="dashboard-section">
        <h2>Admin Dashboard</h2>
        <p className="text-muted">Loading analytics…</p>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="dashboard-section">
        <h2>Admin Dashboard</h2>
        <p style={{ color: "red" }}>
          Failed to load dashboard data
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-section">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Admin Analytics Dashboard</h2>
        <p className="dashboard-subtitle">
          Live system-wide traffic insights
        </p>
      </div>

      {/* STATS */}
      <StatsCards stats={stats} loading={!stats} />

      {/* CHART */}
      <div style={{ marginTop: "24px" }}>
        <TrafficChart stats={stats} loading={!stats} />
      </div>
    </div>
  );
}

export default AdminDashboard;
