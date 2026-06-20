import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar as BsNavbar, Nav, Container, Button, NavDropdown, Badge } from 'react-bootstrap';
import { FaUser, FaBriefcase, FaSignOutAlt, FaHome, FaSearch, FaPlusCircle, FaMoon, FaSun } from 'react-icons/fa';
// Remove useTheme for now until ThemeProvider is set up

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    // Remove dark mode for now - we'll add it properly later
    // const { darkMode, toggleDarkMode } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <BsNavbar expand="lg" className="shadow-sm sticky-top" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.95)' }}>
            <Container>
                <BsNavbar.Brand as={Link} to="/" className="fw-bold">
                    <span className="text-primary fs-2">🚀</span>
                    <span className="text-primary fs-3 fw-bold">Serve</span>
                    <span className="text-warning fs-3 fw-bold">Hub</span>
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-2">
                        <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-1">
                            <FaHome /> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/services" className="d-flex align-items-center gap-1">
                            <FaSearch /> Services
                        </Nav.Link>
                        
                        {user ? (
                            <>
                                {user.role === 'provider' && (
                                    <>
                                        <Nav.Link as={Link} to="/my-services" className="d-flex align-items-center gap-1">
                                            <FaBriefcase /> My Services
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/create-service" className="d-flex align-items-center gap-1">
                                            <FaPlusCircle className="text-success" /> Post
                                        </Nav.Link>
                                    </>
                                )}
                                <Nav.Link as={Link} to="/my-requests" className="d-flex align-items-center gap-1">
                                    📋 Requests
                                    {user.role === 'provider' && (
                                        <Badge bg="danger" pill>3</Badge>
                                    )}
                                </Nav.Link>
                                
                                <NavDropdown 
                                    title={
                                        <span className="d-flex align-items-center gap-2">
                                            <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                                                  style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                                                {user.name?.charAt(0).toUpperCase()}
                                            </span>
                                            <span className="d-none d-lg-inline">{user.name}</span>
                                        </span>
                                    }
                                    id="basic-nav-dropdown"
                                    align="end"
                                >
                                    <NavDropdown.Item as={Link} to="/dashboard">
                                        <FaUser className="me-2" /> Dashboard
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/profile">
                                        <FaUser className="me-2" /> Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        <FaSignOutAlt className="me-2 text-danger" /> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="d-flex align-items-center gap-1">
                                    Login
                                </Nav.Link>
                                <Button as={Link} to="/register" variant="primary" size="sm" className="rounded-pill px-4">
                                    Get Started
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