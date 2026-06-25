import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { 
    FaWhatsapp, 
    FaLinkedin, 
    FaGithub, 
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaArrowRight,
    FaCheckCircle
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({
        submitting: false,
        success: false,
        error: ''
    });

    const handleSubscribe = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setStatus({ ...status, error: 'Please enter your email' });
            return;
        }

        setStatus({ submitting: true, success: false, error: '' });

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'bab93567-ab4d-45ca-b915-df437f737a6b',
                    email: email,
                    subject: 'New Newsletter Subscription',
                    message: `📧 New subscriber!\n\nEmail: ${email}\n\nThey subscribed to your newsletter on ServeHub.`,
                    from_name: 'ServeHub Website'
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ submitting: false, success: true, error: '' });
                setEmail('');
                setTimeout(() => setStatus({ ...status, success: false }), 5000);
            } else {
                setStatus({ 
                    submitting: false, 
                    success: false, 
                    error: 'Failed to subscribe. Please try again.' 
                });
            }
        } catch (error) {
            setStatus({ 
                submitting: false, 
                success: false, 
                error: 'Network error. Please try again.' 
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                        {status.success && (
                            <Alert variant="success" className="py-2">
                                <FaCheckCircle className="me-2" /> Thank you for subscribing!
                            </Alert>
                        )}
                        {status.error && (
                            <Alert variant="danger" className="py-2">{status.error}</Alert>
                        )}
                        <Form onSubmit={handleSubscribe}>
                            <InputGroup>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="py-2"
                                    style={{ borderRadius: '50px 0 0 50px' }}
                                    disabled={status.submitting}
                                />
                                <Button 
                                    type="submit"
                                    variant="warning" 
                                    className="px-4"
                                    style={{ borderRadius: '0 50px 50px 0' }}
                                    disabled={status.submitting}
                                >
                                    {status.submitting ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        <>Subscribe <FaArrowRight className="ms-2" /></>
                                    )}
                                </Button>
                            </InputGroup>
                        </Form>
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
                            <a 
                                href="https://www.linkedin.com/in/mehak-iqbal-9b5692383/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-white-50 hover-text-primary"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={22} />
                            </a>
                            <a 
                                href="https://github.com/themehakiqbal/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-white-50 hover-text-primary"
                                aria-label="GitHub"
                            >
                                <FaGithub size={22} />
                            </a>
                            <a 
                                href="https://wa.me/923044516234" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-white-50 hover-text-primary"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp size={22} />
                            </a>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col md={2} className="mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-white-50 text-decoration-none hover-text-warning" onClick={scrollToTop}>
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/services" className="text-white-50 text-decoration-none hover-text-warning" onClick={scrollToTop}>
                                    Services
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="text-white-50 text-decoration-none hover-text-warning" onClick={scrollToTop}>
                                    About Us
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="text-white-50 text-decoration-none hover-text-warning" onClick={scrollToTop}>
                                    Contact
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/faq" className="text-white-50 text-decoration-none hover-text-warning" onClick={scrollToTop}>
                                    FAQ
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/how-it-works" className="text-white-50 text-decoration-none hover-text-warning" onClick={scrollToTop}>
                                    How It Works
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* For Users */}
                    <Col md={2} className="mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3">For Users</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/register" className="text-white-50 text-decoration-none hover-text-warning" onClick={scrollToTop}>
                                    Become a Provider
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/services" className="text-white-50 text-decoration-none hover-text-warning" onClick={scrollToTop}>
                                    Find Services
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact Info - ALL CLICKABLE */}
                    <Col md={4} className="mb-4 mb-md-0">
                        <h5 className="fw-bold mb-3">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li className="mb-3 d-flex align-items-start">
                                <FaMapMarkerAlt className="text-warning me-2 mt-1" />
                                <a 
                                    href="https://maps.google.com/?q=Lahore,Pakistan" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white-50 text-decoration-none hover-text-warning"
                                >
                                    Lahore, Pakistan
                                </a>
                            </li>
                            <li className="mb-3 d-flex align-items-start">
                                <FaPhone className="text-warning me-2 mt-1" />
                                <a 
                                    href="tel:+923044516234" 
                                    className="text-white-50 text-decoration-none hover-text-warning"
                                >
                                    +92 304 4516234
                                </a>
                            </li>
                            <li className="mb-3 d-flex align-items-start">
                                <FaEnvelope className="text-warning me-2 mt-1" />
                                <a 
                                    href="mailto:mehakiqbal1220@gmail.com" 
                                    className="text-white-50 text-decoration-none hover-text-warning"
                                >
                                    mehakiqbal1220@gmail.com
                                </a>
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

            <style>{`
                .hover-text-warning:hover {
                    color: #FFC107 !important;
                    transition: 0.3s;
                }
                .hover-text-primary:hover {
                    color: #4F46E5 !important;
                    transition: 0.3s;
                }
                .btn-warning:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
                }
                .text-white-50:hover {
                    transition: 0.3s;
                }
            `}</style>
        </footer>
    );
};

export default Footer;