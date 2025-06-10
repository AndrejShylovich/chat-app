import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Notification from "../Chat/Notification";

function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/">NavigationBar</Link>
        </h2>
        {user && (
          <span className="text-warning">Logged in as {user?.username}</span>
        )}
        <Nav>
          {!user ? (
            <Stack>
              <Link to="/login" className="link-light text-decoration-none">
                Login
              </Link>
              <Link to="/register" className="link-light text-decoration-none">
                Register
              </Link>
            </Stack>
          ) : (
            <Stack direction="horizontal">
              <Notification />
              <Link
                onClick={logoutUser}
                to="/login"
                className="link-light text-decoration-none"
              >
                Logout
              </Link>
            </Stack>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
//others.
export default NavBar;
