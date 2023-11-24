const express = require('express');
const courseSetter = express.Router();
const Course = require('../../../models/Course');
const User = require('../../../models/User');

/**
 * Route allowing a user to join a specific course.
 * 
 * @path {POST} /join_course
 * @body {String} userId The unique identifier of the user.
 * @body {String} courseCode The code of the course.
 * @body {String} courseSection The section of the course.
 * @body {String} courseCRN The Course Registration Number.
 * @body {String} courseSemester The semester of the course (e.g., 'Fall', 'Spring').
 * @body {String} courseYear The year of the course.
 * @response {String} message Success or error message.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
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

/**
 * Route for creating a new course.
 * 
 * @path {POST} /create_course
 * @body {String} courseCode The code of the course.
 * @body {String} courseSection The section of the course.
 * @body {String} courseCRN The Course Registration Number.
 * @body {String} courseName The name of the course.
 * @body {String} courseSemester The semester of the course (e.g., 'Fall', 'Spring').
 * @body {String} courseYear The year of the course.
 * @body {String} instructor The name of the course instructor.
 * @body {String} description The description of the course.
 * @body {String} userId The unique identifier of the user creating the course.
 * @body {String} startTime The start time of the course.
 * @body {String} endTime The end time of the course.
 * @response {String} message Success or error message.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
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

/**
 * Route for uploading a course roster.
 * 
 * @path {POST} /upload_course_roster
 * @body {Object} courseInfo Contains courseCRN, courseSemester, and courseYear to identify the course.
 * @body {Array} roster An array of student information to be added to the course roster.
 * @response {String} message Success or error message.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
courseSetter.post('/upload_course_roster', async (req, res) => {
    const { courseCRN, courseSemester, courseYear } = req.body.courseInfo;
    try {
        const course = await Course.findOne({ courseCRN, courseSemester, courseYear });
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        const roster = req.body.roster.map((student) => {
            const lastName = student[1].split(',')[0];
            const firstpart = student[1].split(',')[1];
            const firstName = firstpart.split(' ')[1];
            const middleName = firstpart.split(' ').slice(2).join(' ');
            return { uhId: student[0], firstName: firstName, lastName: lastName, middleName: middleName, email: student[4] };
        });
        course.courseRoster = roster;

        const studentList = await User.find({ uhId: { $in: roster.map((student) => student.uhId) } });
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

/**
 * Route for updating a course's details.
 * 
 * @path {PUT} /update_course
 * @body {String} courseId The unique identifier of the course to be updated.
 * @body {Object} formData The updated course details.
 * @response {String} message Success or error message.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
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

/**
 * Route for removing a course.
 * 
 * @path {DELETE} /remove_course
 * @query {String} userId The unique identifier of the instructor or user.
 * @query {String} courseId The unique identifier of the course to be removed.
 * @response {String} message Success or error message.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
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

/**
 * Route for removing a student from a course roster.
 * 
 * @path {DELETE} /remove_student
 * @query {String} uhId The University ID of the student.
 * @query {String} userId The unique identifier of the instructor or user.
 * @query {String} courseCRN The Course Registration Number.
 * @query {String} courseYear The year of the course.
 * @query {String} courseSemester The semester of the course.
 * @response {String} message Success or error message.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
courseSetter.delete('/remove_student', async (req, res) => {
    const { uhId, userId, courseCRN, courseYear, courseSemester } = req.query;
    try {
        const course = await Course.findOne({ courseCRN, courseYear, courseSemester });
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        if (!course.instructorId.equals(userId)) {
            return res.status(401).send("User is not authorized to delete this student!");
        }

        const studentInRoster = course.courseRoster.some(s => s.uhId === uhId);
        if (!studentInRoster) {
            return res.status(400).send("Student not found in course roster.");
        }
        const student = await User.findOne({ uhId: uhId });
        if (student !== null) {
            student.enrolledCourses.pull(course._id);
            await student.save();
        }

        await Course.updateOne(
            { _id: course._id },
            { $pull: { courseRoster: { uhId: uhId } } }
        );

        return res.status(200).send("Student removed from course roster.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error removing student.");
    }
});

/**
 * Route for adding a student to a course roster.
 * 
 * @path {POST} /add_student
 * @body {Object} studentDetails The details of the student to be added.
 * @response {String} message Success or error message.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
courseSetter.post('/add_student', async (req, res) => {
    const { courseCRN, courseYear, courseSemester, uhId, userId, email, firstName, lastName, middleName } = req.body;
    try {
        const course = await Course.findOne({ courseCRN, courseYear, courseSemester });
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        if (!course.instructorId.equals(userId)) {
            return res.status(401).send("User is not authorized to add students to this course!");
        }

        const studentInRoster = course.courseRoster.some(s => s.uhId === uhId);
        if (studentInRoster) {
            return res.status(400).send("Student already in course roster.");
        }

        const student = await Student.findOne({ uhId: uhId });
        if (student !== null) {
            student.enrolledCourses.push(course._id);
            await student.save();
        }

        course.courseRoster.push({ uhId, firstName, lastName, middleName, email });
        await course.save();
        res.status(200).send("Successfully added student.");
    } catch (error) {
        res.status(500).send("Error adding student.");
    }
});

/**
 * Route for editing a student in a course roster.
 * 
 * @path {PUT} /edit_student
 * @body {Object} newData The updated student details.
 * @body {Object} oldData The old student details.
 * @body {String} courseCRN The Course Registration Number.
 * @body {String} courseYear The year of the course.
 * @body {String} courseSemester The semester of the course.
 * @response {String} message Success or error message.
 * @response {Number} status HTTP status code of the response.
 * @error {String} message Error message in case of failure.
 */
courseSetter.put('/edit_student', async (req, res) => {
    const { newData, oldData, courseCRN, courseYear, courseSemester } = req.body;
    try {
        const course = await Course.findOne({ courseCRN, courseYear, courseSemester });
        if (!course) {
            return res.status(400).send("Course not found.");
        }
        const studentInRoster = course.courseRoster.some(s => s.uhId === oldData.uhId);
        if (!studentInRoster) {
            return res.status(400).send("Student not found in course roster.");
        }
        if (newData.uhId !== oldData.uhId) {
            const studentInRoster = course.courseRoster.some(s => s.uhId === newData.uhId);
            if (studentInRoster) {
                return res.status(400).send("The new UH ID is already in course roster.");
            }
        }
        await Course.updateOne(
            { _id: course._id, "courseRoster.uhId": oldData.uhId },
            { $set: { "courseRoster.$.uhId": newData.uhId, "courseRoster.$.firstName": newData.firstName, "courseRoster.$.lastName": newData.lastName, "courseRoster.$.middleName": newData.middleName, "courseRoster.$.email": newData.email } }
        );
        res.status(200).send("Successfully updated student.");
    } catch (error) {
        res.status(500).send("Error editing student.");
    }
});

module.exports = courseSetter;