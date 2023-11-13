import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


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
    const [authToken, setAuthToken] = useState(
        () => localStorage.getItem('authToken') || null
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

    useEffect(() => {
        localStorage.setItem('authToken', authToken);
    }, [authToken]);

    const checkTokenExpiry = () => {
        const token = localStorage.getItem('authToken');
        if (token !== 'null') {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout();
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                logout();
            }
        }
    };

    useEffect(() => {
        checkTokenExpiry();
        // Setting up an interval to check token expiry periodically
        const interval = setInterval(() => {
            checkTokenExpiry();
        }, 15 * 60 * 1000); // Every 15 minutes

        return () => clearInterval(interval);
    }, []);

    const login = (role, id, name, token) => {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserId(id);
        setUserName(name);
        setAuthToken(token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setAuthToken(null);
        setUserRole(null);
        setUserId(null);
        setUserName(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, userRole, userId, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
