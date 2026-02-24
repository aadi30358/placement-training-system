import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initial state from localStorage if available
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('pts_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('pts_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pts_user');
    };

    const updateProfile = (profileData) => {
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
        localStorage.setItem('pts_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
