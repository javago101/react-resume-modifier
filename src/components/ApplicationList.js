import React, { useState } from 'react';
import { ApplicationStatus, InterviewType } from '../types/types.js';
import '../styles/application-list.css';

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [showNewForm, setShowNewForm] = useState(false);
    const [newApplication, setNewApplication] = useState({
        company: '',
        position: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement API call to save application
        const application = {
            id: Date.now().toString(),
            ...newApplication,
            status: ApplicationStatus.DRAFT,
            applicationDate: new Date(),
            interviews: []
        };
        setApplications([application, ...applications]);
        setShowNewForm(false);
        setNewApplication({ company: '', position: '', notes: '' });
    };

    const handleStatusChange = (applicationId, newStatus) => {
        setApplications(applications.map(app => 
            app.id === applicationId ? { ...app, status: newStatus } : app
        ));
    };

    const handleAddInterview = (applicationId, interviewType) => {
        setApplications(applications.map(app => {
            if (app.id === applicationId) {
                return {
                    ...app,
                    interviews: [...app.interviews, {
                        id: Date.now().toString(),
                        applicationId,
                        type: interviewType,
                        date: new Date(),
                        status: 'SCHEDULED'
                    }]
                };
            }
            return app;
        }));
    };

    return (
        <div className="applications-container">
            <div className="applications-header">
                <h2>Job Applications</h2>
                <button 
                    className="new-application-button"
                    onClick={() => setShowNewForm(true)}
                >
                    New Application
                </button>
            </div>

            {showNewForm && (
                <form className="new-application-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <input
                            type="text"
                            id="company"
                            value={newApplication.company}
                            onChange={(e) => setNewApplication({
                                ...newApplication,
                                company: e.target.value
                            })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Position</label>
                        <input
                            type="text"
                            id="position"
                            value={newApplication.position}
                            onChange={(e) => setNewApplication({
                                ...newApplication,
                                position: e.target.value
                            })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            value={newApplication.notes}
                            onChange={(e) => setNewApplication({
                                ...newApplication,
                                notes: e.target.value
                            })}
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit">Save</button>
                        <button 
                            type="button" 
                            onClick={() => setShowNewForm(false)}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="applications-list">
                {applications.length === 0 ? (
                    <p className="no-applications">No applications yet. Create one to get started!</p>
                ) : (
                    applications.map(application => (
                        <div key={application.id} className="application-card">
                            <div className="application-header">
                                <h3>{application.company}</h3>
                                <span className={`status-badge ${application.status.toLowerCase()}`}>
                                    {application.status}
                                </span>
                            </div>
                            <p className="position">{application.position}</p>
                            <p className="application-date">
                                Applied: {application.applicationDate.toLocaleDateString()}
                            </p>
                            {application.notes && (
                                <p className="notes">{application.notes}</p>
                            )}
                            <div className="application-actions">
                                <select
                                    value={application.status}
                                    onChange={(e) => handleStatusChange(application.id, e.target.value)}
                                >
                                    {Object.values(ApplicationStatus).map(status => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleAddInterview(
                                        application.id,
                                        InterviewType.PHONE_SCREEN
                                    )}
                                >
                                    Add Interview
                                </button>
                            </div>
                            {application.interviews.length > 0 && (
                                <div className="interviews-list">
                                    <h4>Interviews</h4>
                                    {application.interviews.map(interview => (
                                        <div key={interview.id} className="interview-item">
                                            <span>{interview.type}</span>
                                            <span>{interview.date.toLocaleDateString()}</span>
                                            <span className={`interview-status ${interview.status.toLowerCase()}`}>
                                                {interview.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ApplicationList; 