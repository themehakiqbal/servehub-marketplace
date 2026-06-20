import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('📤 Submitting login form:', { email });
            const result = await login(email, password);
            console.log('📥 Login result:', result);
            
            if (result.success) {
                console.log('✅ Login successful, navigating to dashboard');
                navigate('/dashboard');
            } else {
                console.log('❌ Login failed:', result.message);
                setError(result.message);
            }
        } catch (err) {
            console.error('💥 Unexpected login error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary">Welcome Back</h2>
                                <p className="text-muted">Login to your ServeHub account</p>
                            </div>
                            
                            {error && <Alert variant="danger">{error}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </Form.Group>
                                
                                <Button 
                                    type="submit" 
                                    variant="primary" 
                                    className="w-100 py-2 fw-bold"
                                    disabled={loading}
                                >
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                                </Button>
                            </Form>
                            
                            <div className="text-center mt-3">
                                <p className="text-muted">
                                    Don't have an account? <Link to="/register" className="text-primary fw-bold">Register</Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;