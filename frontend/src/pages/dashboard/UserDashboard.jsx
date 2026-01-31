import { useEffect, useState } from "react";
import { connectTrafficSocket, disconnectTrafficSocket } from "../../services/trafficSocket";

import StatsCards from "../../components/StatsCards";
import TrafficChart from "../../components/TrafficChart";
import { getTrafficStats } from "../../services/traffic";

function UserDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let socketConnected = false;

    // ✅ API fallback (ONLY if WS doesn't respond)
    getTrafficStats()
      .then((data) => {
        if (!socketConnected) {
          setStats(data);
        }
      })
      .catch(() => console.warn("API fallback failed"));

    // ✅ WebSocket (MAIN SOURCE)
    connectTrafficSocket((liveData) => {
      socketConnected = true;
      setStats(liveData); // 🔥 DO NOT merge with old API data
    });

    // ✅ Cleanup on unmount
    return () => {
      disconnectTrafficSocket();
    };
  }, []);

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <h2>User Dashboard</h2>
        <p className="dashboard-subtitle">
          Live traffic overview for your area
        </p>
      </div>

      <StatsCards stats={stats} loading={!stats} />
      <TrafficChart stats={stats} loading={!stats} />
    </div>
  );
}

export default UserDashboard;
