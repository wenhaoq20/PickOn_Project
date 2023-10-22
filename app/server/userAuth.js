const express = require('express');
const auth = express.Router();
const User = require('./models/User');
const bcrypt = require('bcryptjs');

auth.post('/register', async (req, res) => {
    const { email, password, firstname, lastname, uhid } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send("User already exists!");

        const user = new User({ email, password, firstname, lastname, uhid });
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
        res.json({ success: true, role: user.accountType, id: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error logging in.");
    }
});

module.exports = auth;
