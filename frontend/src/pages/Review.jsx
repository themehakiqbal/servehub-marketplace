import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { createReview } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Review = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            await createReview({
                requestId,
                rating,
                feedback
            });
            setSuccess('✅ Review submitted successfully!');
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-5">
            <Row>
                <Col md={8} className="mx-auto">
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">⭐ Leave a Review</h2>
                                <p className="text-muted">Share your experience with the provider</p>
                            </div>
                            
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4 text-center">
                                    <Form.Label className="fw-bold fs-5">How would you rate this provider?</Form.Label>
                                    <div className="d-flex justify-content-center gap-3 fs-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                style={{
                                                    cursor: 'pointer',
                                                    color: star <= rating ? '#FFD700' : '#ddd',
                                                    fontSize: '3rem',
                                                    transition: 'transform 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                onClick={() => setRating(star)}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-muted mt-2">
                                        {rating === 5 ? '🌟 Excellent!' :
                                         rating === 4 ? '👍 Very Good' :
                                         rating === 3 ? '👌 Good' :
                                         rating === 2 ? '👎 Fair' :
                                         '😞 Poor'}
                                    </p>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Your Feedback</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Share your experience with the provider..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-flex gap-2">
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        className="flex-grow-1 py-2 fw-bold"
                                        disabled={submitting}
                                    >
                                        {submitting ? <Spinner animation="border" size="sm" /> : 'Submit Review'}
                                    </Button>
                                    <Button 
                                        variant="outline-secondary" 
                                        onClick={() => navigate('/dashboard')}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Review;