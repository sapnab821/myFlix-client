
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ movies, user, onLoggedOut }) => {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Movies App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link className='nav-text font-style' href="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link className='nav-text font-style' href="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link className='nav-text font-style' href="/profile">User Profile</Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

