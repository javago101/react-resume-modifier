import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResumeModificationForm from '../components/ResumeModificationForm';
import AISuggestionsModal from '../components/AISuggestionsModal';

const ResumeModificationPage = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>Modify Your Resume</h1>
                <ResumeModificationForm />
                <AISuggestionsModal />
            </main>
            <Footer />
        </div>
    );
};

export default ResumeModificationPage;