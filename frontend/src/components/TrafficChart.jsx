import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TrafficChart({ stats }) {
  // ✅ Guard: stats not ready yet
  if (!stats || !stats.traffic_flow) {
    return (
      <div className="dashboard-section">
        <h3>Traffic Flow</h3>
        <p className="text-muted">Loading traffic data...</p>
      </div>
    );
  }

  const data = stats.traffic_flow;

  return (
    <div className="dashboard-section">
      <h3>Traffic Flow</h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#4f46e5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrafficChart;
