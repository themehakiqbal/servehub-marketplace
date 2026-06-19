import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Spinner, Row, Col } from 'react-bootstrap';
import { getCustomerRequests, getProviderRequests } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyRequests = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            let response;
            if (user.role === 'customer') {
                response = await getCustomerRequests();
            } else if (user.role === 'provider') {
                response = await getProviderRequests();
            }
            setRequests(response?.data?.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching requests:', error);
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            'pending': 'secondary',
            'accepted': 'info',
            'in-progress': 'warning',
            'completed': 'primary',
            'delivered': 'success',
            'cancelled': 'danger'
        };
        return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
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
            <h2 className="mb-4">My Requests</h2>
            {requests.length === 0 ? (
                <Card>
                    <Card.Body className="text-center py-5">
                        <p className="text-muted">No requests found</p>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {requests.map((req) => (
                        <Col md={6} key={req._id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h6>{req.serviceId?.title || 'Service Request'}</h6>
                                            <p className="text-muted small">Budget: ${req.budget}</p>
                                            <p className="text-muted small">
                                                Deadline: {new Date(req.deadline).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            {getStatusBadge(req.status)}
                                        </div>
                                    </div>
                                    {req.requirements && (
                                        <p className="small mt-2">{req.requirements}</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default MyRequests;