import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar as BsNavbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <BsNavbar bg="light" expand="lg" className="shadow-sm">
            <Container>
                <BsNavbar.Brand as={Link} to="/" className="fw-bold text-primary fs-3">
                    ServeHub
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/services">Browse Services</Nav.Link>
                        {user ? (
                            <>
                                {user.role === 'provider' && (
                                    <>
                                        <Nav.Link as={Link} to="/my-services">My Services</Nav.Link>
                                        <Nav.Link as={Link} to="/create-service">Post Service</Nav.Link>
                                    </>
                                )}
                                <Nav.Link as={Link} to="/my-requests">My Requests</Nav.Link>
                                <NavDropdown title={user.name} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Button as={Link} to="/register" variant="primary" size="sm" className="ms-2">
                                    Register
                                </Button>
                            </>
                        )}
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;