import React from 'react';
import '../styles/resume-analysis.css';

const ResumeAnalysis = ({ analysis }) => {
    if (!analysis) return null;

    const { sections, overallScore, keyImprovements } = analysis;

    return (
        <div className="resume-analysis">
            <div className="analysis-header">
                <h2>Resume Analysis</h2>
                <div className="overall-score">
                    <span className="score-label">Overall Score</span>
                    <div className="score-circle">
                        {overallScore}
                    </div>
                </div>
            </div>

            <div className="key-improvements">
                <h3>Key Improvements</h3>
                <ul>
                    {keyImprovements.map((improvement, index) => (
                        <li key={index}>{improvement}</li>
                    ))}
                </ul>
            </div>

            <div className="section-analysis">
                {Object.entries(sections).map(([sectionName, sectionData]) => (
                    <div key={sectionName} className="section-card">
                        <div className="section-header">
                            <h3>{sectionName}</h3>
                            <span className={`priority-badge ${sectionData.priority.toLowerCase()}`}>
                                {sectionData.priority} Priority
                            </span>
                            <span className="section-score">{sectionData.score}/100</span>
                        </div>
                        <ul className="suggestions-list">
                            {sectionData.suggestions.map((suggestion, index) => (
                                <li key={index} className="suggestion-item">
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResumeAnalysis; 