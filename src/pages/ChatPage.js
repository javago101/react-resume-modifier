import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chat from '../components/Chat';
import '../styles/chat-page.css';

const ChatPage = () => {
    const { user } = useAuth();

    // Redirect to sign in if not authenticated
    if (!user) {
        return <Navigate to="/signin" />;
    }

    return (
        <div className="page-container">
            <Header />
            <main className="chat-page-content">
                <div className="chat-section">
                    <h1>AI Resume Assistant</h1>
                    <p className="chat-description">
                        Chat with our AI assistant to get personalized advice on improving your resume.
                        Ask questions about formatting, content, or best practices.
                    </p>
                    <Chat />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ChatPage; 