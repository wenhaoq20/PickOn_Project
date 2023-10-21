import React, { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import io from "socket.io-client";
import StudentGame from "../../components/student/StudentGame";
import StudentGroup from "../../components/student/StudentGroup";
import StudentPickOn from "../../components/student/StudentPickOn";
import StudentAnonymous from "../../components/student/StudentAnonymous";
import SessionLobby from "../../components/student/SessionLobby";
import Navbar from "../../components/Navbar";

const socket = io.connect("http://localhost:5000");
const defaultTheme = createTheme();

const CourseSession = () => {
  const [sessionMode, setSessionMode] = useState("home");

  useEffect(() => {
    socket.on("receive_mode", (data) => {
      setSessionMode(data);
    });
  }, [socket]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar name="Course Session" redirect={true} />
      {sessionMode === "home" && <SessionLobby />}
      {sessionMode === "competition" && <StudentGame />}
      {sessionMode === "group" && <StudentGroup />}
      {sessionMode === "anonymous" && <StudentAnonymous />}
      {sessionMode === "pickon" && <StudentPickOn />}
    </ThemeProvider>
  );
};

export default CourseSession;
