import { Navbar, Container, Nav } from "react-bootstrap";
import { FaTrafficLight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

function AppNavbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaTrafficLight className="me-2" />
          Smart Traffic
        </Navbar.Brand>

        <Nav className="ms-auto">
          {!isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
