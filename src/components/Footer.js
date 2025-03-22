import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;