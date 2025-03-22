import axios from 'axios';

export const analyzeResume = async (resumeText) => {
    try {
        // TODO: Replace with actual API call
        // Simulating API response for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            sections: {
                summary: generateRecommendations('summary'),
                experience: generateRecommendations('experience'),
                skills: generateRecommendations('skills'),
                education: generateRecommendations('education'),
                formatting: generateRecommendations('formatting')
            },
            overallScore: calculateScore(),
            keyImprovements: generateKeyImprovements()
        };
    } catch (error) {
        console.error('Failed to analyze resume:', error);
        throw error;
    }
};

const generateRecommendations = (section) => {
    const recommendations = {
        summary: [
            'Make your professional summary more impactful by quantifying achievements',
            'Add a clear career objective that aligns with the target position',
            'Keep the summary concise, ideally 3-4 lines'
        ],
        experience: [
            'Use strong action verbs to begin each bullet point',
            'Include specific metrics and achievements for each role',
            'Focus on relevant experience for the target position'
        ],
        skills: [
            'Group skills by category (technical, soft skills, tools)',
            'Prioritize skills mentioned in the job description',
            'Remove outdated or irrelevant skills'
        ],
        education: [
            'List relevant coursework and academic projects',
            'Include GPA if it\'s above 3.5',
            'Add any relevant certifications or training'
        ],
        formatting: [
            'Ensure consistent font size and style throughout',
            'Use bullet points for better readability',
            'Maintain appropriate white space between sections'
        ]
    };

    return {
        suggestions: recommendations[section],
        priority: Math.random() > 0.5 ? 'high' : 'medium',
        score: Math.floor(Math.random() * 40) + 60
    };
};

const calculateScore = () => {
    return Math.floor(Math.random() * 40) + 60;
};

const generateKeyImprovements = () => {
    return [
        'Add more quantifiable achievements',
        'Improve formatting consistency',
        'Enhance skills section relevance'
    ];
}; 