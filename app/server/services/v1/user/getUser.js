const express = require('express');
const userGetter = express.Router();
const User = require('../../../models/User');

userGetter.get('/full_name', async (req, res) => {
    const { id } = req.query;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).send("User not found.");
        }
        res.json({ success: true, firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user info.");
    }
});

userGetter.get('/uhId', async (req, res) => {
    const { id } = req.query;
    try {
        const user = await User.findById(id).select('uhId');
        if (!user) {
            return res.status(400).send("User not found.");
        }
        res.json({ success: true, uhId: user.uhId });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user info.");
    }
});

module.exports = userGetter;
