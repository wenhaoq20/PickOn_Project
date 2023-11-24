/**
 * Authenticates a user based on their email and password.
 * 
 * This function sends a POST request to the server to authenticate a user. The user's email and password
 * are sent in the request body. It uses an Axios instance for the HTTP request and sets the appropriate
 * content type in the headers.
 * 
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {string} email - The email address of the user attempting to log in.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The response object from the Axios request, typically containing user authentication details.
 * @throws Will throw an error if the authentication request fails.
 */
export const userLogin = async (axios, email, password) => {
    try {
        const response = await axios.post(
            "api/v1/login",
            {
                email,
                password,
            },
            {
                headers: { "Content-type": "application/json" },
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Registers a new user with the provided details.
 * 
 * This function sends a POST request to the server to register a new user. The user's details
 * are sent in the request body as formData. It uses an Axios instance for the HTTP request.
 * 
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {Object} formData - An object containing the registration details of the user. 
 * @returns {Promise<Object>} The response object from the Axios request, typically containing registration confirmation or user details.
 * @throws Will throw an error if the registration request fails, logging the error to the console.
 */
export const userRegister = async (axios, formData) => {
    try {
        const response = await axios.post(
            "api/v1/register",
            formData
        );
        return response;
    } catch (error) {
        console.error("Register error:", error);
        throw error
    }
};