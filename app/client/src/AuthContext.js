import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => localStorage.getItem('isAuthenticated') === 'true'
    );
    const [userRole, setUserRole] = useState(
        () => localStorage.getItem('userRole') || null
    );
    const [userId, setUserId] = useState(
        () => localStorage.getItem('userId') || null
    );

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('userId', userId);
    }, [userId]);

    useEffect(() => {
        localStorage.setItem('userRole', userRole);
    }, [userRole]);

    const login = (role, id) => {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserId(id);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
