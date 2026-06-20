import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'; // ← Removed Rating
import { createReview } from '../services/api';

const Review = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
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
            setSuccess('Review submitted successfully!');
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
                    <Card className="shadow">
                        <Card.Body className="p-5">
                            <h2 className="text-center mb-4">⭐ Leave a Review</h2>
                            
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4 text-center">
                                    <Form.Label className="fw-bold">Rating</Form.Label>
                                    <div className="d-flex justify-content-center gap-2 fs-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                style={{
                                                    cursor: 'pointer',
                                                    color: star <= rating ? '#FFD700' : '#ddd',
                                                    fontSize: '2.5rem'
                                                }}
                                                onClick={() => setRating(star)}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-muted mt-2">
                                        {rating === 5 ? 'Excellent!' :
                                         rating === 4 ? 'Very Good' :
                                         rating === 3 ? 'Good' :
                                         rating === 2 ? 'Fair' :
                                         'Poor'}
                                    </p>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Feedback</Form.Label>
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
                                    <Button type="submit" variant="primary" className="flex-grow-1" disabled={submitting}>
                                        {submitting ? 'Submitting...' : 'Submit Review'}
                                    </Button>
                                    <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>
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