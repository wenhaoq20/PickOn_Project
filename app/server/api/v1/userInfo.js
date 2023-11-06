const express = require('express');
const userInfo = express.Router();
const User = require('../../models/User');

userInfo.get('/full_name', async (req, res) => {
    const { id } = req.query;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).send("User not found.");
        }
        res.json({ success: true, firstname: user.firstname, lastname: user.lastname });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user info.");
    }
});

userInfo.get('/uhid', async (req, res) => {
    const { id } = req.query;
    try {
        const user = await User.findById(id).select('uhid');
        if (!user) {
            return res.status(400).send("User not found.");
        }
        res.json({ success: true, uhid: user.uhid });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user info.");
    }
});

module.exports = userInfo;
