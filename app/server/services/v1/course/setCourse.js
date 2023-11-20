const express = require('express');
const courseSetter = express.Router();
const Course = require('../../../models/Course');
const User = require('../../../models/User');

courseSetter.post('/join_course', async (req, res) => {
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

courseSetter.post('/create_course', async (req, res) => {
    const { courseCode, courseSection, courseCRN, courseName, courseSemester, courseYear, instructor, description, userId, startTime, endTime } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send("User not found.");
        }

        const course = new Course({ courseCode, courseSection, courseCRN, courseName, courseSemester, courseYear, instructor, instructorId: userId, description, startTime, endTime });
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

courseSetter.post('/upload_course_roster', async (req, res) => {
    const { courseCRN, courseSemester, courseYear } = req.body.courseInfo;
    try {
        const course = await Course.findOne({ courseCRN, courseSemester, courseYear });
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        const roster = req.body.roster.map((student) => {
            return { uhid: student[0], name: student[1], email: student[4] };
        });
        course.courseRoster = roster;

        const studentList = await User.find({ uhid: { $in: roster.map((student) => student.uhid) } });
        const saveStudentPromises = studentList.map(async (student) => {
            student.enrolledCourses.push(course._id);
            await student.save();
            course.enrolledUsers.push(student._id);
        });

        await Promise.all(saveStudentPromises);

        await course.save();
        res.status(200).send("Course roster uploaded.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading course roster.");
    }

});

courseSetter.put('/update_course', async (req, res) => {
    const { courseId, formData } = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        course.courseCode = formData.courseCode;
        course.courseSection = formData.courseSection;
        course.courseCRN = formData.courseCRN;
        course.courseName = formData.courseName;
        course.courseSemester = formData.courseSemester;
        course.courseYear = formData.courseYear;
        course.instructor = formData.instructor;
        course.description = formData.description;
        course.startTime = formData.startTime;
        course.endTime = formData.endTime;

        await course.save();
        res.status(200).send("Course updated.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating course.");
    }

});

courseSetter.delete('/remove_course', async (req, res) => {
    const { userId, courseId } = req.query;
    try {
        const instructor = await User.findById(userId);
        if (!instructor) {
            return res.status(400).send("Instructor not found.");
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        if (!course.instructorId.equals(userId)) {
            return res.status(401).send("User is not authorized to delete this course!");
        }

        const studentList = await User.find({ _id: { $in: course.enrolledUsers } });

        instructor.enrolledCourses.pull(courseId);
        await instructor.save();

        const removeStudentPromises = studentList.map(async (student) => {
            student.enrolledCourses.pull(courseId);
            await student.save();
        });

        await Promise.all(removeStudentPromises);
        await Course.deleteOne({ _id: courseId });
        res.status(200).send("Successfully removed course.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error removing course.");
    }
});

courseSetter.delete('/remove_student', async (req, res) => {
    const { studentUHId, userId, courseCRN, courseYear, courseSemester } = req.query;
    try {
        const course = await Course.findOne({ courseCRN, courseYear, courseSemester });
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        if (!course.instructorId.equals(userId)) {
            return res.status(401).send("User is not authorized to delete this student!");
        }

        const studentInRoster = course.courseRoster.some(s => s.uhid === studentUHId);
        if (!studentInRoster) {
            return res.status(400).send("Student not found in course roster.");
        }
        const student = await User.findOne({ uhid: studentUHId });
        student.enrolledCourses.pull(course._id);
        await student.save();

        await Course.updateOne(
            { _id: course._id },
            { $pull: { courseRoster: { uhid: studentUHId } } }
        );

        return res.status(200).send("Student removed from course roster.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error removing student.");
    }
});

module.exports = courseSetter;