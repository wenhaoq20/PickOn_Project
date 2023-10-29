if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./userAuth');
const userInfo = require('./userInfo');
const courseInfo = require('./courseInfo');
const http = require("http");
const setupSocketIO = require('./socket');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
setupSocketIO(server);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

app.use(authRoutes);
app.use(userInfo);
app.use(courseInfo);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
