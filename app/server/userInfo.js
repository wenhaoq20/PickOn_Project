const express = require('express');
const info = express.Router();
const User = require('./models/User');

info.get('/full_name', async (req, res) => {
    const { id } = req.query;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).send("User not found.");
        }
        console.log(user.firstname + " " + user.lastname);
        res.json({ success: true, firstname: user.firstname, lastname: user.lastname });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user info.");
    }
});

module.exports = info;
