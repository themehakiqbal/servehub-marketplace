import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaUserPlus, FaSearch, FaHandshake, FaCheckCircle, FaRocket, FaStar } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            icon: FaUserPlus,
            title: 'Step 1: Create Account',
            description: 'Sign up as a customer or provider. Fill in your details and choose your role.',
            details: [
                'Sign up with email and password',
                'Choose between Customer or Provider role',
                'Complete your profile information',
                'Start exploring the platform'
            ],
            color: '#4F46E5',
            bgColor: '#EEF2FF'
        },
        {
            icon: FaSearch,
            title: 'Step 2: Find or List Services',
            description: 'Browse available services or list your own expertise to attract clients.',
            details: [
                'Browse services by category',
                'Search for specific services',
                'Filter by price, rating, and delivery time',
                'Providers: Create service listings'
            ],
            color: '#10B981',
            bgColor: '#ECFDF5'
        },
        {
            icon: FaHandshake,
            title: 'Step 3: Submit or Accept Request',
            description: 'Customers submit requests and providers accept them to start collaboration.',
            details: [
                'Submit request with requirements and budget',
                'Providers receive requests and accept',
                'Track request status updates',
                'Direct communication between parties'
            ],
            color: '#F59E0B',
            bgColor: '#FFFBEB'
        },
        {
            icon: FaCheckCircle,
            title: 'Step 4: Complete Project',
            description: 'Work together and deliver the project successfully.',
            details: [
                'Track progress through status updates',
                'Provider marks as completed',
                'Customer reviews the work',
                'Project delivered successfully'
            ],
            color: '#8B5CF6',
            bgColor: '#F5F3FF'
        }
    ];

    return (
        <Container className="py-5">
            {/* Header */}
            <Row className="mb-5 text-center">
                <Col lg={8} className="mx-auto">
                    <Badge bg="warning" className="mb-3 fs-6 px-3 py-2 text-dark">🚀 How It Works</Badge>
                    <h1 className="display-4 fw-bold mb-3">Get Started in 4 Simple Steps</h1>
                    <p className="lead text-muted">
                        ServeHub makes it easy to find and hire professional service providers. 
                        Follow these steps to get started.
                    </p>
                </Col>
            </Row>

            {/* Steps */}
            <Row className="g-4">
                {steps.map((step, index) => (
                    <Col md={3} key={index}>
                        <Card className="h-100 border-0 shadow-sm text-center">
                            <Card.Body className="p-4">
                                <div 
                                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        backgroundColor: step.bgColor,
                                        color: step.color,
                                        margin: '0 auto'
                                    }}
                                >
                                    <step.icon className="fs-1" />
                                </div>
                                <h5 className="fw-bold mb-3">{step.title}</h5>
                                <p className="text-muted">{step.description}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Detailed Steps */}
            <Row className="mt-5">
                <Col lg={10} className="mx-auto">
                    <h3 className="fw-bold text-center mb-4">📋 Detailed Walkthrough</h3>
                    {steps.map((step, index) => (
                        <Card key={index} className="mb-3 shadow-sm border-0">
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-start">
                                    <div 
                                        className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                        style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            backgroundColor: step.bgColor,
                                            color: step.color
                                        }}
                                    >
                                        <step.icon className="fs-3" />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold">{step.title}</h5>
                                        <p className="text-muted">{step.description}</p>
                                        <ul className="text-muted">
                                            {step.details.map((detail, i) => (
                                                <li key={i}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>

            {/* Tips Section */}
            <Row className="mt-5">
                <Col>
                    <Card className="border-0 shadow-sm bg-primary text-white">
                        <Card.Body className="p-4 text-center">
                            <h3 className="fw-bold mb-3">💡 Pro Tips</h3>
                            <Row className="g-3">
                                <Col md={4}>
                                    <div className="bg-white bg-opacity-10 rounded-3 p-3">
                                        <FaRocket className="fs-2 mb-2" />
                                        <h6>Complete Your Profile</h6>
                                        <p className="small opacity-75">A complete profile attracts more clients</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="bg-white bg-opacity-10 rounded-3 p-3">
                                        <FaStar className="fs-2 mb-2" />
                                        <h6>Build Your Reputation</h6>
                                        <p className="small opacity-75">Good reviews lead to more opportunities</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="bg-white bg-opacity-10 rounded-3 p-3">
                                        <FaHandshake className="fs-2 mb-2" />
                                        <h6>Communicate Clearly</h6>
                                        <p className="small opacity-75">Clear communication ensures project success</p>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* CTA */}
            <Row className="mt-5 text-center">
                <Col>
                    <Card className="border-0 shadow-sm bg-light">
                        <Card.Body className="p-4">
                            <h4 className="fw-bold mb-3">Ready to Get Started?</h4>
                            <p className="text-muted">Join thousands of satisfied customers and providers today.</p>
                            <a href="/register" className="btn btn-primary px-4 py-2">
                                Create Free Account
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HowItWorks;