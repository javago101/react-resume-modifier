import React, { useState, useRef, useEffect } from 'react';
import '../styles/chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI resume assistant. How can I help you today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const aiResponse = {
                id: Date.now() + 1,
                text: "I'm a mock response. In the future, I'll provide real AI-powered resume advice!",
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Failed to get AI response:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'ai'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map(message => (
                    <div 
                        key={message.id} 
                        className={`message ${message.sender}`}
                    >
                        <div className="message-content">
                            {message.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message ai">
                        <div className="message-content typing">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat; 