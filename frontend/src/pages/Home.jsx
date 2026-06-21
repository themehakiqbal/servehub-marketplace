import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { FaSearch, FaStar, FaUsers, FaBriefcase, FaShieldAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { getAllServices } from '../services/api';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [featuredServices, setFeaturedServices] = useState([]);
    const [stats, setStats] = useState({ services: 0, providers: 0, customers: 0 });

    useEffect(() => {
        fetchFeaturedServices();
        animateStats();
    }, []);

    const fetchFeaturedServices = async () => {
        try {
            const response = await getAllServices();
            const services = response.data.data || [];
            const shuffled = services.sort(() => 0.5 - Math.random());
            setFeaturedServices(shuffled.slice(0, 6));
            setStats(prev => ({ ...prev, services: services.length }));
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const animateStats = () => {
        const targetProviders = 50;
        const targetCustomers = 300;
        let providers = 0, customers = 0;
        const interval = setInterval(() => {
            if (providers < targetProviders) providers += Math.ceil(targetProviders / 30);
            if (customers < targetCustomers) customers += Math.ceil(targetCustomers / 30);
            setStats(prev => ({ 
                ...prev, 
                providers: Math.min(providers, targetProviders),
                customers: Math.min(customers, targetCustomers)
            }));
            if (providers >= targetProviders && customers >= targetCustomers) {
                clearInterval(interval);
            }
        }, 50);
    };

    const categories = [
        { name: 'Web Development', icon: '💻', count: '150+' },
        { name: 'Graphic Design', icon: '🎨', count: '120+' },
        { name: 'Content Writing', icon: '✍️', count: '100+' },
        { name: 'Digital Marketing', icon: '📱', count: '80+' },
        { name: 'Video Editing', icon: '🎬', count: '60+' },
        { name: 'App Development', icon: '📲', count: '70+' },
        { name: 'SEO Services', icon: '🔍', count: '50+' },
        { name: 'Social Media', icon: '📢', count: '130+' },
    ];

    const testimonials = [
        { name: 'Sarah Ahmed', role: 'Startup Founder', text: 'ServeHub helped me find the perfect developer for my startup. The quality of work was exceptional!', rating: 5 },
        { name: 'Muhammad Ali', role: 'Digital Agency Owner', text: 'I have hired multiple designers through ServeHub. Always professional and deliver on time.', rating: 5 },
        { name: 'Ayesha Khan', role: 'Content Creator', text: 'The best platform for finding content writers. The process is smooth and the quality is outstanding.', rating: 4 },
        {
        name: 'Usman Farooq',
        role: 'E-commerce Manager',
        text: 'Found an amazing SEO expert on ServeHub. My website traffic increased by 200% in just 2 months!',
        rating: 5,
        avatar: 'UF'
    },
    {
        name: 'Fatima Noor',
        role: 'Marketing Head',
        text: 'ServeHub has transformed how we hire freelancers. The quality of work is consistently excellent.',
        rating: 5,
        avatar: 'FN'
    },
    {
        name: 'Hassan Raza',
        role: 'Software Engineer',
        text: 'As a developer, I love how easy it is to find clients on ServeHub. The platform is intuitive and professional.',
        rating: 4,
        avatar: 'HR'
    }
    ];

    return (
        <>
            {/* Hero Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)',
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Container style={{ position: 'relative', zIndex: 1 }}>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-5 mb-lg-0">
                            <Badge bg="warning" className="mb-3 px-3 py-2">🔥 Trusted by 300+ Customers</Badge>
                            <h1 className="display-1 fw-bold text-white mb-4">
                                Find the Perfect <br />
                                <span className="text-warning">Service Provider</span>
                            </h1>
                            <p className="lead text-white-50 mb-4">
                                Connect with top-rated professionals for web development, design, 
                                marketing, and more. Join thousands of satisfied customers today!
                            </p>
                            <Form onSubmit={(e) => { e.preventDefault(); if(searchTerm.trim()) window.location.href = `/services?search=${searchTerm}`; }}>
                                <InputGroup size="lg" className="mb-4 shadow">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search for services..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border-0 py-3"
                                        style={{ borderRadius: '50px 0 0 50px' }}
                                    />
                                    <Button type="submit" variant="warning" className="px-4 py-3" style={{ borderRadius: '0 50px 50px 0' }}>
                                        <FaSearch /> Search
                                    </Button>
                                </InputGroup>
                            </Form>
                            <div className="d-flex gap-3 flex-wrap">
                                <Link to="/services"><Button variant="light" size="lg" className="rounded-pill px-4 fw-bold">Browse Services <FaArrowRight className="ms-2" /></Button></Link>
                                <Link to="/register"><Button variant="outline-light" size="lg" className="rounded-pill px-4 fw-bold">Get Started Free</Button></Link>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="bg-white bg-opacity-10 rounded-4 p-5">
                                <div className="text-center">
                                    <div className="display-1 mb-3">🚀</div>
                                    <h3 className="text-white mb-4">Live Statistics</h3>
                                    <Row className="g-3">
                                        <Col md={4}>
                                            <div className="bg-white bg-opacity-10 rounded-3 p-3">
                                                <div className="text-warning display-4 fw-bold">{stats.services}+</div>
                                                <div className="text-white-50">Services</div>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="bg-white bg-opacity-10 rounded-3 p-3">
                                                <div className="text-success display-4 fw-bold">{stats.providers}+</div>
                                                <div className="text-white-50">Providers</div>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="bg-white bg-opacity-10 rounded-3 p-3">
                                                <div className="text-info display-4 fw-bold">{stats.customers}+</div>
                                                <div className="text-white-50">Customers</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* How It Works - Only Once */}
            <Container className="py-5">
                <h2 className="text-center display-5 fw-bold mb-2">How It Works</h2>
                <p className="text-center text-muted mb-5">Get your project done in 3 simple steps</p>
                <Row>
                    {[
                        { step: '1', title: 'Create Account', desc: 'Sign up as a customer or provider in minutes', icon: '📝' },
                        { step: '2', title: 'Find or List Services', desc: 'Browse services or list your own expertise', icon: '🔍' },
                        { step: '3', title: 'Get Work Done', desc: 'Connect, collaborate, and complete projects', icon: '✅' }
                    ].map((item, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="border-0 shadow-sm text-center hover-shadow">
                                <Card.Body className="p-4">
                                    <div className="display-1 mb-3">{item.icon}</div>
                                    <h4 className="fw-bold">Step {item.step}</h4>
                                    <h5 className="fw-bold">{item.title}</h5>
                                    <p className="text-muted">{item.desc}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Categories */}
            <Container className="py-5">
                <h2 className="text-center display-5 fw-bold mb-2">Popular Categories</h2>
                <p className="text-center text-muted mb-5">Find the perfect service for your needs</p>
                <Row>
                    {categories.map((category, index) => (
                        <Col md={3} sm={6} key={index} className="mb-3">
                            <Link to={`/services?category=${category.name}`} className="text-decoration-none">
                                <Card className="text-center h-100 border-0 shadow-sm hover-shadow">
                                    <Card.Body className="py-4">
                                        <div className="display-4 mb-2">{category.icon}</div>
                                        <h6 className="fw-bold">{category.name}</h6>
                                        <small className="text-muted">{category.count} services</small>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Featured Services */}
            <Container fluid className="bg-light py-5">
                <Container>
                    <h2 className="text-center display-5 fw-bold mb-2">Featured Services</h2>
                    <p className="text-center text-muted mb-5">Handpicked services from top providers</p>
                    <Row>
                        {featuredServices.map((service) => (
                            <Col md={4} lg={4} key={service._id} className="mb-4">
                                <Card className="h-100 border-0 shadow-sm hover-shadow" style={{ borderRadius: '15px' }}>
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <Badge bg="info">{service.category}</Badge>
                                            <div className="text-warning"><FaStar /> <span className="text-dark">4.8</span></div>
                                        </div>
                                        <h5 className="fw-bold">{service.title}</h5>
                                        <p className="text-muted small">{service.description?.substring(0, 80)}...</p>
                                        <div className="d-flex justify-content-between align-items-end mt-3">
                                            <div>
                                                <h5 className="text-primary fw-bold">${service.price}</h5>
                                                <small className="text-muted">Delivery: {service.deliveryTime}</small>
                                            </div>
                                            <Link to={`/services/${service._id}`}>
                                                <Button variant="outline-primary" size="sm" className="rounded-pill px-3">View Details</Button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center mt-3">
                        <Link to="/services"><Button variant="primary" size="lg" className="rounded-pill px-5 fw-bold">View All Services <FaArrowRight className="ms-2" /></Button></Link>
                    </div>
                </Container>
            </Container>

            {/* Testimonials */}
<Container className="py-5">
    <h2 className="text-center display-5 fw-bold mb-2">What Our Customers Say</h2>
    <p className="text-center text-muted mb-5">Real reviews from real customers</p>
    <Row>
        {testimonials.map((testimonial, index) => (
            <Col md={4} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm hover-shadow" style={{ borderRadius: '15px' }}>
                    <Card.Body className="p-4">
                        <div className="text-warning mb-3">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < testimonial.rating ? 'text-warning' : 'text-secondary'} />
                            ))}
                        </div>
                        <p className="mb-3">"{testimonial.text}"</p>
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: '45px', height: '45px', fontSize: '16px', fontWeight: 'bold' }}>
                                {testimonial.avatar}
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                                <small className="text-muted">{testimonial.role}</small>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
</Container>
            {/* CTA */}
            <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', padding: '80px 0' }}>
                <Container className="text-center">
                    <h2 className="display-4 fw-bold text-white mb-3">Ready to Get Started?</h2>
                    <p className="lead text-white-50 mb-4">Join thousands of satisfied customers and providers today</p>
                    <Link to="/register"><Button variant="warning" size="lg" className="rounded-pill px-5 py-3 fw-bold">🚀 Create Free Account Now</Button></Link>
                </Container>
            </div>
        </>
    );
};

export default Home;