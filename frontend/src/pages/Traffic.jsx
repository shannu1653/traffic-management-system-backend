import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getTrafficList } from "../services/traffic";

function Traffic() {
  const [traffic, setTraffic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadTraffic = async () => {
      const data = await getTrafficList();
      setTraffic(data);
      setLoading(false);
    };
    loadTraffic();
  }, []);

  // 🔍 Search filter
  const filteredTraffic = traffic.filter((t) =>
    t.location.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Loading state must be BEFORE return
  if (loading) {
    return <p>Loading traffic data...</p>;
  }

  return (
    <>
      <h3 className="mb-3">Traffic Status</h3>

      {/* Search box */}
      <input
        className="form-control mb-3"
        placeholder="Search by location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table bordered hover>
        <thead>
          <tr>
            <th>Location</th>
            <th>Congestion Level</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {filteredTraffic.length > 0 ? (
            filteredTraffic.map((t) => (
              <tr key={t.id}>
                <td>{t.location}</td>
                <td>{t.congestion_level}</td>
                <td>{new Date(t.updated_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Traffic;
