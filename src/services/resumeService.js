import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class ResumeService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async uploadResume(file) {
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await this.apiClient.post('/api/resume/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async analyzeResume(resumeId) {
        try {
            const response = await this.apiClient.post(`/api/resume/${resumeId}/analyze`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getSuggestions(resumeId, section) {
        try {
            const response = await this.apiClient.get(`/api/resume/${resumeId}/suggestions`, {
                params: { section },
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async applyRefinements(resumeId, refinements) {
        try {
            const response = await this.apiClient.post(`/api/resume/${resumeId}/refine`, {
                refinements,
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async generateImprovedVersion(resumeId, options = {}) {
        try {
            const response = await this.apiClient.post(`/api/resume/${resumeId}/improve`, options);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async downloadResume(resumeId, format = 'pdf') {
        try {
            const response = await this.apiClient.get(`/api/resume/${resumeId}/download`, {
                params: { format },
                responseType: 'blob',
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            // Server responded with error
            return new Error(error.response.data.message || 'Server error occurred');
        } else if (error.request) {
            // Request made but no response
            return new Error('No response from server');
        } else {
            // Error in request setup
            return new Error('Error setting up request');
        }
    }
}

export default new ResumeService(); 