import React, { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import InstructorAnonymous from "../../components/instructor/InstructorAnonymous";
import InstructorGroup from "../../components/instructor/InstructorGroup";
import InstructorPickOn from "../../components/instructor/InstructorPickOn";
import InstructorLobby from "../../components/instructor/InstructorLobby.jsx";
import { socket } from "../../socket.js";
import InstructorGame from '../../components/instructor/InstructorGame';

const defaultTheme = createTheme();

/**
 * Page for instructor to manage their course session.
 *
 * @component
 * @returns {React.ReactElement} The course session management page.
 */
const ManageCourseSession = () => {
  const [sessionMode, setSessionMode] = useState("home");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { parameter } = useParams();
  const [session, setSession] = useState(parameter);

  const selectMode = (mode) => {
    socket.emit("select_mode", { mode: mode, sessionId: session });
    setSessionMode(mode);
  };

  const handleSelectMode = (mode) => {
    selectMode(mode);
  };

  useEffect(() => {
    socket.connect();
    socket.emit("join_session", {
      sessionId: session,
      username: "Instructor",
      isInstructor: true,
    });

    return () => {
      selectMode("home");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("send_online_users", (data) => {
      setOnlineUsers(data);
    });
  }, [socket]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar name="Session Manager" redirect={true} />
      {sessionMode === "home" && (
        <InstructorLobby handleSelectMode={handleSelectMode} />
      )}
      {sessionMode === "competition" && (
          <InstructorGame
              onButtonClick={() => selectMode("home")}
              socket={socket}
              sessionId={session}
          />
      )}
      {sessionMode === "group" && (
        <InstructorGroup
          onButtonClick={() => selectMode("home")}
          onlineUsers={onlineUsers}
          sessionId={session}
          socket={socket}
        />
      )}
      {sessionMode === "anonymous" && (
        <InstructorAnonymous
          onButtonClick={() => selectMode("home")}
          socket={socket}
          sessionId={session}
        />
      )}
      {sessionMode === "pickon" && (
        <InstructorPickOn
          onButtonClick={() => selectMode("home")}
          socket={socket}
          sessionId={session}
          onlineUsers={onlineUsers}
        />
      )}
    </ThemeProvider>
  );
};

export default ManageCourseSession;
