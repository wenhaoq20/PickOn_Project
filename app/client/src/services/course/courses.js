import Papa from "papaparse";

/**
 * Fetches a list of courses that a user is enrolled in.
 * 
 * This function makes an API call to retrieve courses based on the provided user ID.
 * It uses Axios for making the HTTP request.
 * 
 * @param {Object} axios - The Axios instance to be used for the HTTP request.
 * @param {string} userId - The ID of the user whose course list is to be fetched.
 * @returns {Promise<Object>} The response object from the Axios request.
 * @throws Will throw an error if the HTTP request fails.
 */
export const getUserCourseList = async (axios, userId) => {
    try {
        const res = await axios.get("api/v1/get_enrolled_courses", {
            params: { id: userId },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

/**
 * Joins a user to a specified course.
 * 
 * This function sends a POST request to join a user to a course using the provided form data.
 * It uses an Axios instance to make the HTTP request.
 *
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {Object} formData - The form data containing information required to join a course.
 * @returns {Promise<Object>} The response object from the Axios request.
 * @throws Will throw an error if the HTTP request fails.
 */
export const joinCourse = async (axios, formData) => {
    try {
        const res = await axios.post("api/v1/join_course", formData);
        return res;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new course with the provided details.
 * 
 * This function sends a POST request to create a new course using the provided form data.
 * It uses an Axios instance to make the HTTP request.
 *
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {Object} formData - The form data containing information required to create a course.
 * @returns {Promise<Object>} The response object from the Axios request, typically containing details of the created course.
 * @throws Will throw an error if the HTTP request fails.
 */
export const createCourse = async (axios, formData) => {
    try {
        const res = await axios.post("api/v1/create_course", formData);
        return res;
    } catch (error) {
        throw error;
    }
};

/**
 * Uploads a course roster from a file.
 * 
 * This function uses Papa Parse to parse a provided file (typically a CSV) for course roster data.
 * After parsing, it sends a POST request to upload the parsed roster along with course information.
 * 
 * @param {Object} axios - The Axios instance used for making HTTP requests.
 * @param {File} file - The file containing the course roster data.
 * @param {Object} courseInfo - Additional information about the course (like course ID, etc.).
 * @returns {Promise<Object>} A promise that resolves to the response from the server if the upload is successful, or rejects with an error if it fails.
 */
export const uploadCourseRoster = async (axios, file, courseInfo) => {
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

/**
 * Retrieves the roster of a specific course.
 * 
 * This function sends a GET request to obtain the course roster based on the provided course details.
 * It uses an Axios instance to make the HTTP request and expects specific parameters about the course.
 * 
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {Object} courseDetails - An object containing the details of the course.
 * @returns {Promise<Array>} A promise that resolves to an array containing the course roster.
 * @throws Will throw an error if the HTTP request fails.
 */
export const getCourseRoster = async (axios, { courseCRN, courseYear, courseSemester }) => {
    try {
        const res = await axios.get("api/v1/get_course_roster", {
            params: { courseCRN, courseYear, courseSemester },
        });
        return res.data.roster;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates the details of an existing course.
 * 
 * This function sends a PUT request to update a course using the provided form data.
 * It uses an Axios instance to make the HTTP request and requires the course ID and updated data.
 * 
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {Object} courseData - An object containing the data for updating the course.
 * @returns {Promise<Object>} The response object from the Axios request.
 * @throws Will throw an error if the HTTP request fails.
 */
export const updateCourse = async (axios, { courseId, formData }) => {
    try {
        const res = await axios.put("api/v1/update_course", { courseId, formData });
        return res;
    } catch (error) {
        throw error;
    }
};

/**
 * Removes a specific course from a user's enrollment or course list.
 * 
 * This function sends a DELETE request to remove a course associated with a specific user.
 * It uses an Axios instance for the HTTP request and requires the user's ID and the course ID as parameters.
 * 
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {Object} courseData - An object containing the identifiers required for course removal
 * @returns {Promise<Object>} The response object from the Axios request, typically indicating the success of the operation.
 * @throws Will throw an error if the HTTP request fails.
 */
export const removeCourse = async (axios, { userId, courseId }) => {
    try {
        const res = await axios.delete("api/v1/remove_course", { params: { userId, courseId } });
        return res;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves detailed information about a specific course.
 * 
 * This function sends a GET request to obtain detailed information about a course identified by the provided course ID.
 * It uses an Axios instance for the HTTP request.
 * 
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {string} courseId - The unique identifier of the course for which information is requested.
 * @returns {Promise<Object>} The response object from the Axios request, typically containing detailed course information.
 * @throws Will throw an error if the HTTP request fails.
 */
export const getCourseInfo = async (axios, courseId) => {
    try {
        const res = await axios.get("api/v1/get_course_info", {
            params: { courseId },
        });
        return res;
    } catch (error) {
        throw error;
    }
}
/**
 * Removes a student from a specific course.
 * 
 * This function sends a DELETE request to remove a student identified by their UH ID from a specified course.
 * It requires detailed course information along with the student's and user's IDs.
 * The function uses an Axios instance for the HTTP request.
 * 
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {Object} studentData - An object containing the identifiers and course information required for removing a student.           
 * @returns {Promise<Object>} The response object from the Axios request, typically indicating the success of the operation.
 * @throws Will throw an error if the HTTP request fails.
 */
export const removeStudent = async (axios, { uhId, userId, courseInfo }) => {
    const { courseCRN, courseYear, courseSemester } = courseInfo;
    try {
        const res = await axios.delete("api/v1/remove_student", { params: { uhId, userId, courseCRN, courseYear, courseSemester } });
        return res;
    } catch (error) {
        throw error;
    }
}

/**
 * Adds a new student to a specific course.
 * 
 * This function sends a POST request to add a student to a course. It uses formData for student details 
 * and courseInfo for course-specific information. The function uses an Axios instance for the HTTP request.
 * 
 * @param {Object} axios - The Axios instance used for making the HTTP request.
 * @param {Object} formData - An object containing the details of the student to be added.
 * @param {Object} courseInfo - An object containing detailed information about the course.
 * @returns {Promise<Object>} The response object from the Axios request, typically containing details of the added student.
 * @throws Will throw an error if the HTTP request fails.
 */
export const addStudent = async (axios, formData, courseInfo) => {
    const { courseCRN, courseYear, courseSemester } = courseInfo;
    const { firstName, lastName, middleName, uhId, email, userId } = formData;
    try {
        const res = await axios.post("api/v1/add_student", { firstName, lastName, middleName, uhId, email, userId, courseCRN, courseYear, courseSemester });
        return res;
    } catch (error) {
        throw error;
    }
}

export const editStudent = async (axios, newData, oldData, courseInfo) => {
    const { courseCRN, courseYear, courseSemester } = courseInfo;
    try {
        const res = await axios.put("api/v1/edit_student", { newData, oldData, courseCRN, courseYear, courseSemester });
        return res;
    } catch (error) {
        throw error;
    }
};