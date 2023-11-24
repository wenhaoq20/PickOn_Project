import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

/**
 * Custom hook for axios instance.
 * 
 * @returns {Object} The axios instance
*/
const useAxios = () => {
    const navigator = useNavigate();
    const { authToken, logout } = useAuth();

    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000",
        headers: { Authorization: `Bearer ${authToken}` },
    });

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                // Token is invalid or expired
                logout();
                navigator('/login'); // Redirect to login page
                alert('Your session has expired. Please log in again.');
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxios;