import { useEffect, useState } from "react";
import {
  getIncidents,
  createIncident,
  updateIncident,
} from "../services/incidents";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const role = localStorage.getItem("role");

  /* Load incidents */
  const loadIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch (err) {
      console.error("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadIncidents();
  const interval = setInterval(loadIncidents, 10000);
  return () => clearInterval(interval);
}, []);


  /* Create incident */
  const handleCreate = async (e) => {
    e.preventDefault();

    await createIncident({
      title,
      description,
    });

    setTitle("");
    setDescription("");
    loadIncidents();
  };

  /* Update incident status */
  const handleStatusUpdate = async (id, status) => {
    await updateIncident(id, { status });
    loadIncidents();
  };

  return (
    <div className="dashboard-section">
      <h2>Incidents</h2>
      <p className="dashboard-subtitle">
        Reported traffic incidents
      </p>

      {/* CREATE INCIDENT (Admin / Officer / User) */}
      <form onSubmit={handleCreate} className="incident-form">
        <input
          type="text"
          placeholder="Incident title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Report Incident</button>
      </form>

      {/* LIST */}
      {loading ? (
        <p>Loading incidents...</p>
      ) : incidents.length === 0 ? (
        <p>No incidents found</p>
      ) : (
        <div className="incident-list">
          {incidents.map((incident) => (
            <div className="incident-card" key={incident.id}>
              <h4>{incident.title}</h4>
              <p>{incident.description}</p>

              <span className={`status ${incident.status}`}>
                {incident.status}
              </span>

              {/* STATUS UPDATE (Admin / Officer only) */}
              {(role === "admin" || role === "officer") && (
                <div className="incident-actions">
                  <button
                    onClick={() =>
                      handleStatusUpdate(incident.id, "resolved")
                    }
                  >
                    Mark Resolved
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(incident.id, "in_progress")
                    }
                  >
                    In Progress
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Incidents;
