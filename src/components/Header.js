import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthButtons from './AuthButtons';
import '../styles/header.css';

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo">
                    ResumeAI
                </Link>
                <nav className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/upload" className="nav-link">Upload</Link>
                    {user && (
                        <>
                            <Link to="/applications" className="nav-link">Applications</Link>
                            <Link to="/chat" className="nav-link">Chat</Link>
                        </>
                    )}
                    <AuthButtons />
                </nav>
            </div>
        </header>
    );
};

export default Header;