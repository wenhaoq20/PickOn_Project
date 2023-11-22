const { Server } = require("socket.io");

const onlineUsers = {};
const anonymousResponse = {};

/**
 * Setup SocketIO server.
 * 
 * @param {Object} server The HTTP server.
 * @returns {Object} The SocketIO server.
 */
const setupSocketIO = (server) => {
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
      }
      ;
      io.to(sessionId).emit("send_online_users", onlineUsers[sessionId]);
    });

    socket.on("leave_session", ({ sessionId, username }) => {
      socket.leave(sessionId);
      onlineUsers[sessionId].splice(onlineUsers[sessionId].indexOf(username), 1);
      socket.to(sessionId).emit("send_online_users", onlineUsers[sessionId]);
    });

    socket.on("select_mode", ({ mode, sessionId }) => {
      socket.to(sessionId).emit("receive_mode", mode);
    });

    socket.on("send_response", ({ response, sessionId }) => {
      if (!anonymousResponse[sessionId]) {
        anonymousResponse[sessionId] = [];
      }
      anonymousResponse[sessionId].push(response);
      io.to(sessionId).emit("receive_responses", anonymousResponse[sessionId])
    });

    socket.on("clear_responses", ({ sessionId }) => {
      anonymousResponse[sessionId].length = 0;
      io.to(sessionId).emit("receive_responses", anonymousResponse[sessionId])
    });

    socket.on("send_question", ({ question, sessionId }) => {
      socket.to(sessionId).emit("receive_question", question)
    });

    socket.on("receive_groups", ({ groups, sessionId }) => {
      socket.to(sessionId).emit("user_group", groups);
    });

    socket.on("select_group", ({ pickedGroupNumber, sessionId }) => {
      socket.to(sessionId).emit("receive_group", pickedGroupNumber);
    });

    socket.on("pickON_student", ({ name, sessionId }) => {
      socket.to(sessionId).emit("receive_pickON_student", { pickedName: name });
    });

    socket.on("pickON_volunteer", ({ name, sessionId }) => {
      socket.to(sessionId).emit("receive_pickOn_volunteer", { name });
    });

    socket.on("pickOn_pass", ({ name, sessionId }) => {
      socket.to(sessionId).emit("receive_pickOn_pass", { name });
    });

    socket.on("question_finished", sessionId => {
      socket.to(sessionId).emit("question_finished");
    });

    socket.on("standings_finished", sessionId => {
      socket.to(sessionId).emit("standings_finished");
    });

    socket.on("begin_game", ({questions, sessionId}) => {
      console.log(questions);
      socket.to(sessionId).emit("begin_game_student", JSON.parse(questions));
    });

    socket.on("join_game", ({participant, sessionId}) => {
      socket.to(sessionId).emit("join_game", {participant});
    });

    socket.on("game_send_answer", ({num, sessionId}) => {
      socket.to(sessionId).emit("game_receive_answer", {num});
    });

    socket.on("notify_correct", ({correct, sessionId}) => {
      socket.to(sessionId).emit("student_notify_correct", {correct});
    });

  });

  return io;
}

module.exports = setupSocketIO;
