import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApplicationList from '../components/ApplicationList';
import ResumeHistory from '../components/ResumeHistory';
import '../styles/applications-page.css';

const ApplicationsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('applications');

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return (
        <div className="page-container">
            <Header />
            <main className="applications-content">
                <div className="applications-section">
                    <h1>My Applications</h1>
                    <div className="tab-buttons">
                        <button
                            className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('applications')}
                        >
                            Job Applications
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'resumes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('resumes')}
                        >
                            Resume History
                        </button>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'applications' ? (
                            <ApplicationList />
                        ) : (
                            <ResumeHistory />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ApplicationsPage; 