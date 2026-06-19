import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    🚀 Welcome to ServeHub
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Connect with trusted service providers
                </p>
                <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                    Find professionals for web development, graphic design, 
                    content writing, digital marketing, and more!
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/services"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition"
                    >
                        Browse Services
                    </Link>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">🔐</div>
                        <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
                        <p className="text-gray-600">JWT-based login with role-based access</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">💼</div>
                        <h3 className="text-xl font-semibold mb-2">Expert Providers</h3>
                        <p className="text-gray-600">Find skilled professionals for your projects</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">⭐</div>
                        <h3 className="text-xl font-semibold mb-2">Trusted Reviews</h3>
                        <p className="text-gray-600">Read reviews and ratings from real customers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;