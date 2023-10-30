import axios from "../axios";

export const getCourses = async (userId) => {
    try {
        const res = await axios.get("/get_enrolled_courses", {
            params: { id: userId },
        });
        return res;
    } catch (error) {
        throw error;
    }
};