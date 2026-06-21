import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Badge } from 'react-bootstrap';
import { FaQuestionCircle, FaSearch } from 'react-icons/fa';

const Faq = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const faqs = [
        {
            category: 'General',
            q: 'What is ServeHub?',
            a: 'ServeHub is a full-stack service marketplace platform that connects customers with professional service providers. It allows you to browse services, hire professionals, submit service requests, and track project progress.'
        },
        {
            category: 'General',
            q: 'How does ServeHub work?',
            a: 'Simply create an account, browse services from verified providers, submit a request with your requirements and budget, track progress through status updates, and leave a review after project completion.'
        },
        {
            category: 'General',
            q: 'Is ServeHub free to use?',
            a: 'Yes! ServeHub is completely free to use for both customers and providers. We believe in connecting talent without barriers.'
        },
        {
            category: 'Customers',
            q: 'How do I hire a provider?',
            a: 'Browse services, select a provider, submit a service request with your requirements, budget, and deadline. The provider will review and accept your request.'
        },
        {
            category: 'Customers',
            q: 'Can I track my project progress?',
            a: 'Yes! You can track the status of your request through the dashboard. Status updates include: Pending → Accepted → In Progress → Completed → Delivered.'
        },
        {
            category: 'Customers',
            q: 'How do I leave a review?',
            a: 'After a project is marked as "Delivered," you can leave a review and rating for the provider. This helps build trust in the community.'
        },
        {
            category: 'Customers',
            q: 'What if I need to cancel a request?',
            a: 'You can cancel a pending request from your dashboard. For accepted or in-progress requests, please contact the provider directly.'
        },
        {
            category: 'Providers',
            q: 'How do I become a provider?',
            a: 'Register as a provider, create your profile with skills and experience, and start listing your services. Make sure to complete your profile to attract more clients.'
        },
        {
            category: 'Providers',
            q: 'How do I get paid?',
            a: 'Currently, ServeHub is a platform for connecting clients and providers. Payment arrangements are made directly between clients and providers. (Payment integration coming soon!)'
        },
        {
            category: 'Providers',
            q: 'What happens after I accept a request?',
            a: 'After accepting a request, you can update the status as you work: In Progress → Completed → Delivered. Keep the client updated throughout the process.'
        },
        {
            category: 'Providers',
            q: 'How do I get good reviews?',
            a: 'Deliver high-quality work on time, communicate clearly with clients, and exceed their expectations. Good reviews help you build a strong reputation.'
        },
        {
            category: 'Technical',
            q: 'What technologies are used?',
            a: 'ServeHub is built with the MERN stack: MongoDB for database, Express.js for backend, React for frontend, and Node.js for runtime environment.'
        },
        {
            category: 'Technical',
            q: 'Is my data secure?',
            a: 'Yes! We use JWT authentication, password hashing with bcrypt, and industry-standard security practices to protect your data.'
        },
        {
            category: 'Technical',
            q: 'Can I access ServeHub on mobile?',
            a: 'Yes! ServeHub is fully responsive and works on all devices including smartphones, tablets, and desktops.'
        },
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="py-5">
            <Row className="mb-5 text-center">
                <Col lg={8} className="mx-auto">
                    <Badge bg="warning" className="mb-3 fs-6 px-3 py-2 text-dark">❓ FAQ</Badge>
                    <h1 className="display-4 fw-bold mb-3">Frequently Asked Questions</h1>
                    <p className="lead text-muted">
                        Find answers to common questions about ServeHub.
                    </p>
                </Col>
            </Row>

            {/* Search Bar */}
            <Row className="mb-4">
                <Col md={6} className="mx-auto">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-0">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            className="form-control border-0 py-2"
                            placeholder="Search FAQs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </Col>
            </Row>

            {/* FAQ Categories */}
            <Row>
                <Col lg={10} className="mx-auto">
                    {['General', 'Customers', 'Providers', 'Technical'].map(category => {
                        const categoryFaqs = filteredFaqs.filter(f => f.category === category);
                        if (categoryFaqs.length === 0) return null;

                        return (
                            <div key={category} className="mb-4">
                                <h4 className="fw-bold mb-3">
                                    <Badge bg="primary" className="fs-6 px-3 py-2">
                                        {category === 'General' ? '📌' :
                                         category === 'Customers' ? '👤' :
                                         category === 'Providers' ? '💼' : '⚙️'} {category}
                                    </Badge>
                                </h4>
                                <Accordion>
                                    {categoryFaqs.map((faq, index) => (
                                        <Accordion.Item eventKey={`${category}-${index}`} key={index}>
                                            <Accordion.Header className="fw-bold">
                                                <span className="me-2">{category === 'General' ? '📌' :
                                                                   category === 'Customers' ? '👤' :
                                                                   category === 'Providers' ? '💼' : '⚙️'}</span>
                                                {faq.q}
                                            </Accordion.Header>
                                            <Accordion.Body className="text-muted fs-6">
                                                {faq.a}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </div>
                        );
                    })}

                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-5">
                            <h3 className="text-muted">No results found</h3>
                            <p className="text-muted">Try adjusting your search terms</p>
                        </div>
                    )}
                </Col>
            </Row>

            {/* Still Need Help */}
            <Row className="mt-5">
                <Col lg={8} className="mx-auto text-center">
                    <Card className="border-0 shadow-sm bg-primary bg-opacity-10">
                        <Card.Body className="p-4">
                            <h4 className="fw-bold mb-3">🤔 Still have questions?</h4>
                            <p className="text-muted">
                                Can't find what you're looking for? We're here to help!
                            </p>
                            <a href="/contact" className="btn btn-primary px-4 py-2">
                                Contact Us
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Faq;