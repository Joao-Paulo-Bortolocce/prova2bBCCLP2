import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function Menu(props) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                { }
                <Navbar.Brand href="#" as={Link} to="/">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown.Item ><Link to="/usuario" style={{ textDecoration: 'none', marginRight: '20px' , color: "black"}}>Usuarios</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link to="/mensagem" style={{ textDecoration: 'none', marginRight: '20px', color: "black" }}>Mensagens </Link></NavDropdown.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}