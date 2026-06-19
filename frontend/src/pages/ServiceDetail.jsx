import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { getService, submitRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [requestData, setRequestData] = useState({
        requirements: '',
        budget: '',
        deadline: '',
        message: ''
    });

    useEffect(() => {
        fetchService();
    }, [id]);

    const fetchService = async () => {
        try {
            const response = await getService(id);
            setService(response.data.data);
            setLoading(false);
        } catch (error) {
            setError('Service not found');
            setLoading(false);
        }
    };

    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const data = {
                serviceId: id,
                ...requestData,
                budget: parseFloat(requestData.budget)
            };
            await submitRequest(data);
            setSuccess('Request submitted successfully!');
            setRequestData({
                requirements: '',
                budget: '',
                deadline: '',
                message: ''
            });
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to submit request');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error || !service) {
        return (
            <Container className="text-center py-5">
                <Alert variant="danger">{error || 'Service not found'}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Row>
                <Col lg={8} className="mx-auto">
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <h2>{service.title}</h2>
                            <Badge bg="info" className="mb-3">{service.category}</Badge>
                            
                            <div className="mb-4">
                                <h5>Provider</h5>
                                <p className="text-muted">{service.providerId?.name || 'Unknown'}</p>
                            </div>

                            <div className="mb-4">
                                <h5>Description</h5>
                                <p>{service.description}</p>
                            </div>

                            <Row className="mb-4">
                                <Col md={6}>
                                    <h5>Price</h5>
                                    <h3 className="text-primary">${service.price}</h3>
                                </Col>
                                <Col md={6}>
                                    <h5>Delivery Time</h5>
                                    <p>{service.deliveryTime}</p>
                                </Col>
                            </Row>

                            {user && user.role === 'customer' && (
                                <>
                                    <hr />
                                    <h5 className="mb-3">Submit a Request</h5>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    {success && <Alert variant="success">{success}</Alert>}
                                    
                                    <form onSubmit={handleSubmitRequest}>
                                        <div className="mb-3">
                                            <label className="form-label">Requirements</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={requestData.requirements}
                                                onChange={(e) => setRequestData({...requestData, requirements: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <Row>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <label className="form-label">Budget ($)</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={requestData.budget}
                                                        onChange={(e) => setRequestData({...requestData, budget: e.target.value})}
                                                        required
                                                        min="0"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <label className="form-label">Deadline</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={requestData.deadline}
                                                        onChange={(e) => setRequestData({...requestData, deadline: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="mb-3">
                                            <label className="form-label">Message (Optional)</label>
                                            <textarea
                                                className="form-control"
                                                rows="2"
                                                value={requestData.message}
                                                onChange={(e) => setRequestData({...requestData, message: e.target.value})}
                                            />
                                        </div>
                                        <Button type="submit" variant="primary" disabled={submitting}>
                                            {submitting ? 'Submitting...' : 'Submit Request'}
                                        </Button>
                                    </form>
                                </>
                            )}

                            {!user && (
                                <Alert variant="info">
                                    <p className="mb-0">
                                        <a href="/login" className="text-primary">Login</a> to submit a request
                                    </p>
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ServiceDetail;