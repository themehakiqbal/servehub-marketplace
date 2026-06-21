import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { getRequest, updateRequestStatus } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchRequest();
    }, [id]);

    const fetchRequest = async () => {
        try {
            setLoading(true);
            const response = await getRequest(id);
            setRequest(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching request:', error);
            setError('Request not found or you are not authorized to view it');
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            setUpdating(true);
            await updateRequestStatus(id, newStatus);
            setSuccess(`Status updated to ${newStatus}`);
            fetchRequest();
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError('Failed to update status');
            setTimeout(() => setError(''), 3000);
        } finally {
            setUpdating(false);
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
                <p className="mt-3">Loading request details...</p>
            </Container>
        );
    }

    if (error || !request) {
        return (
            <Container className="text-center py-5">
                <Alert variant="danger">{error || 'Request not found'}</Alert>
                <Button variant="primary" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
            </Container>
        );
    }

    const isProvider = user?.role === 'provider';
    const canAct = isProvider && request.status !== 'cancelled' && request.status !== 'delivered';

    return (
        <Container className="py-5">
            <Row>
                <Col lg={8} className="mx-auto">
                    <Card className="shadow-lg border-0">
                        <Card.Header className="bg-primary text-white py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0">📋 Request Details</h4>
                                {getStatusBadge(request.status)}
                            </div>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            {/* Service & Provider Info */}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <div className="border-bottom pb-2">
                                        <small className="text-muted">Service</small>
                                        <h5 className="mb-0">{request.serviceId?.title || 'N/A'}</h5>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="border-bottom pb-2">
                                        <small className="text-muted">Category</small>
                                        <h5 className="mb-0">{request.serviceId?.category || 'N/A'}</h5>
                                    </div>
                                </Col>
                            </Row>

                            {/* Customer & Provider */}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <div className="border-bottom pb-2">
                                        <small className="text-muted">Customer</small>
                                        <h5 className="mb-0">{request.customerId?.name || 'N/A'}</h5>
                                        <small className="text-muted">{request.customerId?.email}</small>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="border-bottom pb-2">
                                        <small className="text-muted">Provider</small>
                                        <h5 className="mb-0">{request.providerId?.name || 'N/A'}</h5>
                                        <small className="text-muted">{request.providerId?.email}</small>
                                    </div>
                                </Col>
                            </Row>

                            {/* Budget & Deadline */}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <div className="border-bottom pb-2">
                                        <small className="text-muted">Budget</small>
                                        <h4 className="text-success mb-0">${request.budget}</h4>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="border-bottom pb-2">
                                        <small className="text-muted">Deadline</small>
                                        <h5 className="mb-0">{new Date(request.deadline).toLocaleDateString()}</h5>
                                    </div>
                                </Col>
                            </Row>

                            {/* Requirements */}
                            <div className="mb-4">
                                <small className="text-muted">Requirements</small>
                                <Card className="bg-light border-0 p-3">
                                    <p className="mb-0">{request.requirements}</p>
                                </Card>
                            </div>

                            {/* Message */}
                            {request.message && (
                                <div className="mb-4">
                                    <small className="text-muted">Message</small>
                                    <Card className="bg-light border-0 p-3">
                                        <p className="mb-0">{request.message}</p>
                                    </Card>
                                </div>
                            )}

                            {/* Status Timeline */}
                            <div className="mb-4">
                                <small className="text-muted">Status Timeline</small>
                                <div className="mt-2">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Badge bg="secondary">Created</Badge>
                                        <span className="text-muted">→</span>
                                        <Badge bg={request.status === 'pending' ? 'warning' : 'secondary'}>
                                            Pending
                                        </Badge>
                                        {request.status !== 'pending' && (
                                            <>
                                                <span className="text-muted">→</span>
                                                <Badge bg={request.status === 'accepted' ? 'info' : 'secondary'}>
                                                    Accepted
                                                </Badge>
                                            </>
                                        )}
                                        {request.status === 'in-progress' || request.status === 'completed' || request.status === 'delivered' && (
                                            <>
                                                <span className="text-muted">→</span>
                                                <Badge bg={request.status === 'in-progress' ? 'warning' : 'secondary'}>
                                                    In Progress
                                                </Badge>
                                            </>
                                        )}
                                        {request.status === 'completed' || request.status === 'delivered' && (
                                            <>
                                                <span className="text-muted">→</span>
                                                <Badge bg={request.status === 'completed' ? 'primary' : 'secondary'}>
                                                    Completed
                                                </Badge>
                                            </>
                                        )}
                                        {request.status === 'delivered' && (
                                            <>
                                                <span className="text-muted">→</span>
                                                <Badge bg="success">Delivered ✅</Badge>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Status Update Buttons */}
                            {canAct && (
                                <div className="mt-4 pt-3 border-top">
                                    <h6 className="mb-3">Update Status</h6>
                                    <div className="d-flex gap-2 flex-wrap">
                                        {request.status === 'pending' && (
                                            <Button 
                                                variant="success" 
                                                onClick={() => handleStatusUpdate('accepted')}
                                                disabled={updating}
                                            >
                                                ✅ Accept Request
                                            </Button>
                                        )}
                                        {request.status === 'accepted' && (
                                            <Button 
                                                variant="warning" 
                                                onClick={() => handleStatusUpdate('in-progress')}
                                                disabled={updating}
                                            >
                                                🚀 Start Work
                                            </Button>
                                        )}
                                        {request.status === 'in-progress' && (
                                            <Button 
                                                variant="primary" 
                                                onClick={() => handleStatusUpdate('completed')}
                                                disabled={updating}
                                            >
                                                ✅ Mark Complete
                                            </Button>
                                        )}
                                        {request.status === 'completed' && (
                                            <Button 
                                                variant="info" 
                                                onClick={() => handleStatusUpdate('delivered')}
                                                disabled={updating}
                                            >
                                                📦 Deliver
                                            </Button>
                                        )}
                                        {request.status !== 'cancelled' && request.status !== 'delivered' && (
                                            <Button 
                                                variant="danger" 
                                                onClick={() => handleStatusUpdate('cancelled')}
                                                disabled={updating}
                                            >
                                                ❌ Cancel
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mt-4">
                                <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>
                                    ← Back to Dashboard
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RequestDetail;