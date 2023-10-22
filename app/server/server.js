if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./userAuth');
const userInfo = require('./userInfo');
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const onlineUsers = {};

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("join_session", ({ sessionId, username, isInstructor }) => {
        socket.join(sessionId);
        if (!onlineUsers[sessionId]) {
            onlineUsers[sessionId] = [];
        }
        if (!isInstructor && !onlineUsers[sessionId].includes(username)) {
            onlineUsers[sessionId].push(username);
        };
        socket.emit("send_online_users", onlineUsers[sessionId]);
        console.log(onlineUsers);
    });

    socket.on("leave_session", ({ sessionId, username }) => {
        socket.leave(sessionId);
        onlineUsers[sessionId].splice(onlineUsers[sessionId].indexOf(username), 1);
        socket.emit("send_online_users", onlineUsers[sessionId]);
        console.log(onlineUsers);
    });

    socket.on("select_mode", ({ mode, sessionId }) => {
        console.log(mode);
        console.log(sessionId);
        socket.to(sessionId).emit("receive_mode", mode);
    });

});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

app.use(authRoutes);
app.use(userInfo);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
