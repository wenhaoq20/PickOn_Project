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
        const courses = await Course.find({ _id: { $in: user.enrolledCourses } });
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting courses.");
    }
});

courseInfo.post('/join_course', async (req, res) => {
    const { userId, courseCode, courseSection, courseCRN, courseSemester, courseYear } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send("User not found.");
        }
        const course = await Course.findOne({ courseCRN, courseCode, courseSection, courseSemester, courseYear });
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        if (course.enrolledUsers.includes(userId)) {
            return res.status(400).send("User already enrolled in course.");
        }
        course.enrolledUsers.push(userId);
        user.enrolledCourses.push(course._id);
        await course.save();
        await user.save();
        res.status(200).send("Successfully join the course.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error joining course.");
    }

});

courseInfo.post('/create_course', async (req, res) => {
    const { courseCode, courseSection, courseCRN, courseName, courseSemester, courseYear, instructor, description, userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send("User not found.");
        }

        const course = new Course({ courseCode, courseSection, courseCRN, courseName, courseSemester, courseYear, instructor, description });
        course.enrolledUsers.push(userId);
        user.enrolledCourses.push(course._id);

        await course.save();
        await user.save();

        res.status(200).send("Successfully created course.");
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send("Course already exists.");
        }
        console.error('Error creating course:', error);
        res.status(500).send("Error creating course.");
    }
});


courseInfo.post('/upload_course_roster', async (req, res) => {
    try {
        const { courseCRN, courseSemester, courseYear } = req.body.courseInfo;
        const course = await Course.findOne({ courseCRN, courseSemester, courseYear });
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        const roster = req.body.roster.map((student) => {
            return { uhid: student[0], name: student[1], email: student[4] };
        });
        course.courseRoster = roster;
        await course.save();
        res.status(200).send("Course roster uploaded.");
    } catch (error) {
        res.status(500).send("Error uploading course roster.");
    }

});

courseInfo.get('/get_course_roster', async (req, res) => {
    const { courseCRN, courseSemester, courseYear } = req.query;
    const course = await Course.findOne({ courseCRN, courseSemester, courseYear });
    if (!course) {
        return res.status(400).send("Course not found.");
    }
    res.status(200).json({ roster: course.courseRoster });
});

module.exports = courseInfo;