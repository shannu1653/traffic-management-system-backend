import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getViolations } from "../services/violations";

function Violations() {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getViolations();
      setViolations(data);
    };
    load();
  }, []);

  return (
    <>
      <h3>Traffic Violations</h3>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Fine</th>
          </tr>
        </thead>
        <tbody>
          {violations.map((v) => (
            <tr key={v.id}>
              <td>{v.vehicle_number}</td>
              <td>{v.violation_type}</td>
              <td>₹{v.fine_amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Violations;
