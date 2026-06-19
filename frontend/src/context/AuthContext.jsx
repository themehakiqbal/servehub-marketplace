import React, { createContext, useState, useContext, useEffect } from 'react';
import { register as registerUser, login as loginUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const register = async (userData) => {
        try {
            const response = await registerUser(userData);
            const { token, ...userInfo } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userInfo));
            setUser(userInfo);
            return { success: true, data: userInfo };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await loginUser(email, password);
            const { token, ...userInfo } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userInfo));
            setUser(userInfo);
            return { success: true, data: userInfo };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};