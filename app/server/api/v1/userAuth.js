const express = require('express');
const auth = express.Router();
const User = require('../../models/User');
const Course = require('../../models/Course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

auth.post('/register', async (req, res) => {
    const { email, password, firstname, lastname, uhid } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send("User already exists!");

        const user = new User({ email, password, firstname, lastname, uhid });
        await user.save();

        const courseList = await Course.find({ courseRoster: { $elemMatch: { uhid: uhid } } });
        const saveCoursePromises = courseList.map(async (course) => {
            course.enrolledUsers.push(user._id);
            await course.save();
            user.enrolledCourses.push(course._id);
        });

        await Promise.all(saveCoursePromises);
        await user.save();
        res.status(200).send("Registered successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user.");
    }
});

auth.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send("User not found.");
        }
        // Compare given password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid password.");
        }

        const payload = {
            id: user._id,
            name: user.firstname + " " + user.lastname,
            email: user.email,
            role: user.accountType
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token: 'Bearer ' + token,
            role: user.accountType,
            id: user._id,
            name: user.firstname + " " + user.lastname
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error logging in.");
    }
});

module.exports = auth;
