if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userAuth = require('./services/v1/user/authUser');
const userGetter = require('./services/v1/user/getUser');
const courseGetter = require('./services/v1/course/getCourse');
const courseSetter = require('./services/v1/course/setCourse');
const http = require("http");
const setupSocketIO = require('./socket');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
setupSocketIO(server);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use('/api/v1', userAuth);
app.use('/api/v1', verifyToken, userGetter);
app.use('/api/v1', verifyToken, courseGetter);
app.use('/api/v1', verifyToken, courseSetter);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
