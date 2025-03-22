import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth-buttons.css';

const AuthButtons = () => {
    const { user, signOut } = useAuth();

    if (user) {
        return (
            <div className="auth-buttons">
                <Link to="/profile" className="auth-button profile">
                    {user.name}
                </Link>
                <button onClick={signOut} className="auth-button signout">
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <div className="auth-buttons">
            <Link to="/signin" className="auth-button signin">Sign In</Link>
            <Link to="/signup" className="auth-button signup">Sign Up</Link>
        </div>
    );
};

export default AuthButtons; 