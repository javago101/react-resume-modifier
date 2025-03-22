import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/upload">Upload Resume</Link></li>
                <li><Link to="/modify">Modify Resume</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
};

export default NavigationMenu;