import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Navbar as BsNavbar, Nav, Container, Button, NavDropdown, Badge } from 'react-bootstrap';
import { 
    FaUser, 
    FaBriefcase, 
    FaSignOutAlt, 
    FaHome, 
    FaSearch, 
    FaPlusCircle,
    FaMoon,
    FaSun
} from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <BsNavbar 
            expand="lg" 
            className="shadow-sm sticky-top" 
            style={{ 
                backdropFilter: 'blur(10px)', 
                backgroundColor: darkMode ? 'rgba(26, 26, 46, 0.95)' : 'rgba(255,255,255,0.95)',
                transition: 'all 0.3s ease'
            }}
        >
            <Container>
                <BsNavbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
                    <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" 
                          style={{ width: '40px', height: '40px', fontSize: '18px' }}>
                        SH
                    </span>
                    <span className={darkMode ? 'text-light' : 'text-primary'} style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        Serve
                    </span>
                    <span className="text-warning" style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        Hub
                    </span>
                </BsNavbar.Brand>
                
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-2">
                        <Nav.Link 
                            as={Link} 
                            to="/" 
                            className={`d-flex align-items-center gap-1 ${darkMode ? 'text-light' : ''}`}
                        >
                            <FaHome /> Home
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/services" 
                            className={`d-flex align-items-center gap-1 ${darkMode ? 'text-light' : ''}`}
                        >
                            <FaSearch /> Services
                        </Nav.Link>
                        
                        {user ? (
                            <>
                                {user.role === 'provider' && (
                                    <>
                                        <Nav.Link 
                                            as={Link} 
                                            to="/my-services" 
                                            className={`d-flex align-items-center gap-1 ${darkMode ? 'text-light' : ''}`}
                                        >
                                            <FaBriefcase /> My Services
                                        </Nav.Link>
                                        <Nav.Link 
                                            as={Link} 
                                            to="/create-service" 
                                            className="d-flex align-items-center gap-1"
                                        >
                                            <FaPlusCircle className="text-success" /> Post
                                        </Nav.Link>
                                    </>
                                )}
                                <Nav.Link 
                                    as={Link} 
                                    to="/my-requests" 
                                    className={`d-flex align-items-center gap-1 ${darkMode ? 'text-light' : ''}`}
                                >
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
                                            <span className={`d-none d-lg-inline ${darkMode ? 'text-light' : ''}`}>
                                                {user.name}
                                            </span>
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

                                {/* Dark Mode Toggle Button */}
                                <Button 
                                    variant="outline-secondary" 
                                    size="sm" 
                                    onClick={toggleDarkMode}
                                    className="ms-2 rounded-circle"
                                    style={{ width: '36px', height: '36px' }}
                                >
                                    {darkMode ? <FaSun /> : <FaMoon />}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link 
                                    as={Link} 
                                    to="/login" 
                                    className={`d-flex align-items-center gap-1 ${darkMode ? 'text-light' : ''}`}
                                >
                                    Login
                                </Nav.Link>
                                <Button 
                                    as={Link} 
                                    to="/register" 
                                    variant="primary" 
                                    size="sm" 
                                    className="rounded-pill px-4"
                                >
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