import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/auth-pages.css';

const SignUpPage = () => {
    const navigate = useNavigate();
    const { signUp, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setValidationError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        try {
            await signUp(formData.name, formData.email, formData.password);
            navigate('/');
        } catch (err) {
            console.error('Sign up failed:', err);
        }
    };

    return (
        <div className="page-container">
            <Header />
            <main className="auth-container">
                <div className="auth-form-container">
                    <h1>Sign Up</h1>
                    {error && <div className="auth-error">{error}</div>}
                    {validationError && <div className="auth-error">{validationError}</div>}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={6}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={6}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="auth-redirect">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SignUpPage; 