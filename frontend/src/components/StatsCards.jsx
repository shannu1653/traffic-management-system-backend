import {
  FaCar,
  FaTrafficLight,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";

function StatsCards({ stats, loading }) {
  // ✅ Proper loading state
  if (loading) {
    return (
      <div className="officer-stats">
        <div className="officer-card">Loading...</div>
        <div className="officer-card">Loading...</div>
        <div className="officer-card">Loading...</div>
        <div className="officer-card">Loading...</div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Vehicles",
      value: stats?.total_vehicles ?? "--",
      icon: <FaCar />,
    },
    {
      title: "Active Signals",
      value: stats?.active_signals ?? "--",
      icon: <FaTrafficLight />,
    },
    {
      title: "Incidents",
      value: stats?.incidents ?? "--",
      icon: <FaExclamationTriangle />,
    },
    {
      title: "Violations",
      value: stats?.violations ?? "--",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="officer-stats">
      {cards.map((card, i) => (
        <div className="officer-card" key={i}>
          {card.icon}
          <h4>{card.title}</h4>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
