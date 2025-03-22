import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/floating-chat-button.css';

const FloatingChatButton = () => {
    const navigate = useNavigate();

    return (
        <button 
            className="floating-chat-button"
            onClick={() => navigate('/chat')}
            aria-label="Open AI Chat"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="chat-icon"
            >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
            <span>Chat with AI</span>
        </button>
    );
};

export default FloatingChatButton; 