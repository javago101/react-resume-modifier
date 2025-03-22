import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signIn = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            // TODO: Replace with actual API call
            const mockUser = { id: 1, name: 'Demo User', email };
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (name, email, password) => {
        try {
            setLoading(true);
            setError(null);
            // TODO: Replace with actual API call
            const mockUser = { id: 1, name, email };
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Auto sign in demo user on mount
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Create a demo user automatically
            const demoUser = { id: 1, name: 'Demo User', email: 'demo@example.com' };
            setUser(demoUser);
            localStorage.setItem('user', JSON.stringify(demoUser));
        }
    }, []);

    const value = {
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext; 