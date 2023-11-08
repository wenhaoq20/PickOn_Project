import axios from "../axios";
import Papa from "papaparse";

export const getUserCourseList = async (userId) => {
    try {
        const res = await axios.get("api/v1/get_enrolled_courses", {
            params: { id: userId },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const joinCourse = async (formData) => {
    try {
        const res = await axios.post("api/v1/join_course", formData);
        return res;
    } catch (error) {
        throw error;
    }
};

export const createCourse = async (formData) => {
    try {
        const res = await axios.post("api/v1/create_course", formData);
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
                axios.post("api/v1/upload_course_roster", { roster: roster, courseInfo: courseInfo })
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

export const getCourseRoster = async ({ courseCRN, courseYear, courseSemester }) => {
    try {
        const res = await axios.get("api/v1/get_course_roster", {
            params: { courseCRN, courseYear, courseSemester },
        });
        return res.data.roster;
    } catch (error) {
        throw error;
    }
};