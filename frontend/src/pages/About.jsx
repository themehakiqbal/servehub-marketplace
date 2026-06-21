import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaCode, FaUsers, FaRocket, FaShieldAlt, FaChartLine, FaHeart, FaBriefcase, FaStar, FaCheckCircle, FaTrophy } from 'react-icons/fa';

const About = () => {
    const stats = [
        { number: '45+', label: 'Services', icon: FaBriefcase },
        { number: '50+', label: 'Providers', icon: FaUsers },
        { number: '300+', label: 'Customers', icon: FaStar },
        { number: '200+', label: 'Reviews', icon: FaChartLine },
    ];

    const values = [
        { icon: FaShieldAlt, title: 'Trust & Security', desc: 'All providers are verified and reviewed by real customers.', color: '#4F46E5' },
        { icon: FaRocket, title: 'Innovation', desc: 'Constantly improving platform with cutting-edge technology.', color: '#10B981' },
        { icon: FaUsers, title: 'Community First', desc: 'Building a strong community of customers and providers.', color: '#F59E0B' },
        { icon: FaHeart, title: 'Customer Satisfaction', desc: 'We prioritize your success and satisfaction.', color: '#EC4899' },
    ];

    const features = [
        { icon: '🔐', title: 'Secure Authentication', desc: 'JWT-based login with role-based access for customers, providers, and admins.' },
        { icon: '👤', title: 'Provider Profiles', desc: 'Complete profiles with skills, experience, pricing, and portfolio management.' },
        { icon: '⭐', title: 'Reviews & Ratings', desc: 'Rate providers and see average ratings with transparent feedback.' },
        { icon: '📊', title: 'Role-Based Dashboards', desc: 'Dedicated dashboards for customers, providers, and admins with stats.' },
    ];

    const benefits = [
        { icon: '💰', title: 'Completely Free', desc: 'No fees, no commissions. Connect freely.' },
        { icon: '⚡', title: 'Fast & Easy', desc: 'Get started in minutes, not hours.' },
        { icon: '🔒', title: 'Secure & Trusted', desc: 'JWT authentication and verified providers.' },
        { icon: '🌍', title: 'Global Community', desc: 'Connect with professionals worldwide.' },
    ];

    return (
        <Container className="py-5">
            {/* Hero Section */}
            <Row className="mb-5 text-center">
                <Col lg={8} className="mx-auto">
                    <Badge bg="primary" className="mb-3 fs-6 px-3 py-2">About ServeHub</Badge>
                    <h1 className="display-4 fw-bold mb-3">Connecting Talent with Opportunity</h1>
                    <p className="lead text-muted">
                        ServeHub is a full-stack service marketplace platform built with the MERN stack, 
                        connecting customers with professional service providers worldwide.
                    </p>
                </Col>
            </Row>

            {/* Stats Section */}
            <Row className="mb-5 g-4">
                {stats.map((stat, index) => (
                    <Col md={3} key={index}>
                        <Card className="text-center shadow-sm border-0 h-100">
                            <Card.Body className="py-4">
                                <stat.icon className="text-primary fs-1 mb-2" />
                                <h2 className="fw-bold text-primary">{stat.number}</h2>
                                <p className="text-muted">{stat.label}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Our Mission */}
            <Row className="mb-5 g-4 align-items-center">
                <Col md={6}>
                    <h2 className="fw-bold mb-3">🎯 Our Mission</h2>
                    <p className="text-muted fs-5">
                        To bridge the gap between customers and professional service providers, 
                        making it easy to find, hire, and collaborate with skilled professionals 
                        from around the world.
                    </p>
                    <p className="text-muted">
                        We believe in creating opportunities for talented individuals to showcase 
                        their skills and grow their businesses while helping customers find the 
                        perfect solutions for their needs.
                    </p>
                </Col>
                <Col md={6}>
                    <div className="bg-primary bg-opacity-10 rounded-4 p-4">
                        <h4 className="fw-bold mb-3">💡 What We Believe</h4>
                        <ul className="list-unstyled">
                            <li className="mb-2">✅ Quality work should be accessible to everyone</li>
                            <li className="mb-2">✅ Talent deserves to be recognized and rewarded</li>
                            <li className="mb-2">✅ Trust and transparency build lasting relationships</li>
                            <li className="mb-2">✅ Innovation drives growth and success</li>
                        </ul>
                    </div>
                </Col>
            </Row>

            {/* Our Core Values - CENTERED */}
            <Row className="mb-5">
                <Col className="text-center">
                    <h2 className="fw-bold mb-2">Our Core Values</h2>
                    <p className="text-muted mb-4">The principles that guide everything we do</p>
                </Col>
                <Col xs={12}>
                    <Row className="g-4 justify-content-center">
                        {values.map((value, index) => (
                            <Col md={3} key={index}>
                                <Card className="text-center h-100 shadow-sm border-0">
                                    <Card.Body className="py-4">
                                        <div 
                                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                            style={{ 
                                                width: '70px', 
                                                height: '70px', 
                                                backgroundColor: `${value.color}15`,
                                                color: value.color,
                                                margin: '0 auto'
                                            }}
                                        >
                                            <value.icon className="fs-1" />
                                        </div>
                                        <h5 className="fw-bold">{value.title}</h5>
                                        <p className="text-muted small">{value.desc}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* What We Offer - CENTERED */}
            <Row className="mb-5">
                <Col className="text-center">
                    <h2 className="fw-bold mb-2">What We Offer</h2>
                    <p className="text-muted mb-4">Everything you need to succeed</p>
                </Col>
                <Col xs={12}>
                    <Row className="g-4 justify-content-center">
                        {features.map((feature, index) => (
                            <Col md={3} key={index}>
                                <Card className="h-100 shadow-sm border-0 text-center">
                                    <Card.Body className="p-4">
                                        <div className="display-3 mb-3">{feature.icon}</div>
                                        <h5 className="fw-bold">{feature.title}</h5>
                                        <p className="text-muted small">{feature.desc}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Why Choose ServeHub */}
            <Row className="mb-5">
                <Col className="text-center">
                    <h2 className="fw-bold mb-2">Why Choose ServeHub?</h2>
                    <p className="text-muted mb-4">The smart choice for your business</p>
                </Col>
                <Col xs={12}>
                    <Row className="g-4 justify-content-center">
                        {benefits.map((benefit, index) => (
                            <Col md={3} key={index}>
                                <Card className="text-center h-100 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="display-1 mb-2">{benefit.icon}</div>
                                        <h5 className="fw-bold">{benefit.title}</h5>
                                        <p className="text-muted small">{benefit.desc}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Tech Stack */}
            <Card className="shadow-sm border-0">
                <Card.Body className="p-4 text-center">
                    <h3 className="fw-bold mb-3">🛠️ Built With</h3>
                    <p className="text-muted">Modern technologies for a modern marketplace</p>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <Badge bg="primary" className="fs-6 px-3 py-2">MongoDB</Badge>
                        <Badge bg="success" className="fs-6 px-3 py-2">Express.js</Badge>
                        <Badge bg="info" className="fs-6 px-3 py-2">React</Badge>
                        <Badge bg="dark" className="fs-6 px-3 py-2">Node.js</Badge>
                        <Badge bg="warning" className="fs-6 px-3 py-2 text-dark">Bootstrap</Badge>
                        <Badge bg="danger" className="fs-6 px-3 py-2">Cloudinary</Badge>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default About;