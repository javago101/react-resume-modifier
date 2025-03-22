import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChatButton from '../components/FloatingChatButton';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleGetStarted = () => {
        navigate('/upload');
    };

    return (
        <div className="landing-page">
            <Header />
            <main className="landing-content">
                <h1>Transform Your Resume with AI</h1>
                <p>
                    Upload your resume and let our AI-powered platform help you create a
                    professional, ATS-friendly resume that stands out to employers.
                    Get personalized suggestions and improvements in minutes.
                </p>
                <button className="get-started-button" onClick={handleGetStarted}>
                    Get Started
                </button>
            </main>
            {user && <FloatingChatButton />}
            <Footer />
        </div>
    );
};

export default LandingPage;