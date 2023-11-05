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
};

export const uploadCourseRoster = async (file, courseInfo) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            skipEmptyLines: "greedy",
            complete: (results) => {
                const roster = results.data.slice(5);
                axios.post("/upload_course_roster", { roster: roster, courseInfo: courseInfo })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            },
            error: (error) => {
                reject(error);
            },
        });
    });
};