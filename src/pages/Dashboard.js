import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>Dashboard</h1>
                <p>Overview of your profile and resume statistics.</p>
                {/* Add dashboard content here */}
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;