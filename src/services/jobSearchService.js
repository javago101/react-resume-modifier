import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/jobs';

export const fetchJobs = async (params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}/fetch_jobs`, {
            params: {
                query: params.query || 'developer',
                location: params.location,
                max_pages: params.max_pages || 1,
                remote_only: params.remote_only,
                min_salary: params.min_salary,
                date_posted: params.date_posted
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

// Helper function to format salary range
export const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified';
    return salary.replace('USD', '').trim();
};

// Helper function to format date
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}; 