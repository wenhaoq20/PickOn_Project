if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./userAuth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Passport setup
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

app.use(authRoutes); // Using the imported auth routes

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
