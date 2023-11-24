const express = require('express');
const courseGetter = express.Router();
const Course = require('../../../models/Course');
const User = require('../../../models/User');

/**
 * Route serving the list of enrolled courses for a specific user.
 * 
 * @path {GET} /get_enrolled_courses
 * @query {String} id The unique identifier of the user.
 * @response {Object} The JSON response contains a success flag and an array of enrolled courses.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
courseGetter.get('/get_enrolled_courses', async (req, res) => {
    const { id } = req.query;
    try {
        const user = await User.findById(id).select('enrolledCourses');
        if (!user) {
            return res.status(400).send("User not found.");
        }
        const courses = await Course.find({ _id: { $in: user.enrolledCourses } });
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting courses.");
    }
});

/**
 * Route serving the roster of a specific course.
 * 
 * @path {GET} /get_course_roster
 * @query {String} courseCRN The Course Registration Number.
 * @query {String} courseSemester The semester of the course (e.g., 'Fall', 'Spring').
 * @query {String} courseYear The year of the course.
 * @response {Object} The JSON response containing the course roster.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
courseGetter.get('/get_course_roster', async (req, res) => {
    const { courseCRN, courseSemester, courseYear } = req.query;
    try {
        const course = await Course.findOne({ courseCRN, courseSemester, courseYear });
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        res.status(200).json({ roster: course.courseRoster });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting course roster.");
    }
});

/**
 * Route serving detailed information about a specific course.
 * 
 * @path {GET} /get_course_info
 * @query {String} courseId The unique identifier of the course.
 * @response {Object} The JSON response containing the detailed information of the course.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
courseGetter.get('/get_course_info', async (req, res) => {
    const { courseId } = req.query;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        res.status(200).json({ course });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting course info.");
    }
});

module.exports = courseGetter;