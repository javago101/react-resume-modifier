import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResumeUploadForm from '../components/ResumeUploadForm';
import FloatingChatButton from '../components/FloatingChatButton';
import '../styles/upload-page.css';

const ResumeUploadPage = () => {
    const { user } = useAuth();

    return (
        <div className="page-container">
            <Header />
            <main className="upload-content">
                <div className="upload-section">
                    <h1>Upload Your Resume</h1>
                    <ResumeUploadForm />
                </div>
            </main>
            {user && <FloatingChatButton />}
            <Footer />
        </div>
    );
};

export default ResumeUploadPage;