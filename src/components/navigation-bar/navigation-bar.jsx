
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export const NavigationBar = ({ movies, user, onLoggedOut }) => {

    //const searchBar = movies.filter(m => m.includes(m.Title));
    
    const searchBar = () => {
        return movies.filter(m => movies.includes(m.Title))

    }

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
                  <Nav.Link className = 'nav-text font-style' href='/profile'>User Profile</Nav.Link>
                  <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

/*

<Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                     aria-label="Search"
                    />
                    <Nav.Button>
                        Search
                    </Nav.Button>

                  </Form> 


export const NavigationBar = ([user, onLoggedOut]) => {
    return(
        <Navbar bg = "light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/"> Movies App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            <>
                            <Nav.Link  href='/login'>Login</Nav.Link>
                            <Nav.Link  href="/register">Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

*/
