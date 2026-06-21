import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Table, Nav, Alert } from 'react-bootstrap';
import { getCustomerRequests, getProviderRequests, getProviderReviews } from '../services/api';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user) {
            fetchRequests();
            if (user.role === 'provider') {
                fetchReviews();
            }
        }
    }, [user]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
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

    const fetchReviews = async () => {
        try {
            const response = await getProviderReviews(user._id);
            setReviews(response.data.data || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
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

    const handleReview = (requestId) => {
        navigate(`/review/${requestId}`);
    };

    // Calculate average rating
    const averageRating = reviews.length > 0 
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="py-5">
            {/* Header */}
            <Row className="mb-4">
                <Col>
                    <h2 className="display-6">Dashboard</h2>
                    <p className="text-muted">Welcome back, {user?.name}!</p>
                    {user?.role === 'provider' && reviews.length > 0 && (
                        <div className="mt-2">
                            <Badge bg="warning" className="fs-6 p-2">
                                ⭐ Average Rating: {averageRating} / 5 ({reviews.length} reviews)
                            </Badge>
                        </div>
                    )}
                </Col>
                <Col xs="auto">
                    <Button variant="outline-danger" onClick={logout}>
                        Logout
                    </Button>
                </Col>
            </Row>

            {/* Tabs */}
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
                    <>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/my-services">
                                My Services
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link 
                                active={activeTab === 'reviews'} 
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews ({reviews.length})
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active={activeTab === 'my-reviews'} 
                            onClick={() => setActiveTab('my-reviews')}>
                                My Reviews
                            </Nav.Link>
                        </Nav.Item>
                    </>
                )}
            </Nav>

            {/* Error/Success Messages */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {/* Overview Tab */}
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
                            <h5 className="mb-0">
                                {user?.role === 'customer' ? 'My Requests' : 'Customer Requests'}
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            {requests.length === 0 ? (
                                <p className="text-muted text-center">No requests yet</p>
                            ) : (
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>{user?.role === 'customer' ? 'Service' : 'Customer'}</th>
                                            <th>{user?.role === 'customer' ? 'Provider' : 'Service'}</th>
                                            <th>Budget</th>
                                            <th>Deadline</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.map((req) => (
                                            <tr key={req._id}>
                                                {user?.role === 'customer' ? (
                                                    <>
                                                        <td>{req.serviceId?.title || 'N/A'}</td>
                                                        <td>{req.providerId?.name || 'N/A'}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{req.customerId?.name || 'N/A'}</td>
                                                        <td>{req.serviceId?.title || 'N/A'}</td>
                                                    </>
                                                )}
                                                <td>${req.budget}</td>
                                                <td>{new Date(req.deadline).toLocaleDateString()}</td>
                                                <td>{getStatusBadge(req.status)}</td>
                                                <td>
                                                    <Button 
                                                        variant="outline-primary" 
                                                        size="sm"
                                                        onClick={() => navigate(`/requests/${req._id}`)}
                                                    >
                                                        View
                                                    </Button>
                                                    {user?.role === 'customer' && req.status === 'delivered' && (
                                                        <Button 
                                                            variant="success" 
                                                            size="sm" 
                                                            className="ms-1"
                                                            onClick={() => handleReview(req._id)}
                                                        >
                                                            ⭐ Review
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </>
            )}

            {/* My Requests Tab */}
            {activeTab === 'requests' && (
                <Card className="shadow-sm">
                    <Card.Body>
                        {requests.length === 0 ? (
                            <p className="text-muted text-center">No requests found</p>
                        ) : (
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>{user?.role === 'customer' ? 'Service' : 'Customer'}</th>
                                        <th>{user?.role === 'customer' ? 'Provider' : 'Service'}</th>
                                        <th>Budget</th>
                                        <th>Deadline</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((req) => (
                                        <tr key={req._id}>
                                            {user?.role === 'customer' ? (
                                                <>
                                                    <td>{req.serviceId?.title || 'N/A'}</td>
                                                    <td>{req.providerId?.name || 'N/A'}</td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{req.customerId?.name || 'N/A'}</td>
                                                    <td>{req.serviceId?.title || 'N/A'}</td>
                                                </>
                                            )}
                                            <td>${req.budget}</td>
                                            <td>{new Date(req.deadline).toLocaleDateString()}</td>
                                            <td>{getStatusBadge(req.status)}</td>
                                            <td>
                                                <Button 
                                                    variant="outline-primary" 
                                                    size="sm"
                                                    onClick={() => navigate(`/requests/${req._id}`)}
                                                >
                                                    View
                                                </Button>
                                                {user?.role === 'customer' && req.status === 'delivered' && (
                                                    <Button 
                                                        variant="success" 
                                                        size="sm" 
                                                        className="ms-1"
                                                        onClick={() => handleReview(req._id)}
                                                    >
                                                        ⭐ Review
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            )}

            {/* Reviews Tab - Only for Providers */}
            {activeTab === 'reviews' && user?.role === 'provider' && (
                <Card className="shadow-sm">
                    <Card.Header>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">⭐ Reviews from Customers</h5>
                            <div>
                                <Badge bg="warning" className="fs-6 p-2">
                                    Average: {averageRating} / 5
                                </Badge>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {reviews.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="text-muted">No reviews yet</p>
                                <p className="text-muted small">Complete more projects to get reviews!</p>
                            </div>
                        ) : (
                            <div className="reviews-list">
                                {reviews.map((review) => (
                                    <Card key={review._id} className="mb-3 border-0 shadow-sm">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <h6 className="mb-0">{review.reviewerId?.name || 'Anonymous'}</h6>
                                                        <Badge bg="warning" className="fs-6">
                                                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-muted small mb-1">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <p className="mb-0 mt-2">{review.feedback}</p>
                                                </div>
                                                <Badge bg="success" className="fs-6 p-2">
                                                    {review.rating} / 5
                                                </Badge>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default Dashboard;