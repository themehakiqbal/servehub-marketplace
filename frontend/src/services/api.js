import axios from 'axios';

// Create axios instance
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to every request
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const register = (userData) => API.post('/auth/register', userData);
export const login = (email, password) => API.post('/auth/login', { email, password });

// Profile APIs
export const getProfile = (userId) => API.get(`/profile/${userId}`);
export const getAllProfiles = () => API.get('/profile');
export const updateProfile = (data) => API.put('/profile', data);

// Service APIs
export const createService = (data) => API.post('/services', data);
export const getAllServices = () => API.get('/services');
export const getService = (id) => API.get(`/services/${id}`);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);
export const getServicesByCategory = (category) => API.get(`/services/category/${category}`);

// Request APIs
export const submitRequest = (data) => API.post('/requests', data);
export const getCustomerRequests = () => API.get('/requests/customer');
export const getProviderRequests = () => API.get('/requests/provider');
export const getRequest = (id) => API.get(`/requests/${id}`);
export const updateRequestStatus = (id, status, message) => {
    return API.put(`/requests/${id}/status`, { status, message });
};
// Review APIs
export const createReview = (data) => API.post('/reviews', data);
export const getProviderReviews = (providerId) => API.get(`/reviews/provider/${providerId}`);
export const getMyReviews = () => API.get('/reviews/customer');

export default API;