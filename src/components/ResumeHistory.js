import React, { useState } from 'react';
import '../styles/resume-history.css';

const ResumeHistory = () => {
    const [resumes, setResumes] = useState([]);

    return (
        <div className="resume-history-container">
            <div className="resume-history-header">
                <h2>Resume History</h2>
            </div>

            <div className="resume-list">
                {resumes.length === 0 ? (
                    <p className="no-resumes">No resume versions yet. Upload a resume to get started!</p>
                ) : (
                    resumes.map(resume => (
                        <div key={resume.id} className="resume-card">
                            <div className="resume-info">
                                <h3>{resume.originalFileName}</h3>
                                <span className="version">Version {resume.version}</span>
                            </div>
                            <div className="resume-dates">
                                <p>Uploaded: {resume.uploadDate.toLocaleDateString()}</p>
                                <p>Last Modified: {resume.lastModified.toLocaleDateString()}</p>
                            </div>
                            <div className="modifications-list">
                                <h4>Modifications</h4>
                                {resume.modifications.map(mod => (
                                    <div key={mod.id} className="modification-item">
                                        <p className="modification-date">
                                            {mod.modificationDate.toLocaleDateString()}
                                        </p>
                                        <p className="modification-description">
                                            {mod.description}
                                        </p>
                                        {mod.aiSuggestions.length > 0 && (
                                            <div className="ai-suggestions">
                                                <h5>AI Suggestions:</h5>
                                                <ul>
                                                    {mod.aiSuggestions.map((suggestion, index) => (
                                                        <li key={index}>{suggestion}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="resume-actions">
                                <button className="download-button">
                                    Download Latest Version
                                </button>
                                <button className="view-button">
                                    View Changes
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ResumeHistory; 