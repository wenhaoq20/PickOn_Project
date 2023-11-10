import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => sessionStorage.getItem('isAuthenticated') === 'true'
    );
    const [userRole, setUserRole] = useState(
        () => sessionStorage.getItem('userRole') || null
    );
    const [userId, setUserId] = useState(
        () => sessionStorage.getItem('userId') || null
    );
    const [userName, setUserName] = useState(
        () => sessionStorage.getItem('userName') || null
    );
    const [authToken, setAuthToken] = useState(
        () => sessionStorage.getItem('authToken') || null
    );

    useEffect(() => {
        sessionStorage.setItem('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        sessionStorage.setItem('userId', userId);
    }, [userId]);

    useEffect(() => {
        sessionStorage.setItem('userRole', userRole);
    }, [userRole]);
    useEffect(() => {
        sessionStorage.setItem('userName', userName);
    }, [userName]);

    useEffect(() => {
        sessionStorage.setItem('authToken', authToken);
    }, [authToken]);

    const checkTokenExpiry = () => {
        const token = sessionStorage.getItem('authToken');
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
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userName');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, userRole, userId, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
