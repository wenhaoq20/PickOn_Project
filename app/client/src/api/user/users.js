import axios from "../axios";

export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(
            "/login",
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

export const userRegister = async (formData) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/register",
            formData
        );
        return response;
    } catch (error) {
        console.error("Register error:", error);
        throw error
    }

}