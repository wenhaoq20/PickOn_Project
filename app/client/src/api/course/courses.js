import axios from "../axios";

export const getUserCourseList = async (userId) => {
    try {
        const res = await axios.get("/get_enrolled_courses", {
            params: { id: userId },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const joinCourse = async (formData) => {
    try {
        const res = await axios.post("/join_course", formData);
        return res;
    } catch (error) {
        throw error;
    }
};