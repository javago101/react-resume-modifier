import React, { useState, useEffect } from 'react';
import resumeService from '../services/resumeService';
import '../styles/ResumeEditor.css';

const ResumeEditor = ({ resumeId }) => {
    const [resumeData, setResumeData] = useState(null);
    const [suggestions, setSuggestions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        loadResumeData();
    }, [resumeId]);

    const loadResumeData = async () => {
        try {
            setLoading(true);
            const data = await resumeService.analyzeResume(resumeId);
            setResumeData(data);
        } catch (err) {
            setError('Failed to load resume data');
        } finally {
            setLoading(false);
        }
    };

    const handleSectionClick = async (section) => {
        setActiveSection(section);
        if (!suggestions[section]) {
            try {
                setIsAnalyzing(true);
                const sectionSuggestions = await resumeService.getSuggestions(resumeId, section);
                setSuggestions(prev => ({
                    ...prev,
                    [section]: sectionSuggestions
                }));
            } catch (err) {
                setError(`Failed to get suggestions for ${section}`);
            } finally {
                setIsAnalyzing(false);
            }
        }
    };

    const handleApplySuggestion = async (section, suggestion) => {
        try {
            const updatedResume = await resumeService.applyRefinements(resumeId, {
                section,
                refinements: [suggestion]
            });
            setResumeData(updatedResume);
        } catch (err) {
            setError('Failed to apply suggestion');
        }
    };

    const handleImproveEntireResume = async () => {
        try {
            setLoading(true);
            const improvedResume = await resumeService.generateImprovedVersion(resumeId);
            setResumeData(improvedResume);
        } catch (err) {
            setError('Failed to improve resume');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (format) => {
        try {
            const blob = await resumeService.downloadResume(resumeId, format);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resume.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setError('Failed to download resume');
        }
    };

    if (loading) {
        return <div className="loading">Loading resume...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="resume-editor">
            <div className="editor-header">
                <h2>Resume Editor</h2>
                <div className="editor-actions">
                    <button onClick={handleImproveEntireResume}>
                        Improve Entire Resume
                    </button>
                    <button onClick={() => handleDownload('pdf')}>
                        Download PDF
                    </button>
                    <button onClick={() => handleDownload('docx')}>
                        Download DOCX
                    </button>
                </div>
            </div>

            <div className="editor-content">
                <div className="resume-sections">
                    {resumeData && Object.entries(resumeData).map(([section, content]) => (
                        <div 
                            key={section}
                            className={`resume-section ${activeSection === section ? 'active' : ''}`}
                        >
                            <h3 onClick={() => handleSectionClick(section)}>
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </h3>
                            <div className="section-content">
                                {Array.isArray(content) ? (
                                    content.map((item, index) => (
                                        <div key={index} className="content-item">
                                            {item}
                                        </div>
                                    ))
                                ) : (
                                    <div className="content-item">{content}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="suggestions-panel">
                    {activeSection && (
                        <>
                            <h3>AI Suggestions for {activeSection}</h3>
                            {isAnalyzing ? (
                                <div className="analyzing">
                                    Analyzing section...
                                </div>
                            ) : suggestions[activeSection] ? (
                                <div className="suggestions-list">
                                    {suggestions[activeSection].map((suggestion, index) => (
                                        <div key={index} className="suggestion-item">
                                            <p>{suggestion.text}</p>
                                            <button 
                                                onClick={() => handleApplySuggestion(activeSection, suggestion)}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-suggestions">
                                    No suggestions available for this section
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor; 