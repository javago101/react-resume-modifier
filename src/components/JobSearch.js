import React, { useState } from 'react';
import { fetchJobs, formatSalary, formatDate } from '../services/jobSearchService';
import '../styles/job-search.css';

const JobSearch = () => {
    const [searchParams, setSearchParams] = useState({
        query: '',
        location: '',
        remote_only: false,
        min_salary: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await fetchJobs(searchParams);
            setMessage(response.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job-search">
            <h2>Find Relevant Jobs</h2>
            <form onSubmit={handleSubmit} className="job-search-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="query"
                        value={searchParams.query}
                        onChange={handleInputChange}
                        placeholder="Job title or keywords"
                        className="search-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="location"
                        value={searchParams.location}
                        onChange={handleInputChange}
                        placeholder="Location (optional)"
                        className="search-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="min_salary"
                        value={searchParams.min_salary}
                        onChange={handleInputChange}
                        placeholder="Minimum salary (optional)"
                        className="search-input"
                    />
                </div>
                <div className="form-group checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="remote_only"
                            checked={searchParams.remote_only}
                            onChange={handleInputChange}
                        />
                        Remote only
                    </label>
                </div>
                <button 
                    type="submit" 
                    className="search-button"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search Jobs'}
                </button>
            </form>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}
        </div>
    );
};

export default JobSearch; 