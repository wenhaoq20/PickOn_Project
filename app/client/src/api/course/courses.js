import axios from "../axios";
import Papa from "papaparse";

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

export const createCourse = async (formData) => {
    try {
        const res = await axios.post("/create_course", formData);
        return res;
    } catch (error) {
        throw error;
    }
}

export const uploadCourseRoster = async (file) => {
    Papa.parse(file, {
        skipEmptyLines: "greedy",
        complete: async (results) => {
            console.log(results);
            const res = await axios.post("/upload_course_roster", results.data);
            return res;
        },
        error: (error) => {
            throw error;
        },
    });
}