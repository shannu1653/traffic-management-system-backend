import { useEffect, useState } from "react";
import {
  getViolations,
  createViolation,
} from "../services/violations";

function Violations() {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [type, setType] = useState("");
  const [fine, setFine] = useState("");

  const role = localStorage.getItem("role");

  /* Load violations */
  const loadViolations = async () => {
    try {
      const data = await getViolations();
      setViolations(data);
    } catch (err) {
      console.error("Failed to load violations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadViolations();
  const interval = setInterval(loadViolations, 10000);
  return () => clearInterval(interval);
}, []);


  /* Create violation */
  const handleCreate = async (e) => {
    e.preventDefault();

    await createViolation({
      vehicle_number: vehicleNumber,
      violation_type: type,
      fine_amount: fine,
    });

    setVehicleNumber("");
    setType("");
    setFine("");
    loadViolations();
  };

  return (
    <div className="dashboard-section">
      <h2>Violations</h2>
      <p className="dashboard-subtitle">
        Traffic violations and fines
      </p>

      {/* CREATE (Admin / Officer only) */}
      {(role === "admin" || role === "officer") && (
        <form onSubmit={handleCreate} className="violation-form">
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Violation Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Fine Amount"
            value={fine}
            onChange={(e) => setFine(e.target.value)}
            required
          />

          <button type="submit">Add Violation</button>
        </form>
      )}

      {/* LIST */}
      {loading ? (
        <p>Loading violations...</p>
      ) : violations.length === 0 ? (
        <p>No violations found</p>
      ) : (
        <div className="violation-list">
          {violations.map((v) => (
            <div className="violation-card" key={v.id}>
              <h4>{v.vehicle_number}</h4>
              <p>{v.violation_type}</p>
              <span className="fine">₹{v.fine_amount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Violations;
