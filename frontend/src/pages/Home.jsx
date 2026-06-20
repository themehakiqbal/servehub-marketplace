import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { FaSearch, FaStar, FaUsers, FaBriefcase, FaShieldAlt, FaClock, FaArrowRight, FaCode, FaPalette, FaPenFancy, FaBullhorn, FaVideo, FaMobile, FaChartLine } from 'react-icons/fa';
import { getAllServices } from '../services/api';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [featuredServices, setFeaturedServices] = useState([]);
    const [stats, setStats] = useState({ services: 0, providers: 0, customers: 0, reviews: 0 });

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
        const targetReviews = 200;

        let providers = 0, customers = 0, reviews = 0;
        const interval = setInterval(() => {
            if (providers < targetProviders) providers += Math.ceil(targetProviders / 30);
            if (customers < targetCustomers) customers += Math.ceil(targetCustomers / 30);
            if (reviews < targetReviews) reviews += Math.ceil(targetReviews / 30);
            
            setStats(prev => ({ 
                ...prev, 
                providers: Math.min(providers, targetProviders),
                customers: Math.min(customers, targetCustomers),
                reviews: Math.min(reviews, targetReviews)
            }));

            if (providers >= targetProviders && customers >= targetCustomers && reviews >= targetReviews) {
                clearInterval(interval);
            }
        }, 50);
    };

    const categories = [
        { name: 'Web Development', icon: <FaCode />, color: '#4F46E5', count: '150+' },
        { name: 'Graphic Design', icon: <FaPalette />, color: '#EC4899', count: '120+' },
        { name: 'Content Writing', icon: <FaPenFancy />, color: '#8B5CF6', count: '100+' },
        { name: 'Digital Marketing', icon: <FaBullhorn />, color: '#F59E0B', count: '80+' },
        { name: 'Video Editing', icon: <FaVideo />, color: '#EF4444', count: '60+' },
        { name: 'App Development', icon: <FaMobile />, color: '#10B981', count: '70+' },
        { name: 'SEO Services', icon: <FaChartLine />, color: '#3B82F6', count: '90+' },
        { name: 'Social Media', icon: <FaSearch />, color: '#6366F1', count: '110+' },
    ];

    const features = [
        {
            icon: <FaShieldAlt className="text-primary fs-1" />,
            title: 'Secure & Trusted',
            description: 'All providers are verified and reviewed by real customers'
        },
        {
            icon: <FaClock className="text-success fs-1" />,
            title: 'Fast Delivery',
            description: 'Get your projects delivered on time with our tracking system'
        },
        {
            icon: <FaStar className="text-warning fs-1" />,
            title: 'Quality Guaranteed',
            description: 'High-quality work with customer satisfaction guaranteed'
        },
        {
            icon: <FaUsers className="text-info fs-1" />,
            title: 'Expert Providers',
            description: 'Connect with skilled professionals from around the world'
        }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            window.location.href = `/services?search=${searchTerm}`;
        }
    };

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
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '60%',
                    height: '200%',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    transform: 'rotate(15deg)'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-10%',
                    width: '40%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '50%',
                }}></div>
                
                <Container style={{ position: 'relative', zIndex: 1 }}>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-5 mb-lg-0">
                            <Badge bg="warning" className="mb-3 px-3 py-2">
                                🔥 Trusted by 300+ Customers
                            </Badge>
                            <h1 className="display-1 fw-bold text-white mb-4">
                                Find the Perfect <br />
                                <span className="text-warning">Service Provider</span>
                            </h1>
                            <p className="lead text-white-50 mb-4" style={{ fontSize: '1.25rem' }}>
                                Connect with top-rated professionals for web development, design, 
                                marketing, and more. Join thousands of satisfied customers today!
                            </p>
                            <Form onSubmit={handleSearch}>
                                <InputGroup size="lg" className="mb-4 shadow">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search for services..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border-0 py-3"
                                        style={{ borderRadius: '50px 0 0 50px' }}
                                    />
                                    <Button 
                                        type="submit" 
                                        variant="warning" 
                                        className="px-4 py-3"
                                        style={{ borderRadius: '0 50px 50px 0' }}
                                    >
                                        <FaSearch /> Search
                                    </Button>
                                </InputGroup>
                            </Form>
                            <div className="d-flex gap-3 flex-wrap">
                                <Link to="/services">
                                    <Button variant="light" size="lg" className="rounded-pill px-4 fw-bold">
                                        Browse Services <FaArrowRight className="ms-2" />
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="outline-light" size="lg" className="rounded-pill px-4 fw-bold">
                                        Get Started Free
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="bg-white bg-opacity-10 rounded-4 p-5 backdrop-blur">
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

            {/* How It Works */}
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
                            <Card className="border-0 shadow-sm text-center hover-shadow transition-all" style={{ borderRadius: '15px' }}>
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

            {/* Trusted By Section */}
            <div className="py-4 bg-white border-bottom">
                <Container>
                    <Row className="align-items-center text-center">
                        <Col>
                            <p className="text-muted mb-0 fw-bold">TRUSTED BY COMPANIES WORLDWIDE</p>
                            <div className="d-flex justify-content-center gap-5 flex-wrap mt-2">
                                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'].map(company => (
                                    <span key={company} className="text-secondary fw-bold" style={{ fontSize: '1.2rem' }}>
                                        {company}
                                    </span>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Categories Section */}
            <Container className="py-5">
                <h2 className="text-center display-5 fw-bold mb-2">Popular Categories</h2>
                <p className="text-center text-muted mb-5">Find the perfect service for your needs</p>
                <Row>
                    {categories.map((category, index) => (
                        <Col md={3} sm={6} key={index} className="mb-3">
                            <Link to={`/services?category=${category.name}`} className="text-decoration-none">
                                <Card className="text-center h-100 border-0 shadow-sm hover-shadow transition-all" 
                                      style={{ cursor: 'pointer', borderRadius: '15px' }}>
                                    <Card.Body className="py-4">
                                        <div className="display-4 mb-2" style={{ color: category.color }}>
                                            {category.icon}
                                        </div>
                                        <h6 className="fw-bold">{category.name}</h6>
                                        <small className="text-muted">{category.count} services</small>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Featured Services Section */}
            <Container fluid className="bg-light py-5">
                <Container>
                    <h2 className="text-center display-5 fw-bold mb-2">Featured Services</h2>
                    <p className="text-center text-muted mb-5">Handpicked services from top providers</p>
                    <Row>
                        {featuredServices.length > 0 ? (
                            featuredServices.map((service) => (
                                <Col md={4} lg={4} key={service._id} className="mb-4">
                                    <Card className="h-100 border-0 shadow-sm hover-shadow transition-all" style={{ borderRadius: '15px' }}>
                                        <Card.Body className="p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Badge bg="info">{service.category}</Badge>
                                                <div className="text-warning">
                                                    <FaStar /> <span className="text-dark">4.8</span>
                                                </div>
                                            </div>
                                            <h5 className="fw-bold">{service.title}</h5>
                                            <p className="text-muted small">{service.description?.substring(0, 80)}...</p>
                                            <div className="d-flex justify-content-between align-items-end mt-3">
                                                <div>
                                                    <h5 className="text-primary fw-bold">${service.price}</h5>
                                                    <small className="text-muted">Delivery: {service.deliveryTime}</small>
                                                </div>
                                                <Link to={`/services/${service._id}`}>
                                                    <Button variant="outline-primary" size="sm" className="rounded-pill px-3">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center py-5">
                                <p className="text-muted">No services available yet. Check back soon!</p>
                            </Col>
                        )}
                    </Row>
                    <div className="text-center mt-3">
                        <Link to="/services">
                            <Button variant="primary" size="lg" className="rounded-pill px-5 fw-bold">
                                View All Services <FaArrowRight className="ms-2" />
                            </Button>
                        </Link>
                    </div>
                </Container>
            </Container>

            {/* Features Section */}
            <Container className="py-5">
                <h2 className="text-center display-5 fw-bold mb-2">Why Choose ServeHub?</h2>
                <p className="text-center text-muted mb-5">We make it easy to find and hire the best professionals</p>
                <Row>
                    {features.map((feature, index) => (
                        <Col md={3} key={index} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm text-center hover-shadow transition-all" style={{ borderRadius: '15px' }}>
                                <Card.Body className="py-4">
                                    <div className="mb-3">{feature.icon}</div>
                                    <h5 className="fw-bold">{feature.title}</h5>
                                    <p className="text-muted small">{feature.description}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Testimonials */}
            <Container fluid className="bg-light py-5">
                <Container>
                    <h2 className="text-center display-5 fw-bold mb-2">What Our Customers Say</h2>
                    <p className="text-center text-muted mb-5">Real reviews from real customers</p>
                    <Row>
                        {[
                            { name: 'Sarah Ahmed', role: 'Startup Founder', text: 'ServeHub helped me find the perfect developer for my startup. The quality of work was exceptional!', rating: 5 },
                            { name: 'Muhammad Ali', role: 'Digital Agency Owner', text: 'I have hired multiple designers through ServeHub. Always professional and deliver on time.', rating: 5 },
                            { name: 'Ayesha Khan', role: 'Content Creator', text: 'The best platform for finding content writers. The process is smooth and the quality is outstanding.', rating: 4 }
                        ].map((testimonial, index) => (
                            <Col md={4} key={index} className="mb-4">
                                <Card className="h-100 border-0 shadow-sm hover-shadow transition-all" style={{ borderRadius: '15px' }}>
                                    <Card.Body className="p-4">
                                        <div className="text-warning mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < testimonial.rating ? 'text-warning' : 'text-secondary'} />
                                            ))}
                                        </div>
                                        <p className="mb-3">"{testimonial.text}"</p>
                                        <div>
                                            <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                                            <small className="text-muted">{testimonial.role}</small>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>

            {/* CTA Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                padding: '80px 0'
            }}>
                <Container className="text-center">
                    <h2 className="display-4 fw-bold text-white mb-3">Ready to Get Started?</h2>
                    <p className="lead text-white-50 mb-4">Join thousands of satisfied customers and providers today</p>
                    <Link to="/register">
                        <Button variant="warning" size="lg" className="rounded-pill px-5 py-3 fw-bold">
                            🚀 Create Free Account Now
                        </Button>
                    </Link>
                </Container>
            </div>
        </>
    );
};

export default Home;