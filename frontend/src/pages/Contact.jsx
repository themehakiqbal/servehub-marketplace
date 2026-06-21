import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, Spinner } from 'react-bootstrap';
import { 
    FaMapMarkerAlt, 
    FaPhone, 
    FaEnvelope, 
    FaClock, 
    FaPaperPlane, 
    FaCheckCircle 
} from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: '',
        success: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ ...status, error: 'Please fill in all required fields' });
            return;
        }

        setStatus({ submitting: true, submitted: false, error: '', success: false });

        try {
            // Using Web3Forms (free - sign up at web3forms.com)
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'bab93567-ab4d-45ca-b915-df437f737a6b', // Get from web3forms.com
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || 'New Contact Form Submission',
                    message: formData.message,
                    // Optional: Add your email to receive notification
                    to_email: 'mehakiqbal1220@gmail.com'
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ 
                    submitting: false, 
                    submitted: true, 
                    error: '', 
                    success: true 
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => {
                    setStatus({ ...status, submitted: false, success: false });
                }, 5000);
            } else {
                setStatus({ 
                    submitting: false, 
                    submitted: false, 
                    error: result.message || 'Something went wrong. Please try again.',
                    success: false 
                });
            }
        } catch (error) {
            setStatus({ 
                submitting: false, 
                submitted: false, 
                error: 'Network error. Please try again.',
                success: false 
            });
        }
    };

    return (
        <Container className="py-5">
            <Row className="mb-5 text-center">
                <Col lg={8} className="mx-auto">
                    <Badge bg="primary" className="mb-3 fs-6 px-3 py-2">📬 Contact Us</Badge>
                    <h1 className="display-4 fw-bold mb-3">Get In Touch</h1>
                    <p className="lead text-muted">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </Col>
            </Row>

            <Row>
                {/* Contact Info */}
                <Col lg={5} className="mb-4 mb-lg-0">
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body className="p-4">
                            <h4 className="fw-bold mb-4">📞 Contact Information</h4>
                            
                            <div className="d-flex mb-4">
                                <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                                    <FaMapMarkerAlt className="text-primary fs-4" />
                                </div>
                                <div>
                                    <h6 className="fw-bold">Address</h6>
                                    <p className="text-muted mb-0">Karachi, Pakistan</p>
                                </div>
                            </div>

                            <div className="d-flex mb-4">
                                <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                                    <FaPhone className="text-primary fs-4" />
                                </div>
                                <div>
                                    <h6 className="fw-bold">Phone</h6>
                                    <p className="text-muted mb-0">+92 300 1234567</p>
                                </div>
                            </div>

                            <div className="d-flex mb-4">
                                <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                                    <FaEnvelope className="text-primary fs-4" />
                                </div>
                                <div>
                                    <h6 className="fw-bold">Email</h6>
                                    <p className="text-muted mb-0">mehakiqbal1220@gmail.com</p>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                                    <FaClock className="text-primary fs-4" />
                                </div>
                                <div>
                                    <h6 className="fw-bold">Working Hours</h6>
                                    <p className="text-muted mb-0">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                    <p className="text-muted mb-0">Weekend: Closed</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Contact Form */}
                <Col lg={7}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4">
                            <h4 className="fw-bold mb-4">📩 Send Us a Message</h4>
                            
                            {status.error && <Alert variant="danger">{status.error}</Alert>}
                            {status.success && (
                                <Alert variant="success">
                                    <FaCheckCircle className="me-2" />
                                    ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Name *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={status.submitting}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address *</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={status.submitting}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        placeholder="Enter subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={status.submitting}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Message *</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        name="message"
                                        placeholder="Write your message here..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        disabled={status.submitting}
                                    />
                                </Form.Group>

                                <Button 
                                    type="submit" 
                                    variant="primary" 
                                    className="w-100 py-2 fw-bold"
                                    disabled={status.submitting}
                                >
                                    {status.submitting ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="me-2" /> Send Message
                                        </>
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;