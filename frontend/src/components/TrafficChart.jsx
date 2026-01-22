import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function TrafficChart({ stats }) {
  const data = {
    labels: ["Traffic Records", "High Congestion", "Incidents", "Violations"],
    datasets: [
      {
        label: "City Traffic Analytics",
        data: [
          stats.traffic.total_records,
          stats.traffic.high_congestion,
          stats.incidents.total,
          stats.violations.total
        ],
        backgroundColor: "#2563eb"
      }
    ]
  };

  return <Bar data={data} />;
}

export default TrafficChart;
