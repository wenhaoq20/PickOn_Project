const express = require('express');
const courseGetter = express.Router();
const Course = require('../../../models/Course');
const User = require('../../../models/User');

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