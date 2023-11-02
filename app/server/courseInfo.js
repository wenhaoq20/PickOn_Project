const express = require('express');
const courseInfo = express.Router();
const Course = require('./models/Course');
const User = require('./models/User');

courseInfo.get('/get_enrolled_courses', async (req, res) => {
    const { id } = req.query;
    try {
        const user = await User.findById(id).select('enrolledCourses');
        if (!user) {
            return res.status(400).send("User not found.");
        }
        const courses = await Course.find({ courseCRN: { $in: user.enrolledCourses } });
        console.log(courses);
        res.json({ success: true, courses });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting courses.");
    }
});

module.exports = courseInfo;