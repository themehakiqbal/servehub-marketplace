import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Image } from 'react-bootstrap';
import { updateProfile, getProfile } from '../services/api';

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [profile, setProfile] = useState({
        skills: [],
        hourlyRate: '',
        fixedRate: '',
        profilePicture: '',
        experience: [],
        portfolio: []
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getProfile(user._id);
            setProfile(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setUpdating(true);

        try {
            const formData = new FormData();
            formData.append('skills', JSON.stringify(profile.skills));
            formData.append('hourlyRate', profile.hourlyRate);
            formData.append('fixedRate', profile.fixedRate);
            if (file) {
                formData.append('profilePicture', file);
            }

            const response = await updateProfile(formData);
            setSuccess('Profile updated successfully!');
            setUpdating(false);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update profile');
            setUpdating(false);
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
            <Row>
                <Col md={8} className="mx-auto">
                    <Card className="shadow">
                        <Card.Body className="p-5">
                            <h2 className="text-center mb-4">My Profile</h2>
                            
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <div className="text-center mb-4">
                                {profile.profilePicture ? (
                                    <Image 
                                        src={profile.profilePicture} 
                                        roundedCircle 
                                        width="100" 
                                        height="100"
                                        className="object-fit-cover"
                                    />
                                ) : (
                                    <div className="bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                                         style={{ width: '100px', height: '100px', fontSize: '2rem' }}>
                                        {user?.name?.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Skills (comma separated)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. JavaScript, React, Node.js"
                                        value={profile.skills?.join(', ') || ''}
                                        onChange={(e) => setProfile({
                                            ...profile,
                                            skills: e.target.value.split(',').map(s => s.trim())
                                        })}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Hourly Rate ($)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Hourly rate"
                                                value={profile.pricing?.hourly || ''}
                                                onChange={(e) => setProfile({
                                                    ...profile,
                                                    pricing: { ...profile.pricing, hourly: e.target.value }
                                                })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fixed Rate ($)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Fixed rate"
                                                value={profile.pricing?.fixed || ''}
                                                onChange={(e) => setProfile({
                                                    ...profile,
                                                    pricing: { ...profile.pricing, fixed: e.target.value }
                                                })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button type="submit" variant="primary" className="w-100" disabled={updating}>
                                    {updating ? 'Saving...' : 'Save Profile'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;