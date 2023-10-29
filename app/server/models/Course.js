const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseSection: { type: String, required: true },
    courseCRN: { type: String, required: true, unique: true},
    courseName: { type: String, required: true },
    courseSemester: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Course', CourseSchema);