import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import CreateService from './pages/CreateService';
import Profile from './pages/Profile';
import MyServices from './pages/MyServices';
import MyRequests from './pages/MyRequests';
import Review from './pages/Review';
import RequestDetail from './pages/RequestDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import HowItWorks from './pages/HowItWorks';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({ children, roles }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
    return children;
};

function AppRoutes() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <ScrollToTop />
            <main style={{ minHeight: 'calc(100vh - 200px)' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/my-services" element={<PrivateRoute roles={['provider']}><MyServices /></PrivateRoute>} />
                    <Route path="/my-requests" element={<PrivateRoute><MyRequests /></PrivateRoute>} />
                    <Route path="/create-service" element={<PrivateRoute roles={['provider']}><CreateService /></PrivateRoute>} />
                    <Route path="/review/:requestId" element={<PrivateRoute><Review /></PrivateRoute>} />
                    <Route path="/requests/:id" element={<PrivateRoute><RequestDetail /></PrivateRoute>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <AppRoutes />
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;