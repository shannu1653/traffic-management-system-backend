import { Card, Row, Col } from "react-bootstrap";

function StatsCards({ stats }) {
  return (
    <Row className="mb-4">
      <Col md={3}>
        <Card className="shadow-sm">
          <Card.Body>
            <h6>Total Traffic</h6>
            <h3>{stats.traffic.total_records}</h3>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className="shadow-sm">
          <Card.Body>
            <h6>High Congestion</h6>
            <h3>{stats.traffic.high_congestion}</h3>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className="shadow-sm">
          <Card.Body>
            <h6>Incidents</h6>
            <h3>{stats.incidents.total}</h3>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className="shadow-sm">
          <Card.Body>
            <h6>Violations</h6>
            <h3>{stats.violations.total}</h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default StatsCards;
