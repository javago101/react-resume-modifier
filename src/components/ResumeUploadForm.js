import React, { useState } from 'react';
import { analyzeResume } from '../services/aiService';
import ResumeAnalysis from './ResumeAnalysis';
import JobSearch from './JobSearch';
import '../styles/resume-upload-form.css';

const ResumeUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setAnalysis(null); // Reset analysis when new file is selected
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) return;

        setUploading(true);
        try {
            // Simulate file upload
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Get AI analysis
            const analysisResult = await analyzeResume(selectedFile);
            setAnalysis(analysisResult);
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error appropriately
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="resume-upload-container">
            <form onSubmit={handleSubmit} className="resume-upload-form">
                <div className="upload-area">
                    <input
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                    <label htmlFor="resume" className="upload-label">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <span>
                            {selectedFile ? selectedFile.name : 'Choose a file or drag it here'}
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="upload-button"
                    disabled={!selectedFile || uploading}
                >
                    {uploading ? 'Analyzing...' : 'Upload & Analyze'}
                </button>
            </form>

            {analysis && (
                <>
                    <ResumeAnalysis analysis={analysis} />
                    <JobSearch />
                </>
            )}
        </div>
    );
};

export default ResumeUploadForm;