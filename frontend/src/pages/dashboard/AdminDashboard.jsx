import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/analytics";
import StatsCards from "../../components/StatsCards";
import TrafficChart from "../../components/TrafficChart";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };
    loadData();
  }, []);

  if (!stats) return <p>Loading analytics...</p>;

  return (
    <>
      <h3 className="mb-4">Admin Analytics Dashboard</h3>
      <StatsCards stats={stats} />
      <TrafficChart stats={stats} />
    </>
  );
}

export default AdminDashboard;
