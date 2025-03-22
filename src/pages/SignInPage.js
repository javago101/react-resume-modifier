import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/auth-pages.css';

const SignInPage = () => {
    const navigate = useNavigate();
    const { signIn, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(formData.email, formData.password);
            navigate('/upload');
        } catch (err) {
            console.error('Sign in failed:', err);
        }
    };

    const handleTryDemo = async () => {
        try {
            await signIn('demo@example.com', 'demo123');
            navigate('/chat');
        } catch (err) {
            console.error('Demo sign in failed:', err);
        }
    };

    return (
        <div className="page-container">
            <Header />
            <main className="auth-container">
                <div className="auth-form-container">
                    <h1>Sign In</h1>
                    {error && <div className="auth-error">{error}</div>}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
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
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="auth-options">
                        <button 
                            onClick={handleTryDemo}
                            className="demo-button"
                            disabled={loading}
                        >
                            Try Demo
                        </button>
                        <p className="auth-redirect">
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SignInPage; 