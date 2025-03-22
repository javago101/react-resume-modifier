import React, { useState } from 'react';

const ResumeModificationForm = () => {
    const [resumeContent, setResumeContent] = useState('');

    const handleInputChange = (event) => {
        setResumeContent(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle resume modification logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={resumeContent}
                onChange={handleInputChange}
                placeholder="Paste your resume content here..."
                rows="10"
                cols="50"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ResumeModificationForm;