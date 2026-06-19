import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { getAllServices } from '../services/api';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await getAllServices();
            setServices(response.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
            setLoading(false);
        }
    };

    const filteredServices = services.filter(service => {
        const matchSearch = service.title.toLowerCase().includes(search.toLowerCase()) ||
                           service.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === '' || service.category === category;
        return matchSearch && matchCategory;
    });

    const categories = ['All', 'Web Development', 'Graphic Design', 'Content Writing', 
                        'Digital Marketing', 'Video Editing', 'App Development', 'SEO Services'];

    return (
        <Container className="py-5">
            <h1 className="display-4 mb-4">Browse Services</h1>

            <Row className="mb-4">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Search services..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col md={6}>
                    <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat === 'All' ? '' : cat}>
                                {cat}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            ) : filteredServices.length === 0 ? (
                <Card>
                    <Card.Body className="text-center py-5">
                        <h4>No services found</h4>
                        <p className="text-muted">Try adjusting your search or filters</p>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {filteredServices.map((service) => (
                        <Col md={4} lg={3} key={service._id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <h5 className="card-title">{service.title}</h5>
                                    <Badge bg="info" className="mb-2">{service.category}</Badge>
                                    <p className="text-muted small">{service.description?.substring(0, 80)}...</p>
                                    <h5 className="text-primary mt-2">${service.price}</h5>
                                    <p className="text-muted small">Delivery: {service.deliveryTime}</p>
                                    <Link to={`/services/${service._id}`}>
                                        <Button variant="primary" size="sm" className="w-100">
                                            View Details
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Services;