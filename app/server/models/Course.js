const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseSection: { type: String, required: true },
    courseCRN: { type: String, required: true },
    courseName: { type: String, required: true },
    courseSemester: { type: String, required: true },
    courseYear: { type: Number, required: true },
    instructor: { type: String, required: true },
    instructorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    enrolledUsers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    courseRoster: [{ uhId: String, firstName: String, lastName: String, middleName: String, email: String }],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

CourseSchema.index({ courseCRN: 1, courseYear: 1, courseSemester: 1 }, { unique: true });

CourseSchema.index({ courseCode: 1, courseSection: 1, courseSemester: 1, courseYear: 1 }, { unique: true });

module.exports = mongoose.model('Course', CourseSchema);
