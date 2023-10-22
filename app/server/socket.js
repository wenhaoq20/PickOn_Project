const { Server } = require("socket.io");

const onlineUsers = {};

function setupSocketIO(server) {
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

    return io;
}

module.exports = setupSocketIO;
