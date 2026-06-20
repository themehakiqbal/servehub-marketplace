import React, { createContext, useState, useContext, useEffect } from 'react';
import { register as registerUser, login as loginUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const register = async (userData) => {
        try {
            console.log('📝 Sending registration request:', userData.email);
            const response = await registerUser(userData);
            console.log('✅ Registration response:', response.data);
            
            const { token, ...userInfo } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userInfo));
            setUser(userInfo);
            setError('');
            return { success: true, data: userInfo };
        } catch (error) {
            console.error('❌ Registration error details:', error);
            console.error('❌ Error response:', error.response?.data);
            console.error('❌ Error message:', error.message);
            
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            setError(message);
            return { success: false, message };
        }
    };

    const login = async (email, password) => {
        try {
            console.log('🔑 Sending login request:', email);
            const response = await loginUser(email, password);
            console.log('✅ Login response:', response.data);
            
            const { token, ...userInfo } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userInfo));
            setUser(userInfo);
            setError('');
            return { success: true, data: userInfo };
        } catch (error) {
            console.error('❌ Login error details:', error);
            console.error('❌ Error response:', error.response?.data);
            console.error('❌ Error message:', error.message);
            
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(message);
            return { success: false, message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setError('');
    };

    const clearError = () => setError('');

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            error, 
            register, 
            login, 
            logout, 
            clearError 
        }}>
            {children}
        </AuthContext.Provider>
    );
};