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
    const [userName, setUserName] = useState(
        () => localStorage.getItem('userName') || null
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
    useEffect(() => {
        localStorage.setItem('userName', userName);
    }, [userName]);


    const login = (role, id, name) => {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserId(id);
        setUserName(name);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null);
        setUserName(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, userId, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
