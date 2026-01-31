import { useEffect, useState, useRef } from "react";
import {
  connectTrafficSocket,
  disconnectTrafficSocket,
} from "../../services/trafficSocket";

import StatsCards from "../../components/StatsCards";
import TrafficChart from "../../components/TrafficChart";
import { getTrafficStats } from "../../services/traffic";

function OfficerDashboard() {
  const [stats, setStats] = useState(null);
  const socketConnected = useRef(false);

  useEffect(() => {
    /* ===============================
       INITIAL API LOAD (FALLBACK)
    =============================== */
    getTrafficStats()
      .then((res) => setStats(res.data))
      .catch(() =>
        console.warn("Officer API fallback failed")
      );

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

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <h2>Traffic Officer Dashboard</h2>
        <p className="dashboard-subtitle">
          Live traffic monitoring and control
        </p>
      </div>

      {/* STATS */}
      <StatsCards stats={stats} loading={!stats} />

      {/* CHART */}
      <TrafficChart stats={stats} loading={!stats} />
    </div>
  );
}

export default OfficerDashboard;
