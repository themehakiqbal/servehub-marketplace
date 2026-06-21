import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { 
    FaFacebook, 
    FaTwitter, 
    FaInstagram, 
    FaLinkedin, 
    FaGithub, 
    FaYoutube,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white pt-5 pb-3 mt-5">
            <Container>
                {/* Newsletter Section */}
                <Row className="mb-5 pb-3 border-bottom border-secondary">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <h4 className="fw-bold mb-2">📧 Subscribe to Our Newsletter</h4>
                        <p className="text-white-50">Get the latest updates on new services and offers.</p>
                    </Col>
                    <Col lg={6}>
                        <InputGroup>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                className="py-2"
                                style={{ borderRadius: '50px 0 0 50px' }}
                            />
                            <Button 
                                variant="warning" 
                                className="px-4"
                                style={{ borderRadius: '0 50px 50px 0' }}
                            >
                                Subscribe <FaArrowRight className="ms-2" />
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    {/* Brand & Description */}
                    <Col md={4} className="mb-4 mb-md-0">
                        <h3 className="fw-bold">
                            <span className="text-primary">Serve</span>
                            <span className="text-warning">Hub</span>
                        </h3>
                        <p className="text-white-50 mt-3" style={{ fontSize: '0.95rem' }}>
                            A complete service marketplace platform connecting customers 
                            with professional service providers worldwide.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="#" className="text-white-50 hover-text-primary" style={{ transition: '0.3s' }}>
                                <FaFacebook size={22} />
                            </a>
                            <a href="#" className="text-white-50 hover-text-primary" style={{ transition: '0.3s' }}>
                                <FaTwitter size={22} />
                            </a>
                            <a href="#" className="text-white-50 hover-text-primary" style={{ transition: '0.3s' }}>
                                <FaInstagram size={22} />
                            </a>
                            <a href="#" className="text-white-50 hover-text-primary" style={{ transition: '0.3s' }}>
                                <FaLinkedin size={22} />
                            </a>
                            <a href="#" className="text-white-50 hover-text-primary" style={{ transition: '0.3s' }}>
                                <FaGithub size={22} />
                            </a>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col md={2} className="mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-white-50 text-decoration-none hover-text-warning" style={{ transition: '0.3s' }}>
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/services" className="text-white-50 text-decoration-none hover-text-warning" style={{ transition: '0.3s' }}>
                                    Services
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="text-white-50 text-decoration-none hover-text-warning" style={{ transition: '0.3s' }}>
                                    About Us
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="text-white-50 text-decoration-none hover-text-warning" style={{ transition: '0.3s' }}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* For Users */}
                    <Col md={2} className="mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3">For Users</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/register" className="text-white-50 text-decoration-none hover-text-warning" style={{ transition: '0.3s' }}>
                                    Become a Provider
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/services" className="text-white-50 text-decoration-none hover-text-warning" style={{ transition: '0.3s' }}>
                                    Find Services
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/how-it-works" className="text-white-50 text-decoration-none hover-text-warning" style={{ transition: '0.3s' }}>
                                    How It Works
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/faq" className="text-white-50 text-decoration-none hover-text-warning" style={{ transition: '0.3s' }}>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact Info */}
                    <Col md={4} className="mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li className="mb-3 d-flex align-items-start">
                                <FaMapMarkerAlt className="text-warning me-2 mt-1" />
                                <span className="text-white-50">Karachi, Pakistan</span>
                            </li>
                            <li className="mb-3 d-flex align-items-start">
                                <FaPhone className="text-warning me-2 mt-1" />
                                <span className="text-white-50">+92 300 1234567</span>
                            </li>
                            <li className="mb-3 d-flex align-items-start">
                                <FaEnvelope className="text-warning me-2 mt-1" />
                                <span className="text-white-50">mehakiqbal1220@gmail.com</span>
                            </li>
                        </ul>
                    </Col>
                </Row>

                {/* Copyright */}
                <Row className="mt-4 pt-3 border-top border-secondary">
                    <Col md={6} className="text-center text-md-start">
                        <p className="text-white-50 mb-0">
                            © {currentYear} <span className="text-warning">ServeHub</span>. All rights reserved.
                        </p>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <p className="text-white-50 mb-0">
                            Built with ❤️ by <span className="text-warning">Mehak Iqbal</span>
                        </p>
                    </Col>
                </Row>
            </Container>

            {/* Custom CSS for hover effects */}
            <style jsx>{`
                .hover-text-primary:hover {
                    color: #4F46E5 !important;
                }
                .hover-text-warning:hover {
                    color: #FFC107 !important;
                }
            `}</style>
        </footer>
    );
};

export default Footer;