import React, { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import StudentGame from "../../components/student/StudentGame";
import StudentGroup from "../../components/student/StudentGroup";
import StudentPickOn from "../../components/student/StudentPickOn";
import StudentAnonymous from "../../components/student/StudentAnonymous";
import SessionLobby from "../../components/student/SessionLobby";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../AuthContext";

const socket = io.connect("http://localhost:5000");
const defaultTheme = createTheme();

const CourseSession = () => {
  const { state } = useLocation();

  const [sessionMode, setSessionMode] = useState("home");
  const [session, setSession] = useState("ICS314");
  const { userName } = useAuth();
  const name = userName;

  useEffect(() => {
    if (name) {
      socket.emit("join_session", {
        sessionId: session,
        username: name,
        isInstructor: false,
      });
    }
  }, [name]);

  useEffect(() => {
    socket.on("receive_mode", (data) => {
      setSessionMode(data);
    });
  }, [socket]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar name="Course Session" redirect={true} />
      {sessionMode === "home" && <SessionLobby name={name} data={state} />}
      {sessionMode === "competition" && <StudentGame />}
      {sessionMode === "group" && <StudentGroup socket={socket} name={name} />}
      {sessionMode === "anonymous" && (
        <StudentAnonymous socket={socket} sessionId={session} />
      )}
      {sessionMode === "pickon" && (
        <StudentPickOn socket={socket} name={name} sessionId={session} />
      )}
    </ThemeProvider>
  );
};

export default CourseSession;
