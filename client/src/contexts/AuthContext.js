import React, { createContext, useContext, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (credentials) => {
        try {
            // Call your authentication API endpoint (adjust the function based on your actual API)
            const response = await authService.login(credentials);

            // Check if the authentication was successful
            if (response.ok) {
                setIsLoggedIn(true);
                // You can also store additional user data if needed
                // e.g., setUser(response.user);
                return true; // Indicate successful login
            } else {
                return false; // Indicate failed login
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false; // Indicate failed login
        }
    }

    const logout = () => {
        // Perform your logout logic here
        // Set isLoggedIn to false
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
        if (!context) {
            throw new Error('useAuth must be used within an AuthProvider');
        }
    return context;
};
