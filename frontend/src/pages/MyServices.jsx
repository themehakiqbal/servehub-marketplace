import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { getAllServices, deleteService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyServices = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await getAllServices();
            // Filter services by current provider
            const myServices = response.data.data.filter(
                s => s.providerId._id === user._id
            );
            setServices(myServices);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        
        try {
            await deleteService(id);
            setSuccess('Service deleted successfully');
            fetchServices();
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError('Failed to delete service');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Services</h2>
                <Link to="/create-service">
                    <Button variant="primary">+ Add New Service</Button>
                </Link>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {services.length === 0 ? (
                <Card>
                    <Card.Body className="text-center py-5">
                        <p className="text-muted">You haven't created any services yet</p>
                        <Link to="/create-service">
                            <Button variant="primary">Create Your First Service</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {services.map((service) => (
                        <Col md={6} lg={4} key={service._id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <h5>{service.title}</h5>
                                        <Badge bg={service.isActive ? 'success' : 'secondary'}>
                                            {service.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                    <Badge bg="info" className="mb-2">{service.category}</Badge>
                                    <p className="text-muted small">{service.description?.substring(0, 80)}...</p>
                                    <h5 className="text-primary">${service.price}</h5>
                                    <p className="text-muted small">Delivery: {service.deliveryTime}</p>
                                    <div className="d-flex gap-2 mt-3">
                                        <Link to={`/services/${service._id}`}>
                                            <Button variant="outline-primary" size="sm">View</Button>
                                        </Link>
                                        <Link to={`/edit-service/${service._id}`}>
                                            <Button variant="outline-warning" size="sm">Edit</Button>
                                        </Link>
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            onClick={() => handleDelete(service._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default MyServices;