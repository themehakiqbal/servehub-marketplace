import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Table, Nav } from 'react-bootstrap';
import { getCustomerRequests, getProviderRequests } from '../services/api';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

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

    const getStatusCount = (status) => {
        return requests.filter(r => r.status === status).length;
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
            <Row className="mb-4">
                <Col>
                    <h2 className="display-6">Dashboard</h2>
                    <p className="text-muted">Welcome back, {user?.name}!</p>
                </Col>
                <Col xs="auto">
                    <Button variant="outline-danger" onClick={logout}>
                        Logout
                    </Button>
                </Col>
            </Row>

            <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                    <Nav.Link active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                        Overview
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active={activeTab === 'requests'} onClick={() => setActiveTab('requests')}>
                        My Requests
                    </Nav.Link>
                </Nav.Item>
                {user.role === 'provider' && (
                    <Nav.Item>
                        <Nav.Link active={activeTab === 'services'} onClick={() => setActiveTab('services')}>
                            My Services
                        </Nav.Link>
                    </Nav.Item>
                )}
            </Nav>

            {activeTab === 'overview' && (
                <>
                    <Row className="mb-4">
                        <Col md={3}>
                            <Card className="text-center shadow-sm">
                                <Card.Body>
                                    <h1 className="text-primary">{requests.length}</h1>
                                    <p className="text-muted">Total Requests</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="text-center shadow-sm">
                                <Card.Body>
                                    <h1 className="text-warning">{getStatusCount('pending')}</h1>
                                    <p className="text-muted">Pending</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="text-center shadow-sm">
                                <Card.Body>
                                    <h1 className="text-success">{getStatusCount('delivered')}</h1>
                                    <p className="text-muted">Delivered</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="text-center shadow-sm">
                                <Card.Body>
                                    <h1 className="text-info">{getStatusCount('in-progress')}</h1>
                                    <p className="text-muted">In Progress</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Card className="shadow-sm">
                        <Card.Header>
                            <h5 className="mb-0">Recent Requests</h5>
                        </Card.Header>
                        <Card.Body>
                            {requests.length === 0 ? (
                                <p className="text-muted text-center">No requests yet</p>
                            ) : (
                                requests.slice(0, 5).map((req) => (
                                    <div key={req._id} className="border-bottom py-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{req.serviceId?.title || 'Service Request'}</strong>
                                                <span className="ms-3 text-muted small">
                                                    ${req.budget}
                                                </span>
                                            </div>
                                            <div>
                                                {getStatusBadge(req.status)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </Card.Body>
                    </Card>
                </>
            )}

            {activeTab === 'requests' && (
                <Card className="shadow-sm">
                    <Card.Body>
                        {requests.length === 0 ? (
                            <p className="text-muted text-center">No requests found</p>
                        ) : (
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Budget</th>
                                        <th>Deadline</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((req) => (
                                        <tr key={req._id}>
                                            <td>{req.serviceId?.title || 'N/A'}</td>
                                            <td>${req.budget}</td>
                                            <td>{new Date(req.deadline).toLocaleDateString()}</td>
                                            <td>{getStatusBadge(req.status)}</td>
                                            <td>
                                                {user.role === 'provider' && req.status === 'pending' && (
                                                    <Button variant="success" size="sm" className="me-1">
                                                        Accept
                                                    </Button>
                                                )}
                                                <Button variant="outline-primary" size="sm">
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default Dashboard;