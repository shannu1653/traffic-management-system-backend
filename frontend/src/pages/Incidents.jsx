import { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { getIncidents, reportIncident } from "../services/incidents";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    const data = await getIncidents();
    setIncidents(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reportIncident({
      location,
      incident_type: type,
    });
    setLocation("");
    setType("");
    loadIncidents();
  };

  // 🔍 Status filter
  const filteredIncidents = incidents.filter((i) => {
    if (statusFilter === "pending") return !i.is_resolved;
    if (statusFilter === "resolved") return i.is_resolved;
    return true;
  });

  // ✅ Loading state
  if (loading) {
    return <p>Loading incidents...</p>;
  }

  return (
    <>
      <h3 className="mb-3">Report Incident</h3>

      {/* Status Filter */}
      <select
        className="form-select mb-3"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="resolved">Resolved</option>
      </select>

      {/* Report Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Control
          placeholder="Location"
          className="mb-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Form.Control
          placeholder="Incident Type"
          className="mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <Button type="submit">Report</Button>
      </Form>

      <h4>Incident List</h4>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Location</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((i) => (
              <tr key={i.id}>
                <td>{i.location}</td>
                <td>{i.incident_type}</td>
                <td>{i.is_resolved ? "Resolved" : "Pending"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No incidents found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Incidents;
