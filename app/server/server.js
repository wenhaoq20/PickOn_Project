if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const User = require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors()); // To handle requests from our React client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/loginApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Passport setup
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
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
        res.send("Logged in successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error logging in.");
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
