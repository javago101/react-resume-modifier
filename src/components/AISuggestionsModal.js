import React from 'react';

const AISuggestionsModal = () => {
    return (
        <div className="modal">
            <h2>AI Suggestions</h2>
            <p>Here are some AI-generated suggestions to improve your resume:</p>
            {/* Display AI suggestions here */}
            <button>Accept</button>
            <button>Reject</button>
        </div>
    );
};

export default AISuggestionsModal;