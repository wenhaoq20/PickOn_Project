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
import { useAuth } from "../../AuthContext";
import axios from "../../api/axios";

const socket = io.connect("http://localhost:5000");
const defaultTheme = createTheme();

const CourseSession = () => {
  const [sessionMode, setSessionMode] = useState("home");
  const [session, setSession] = useState("ICS314");

  const [name, setName] = useState("");
  const { userId } = useAuth();

  useEffect(() => {
    const getStudentName = async () => {
      if (userId) {
        try {
          const res = await axios.get("/full_name", { params: { id: userId } });
          if (res.data.success) {
            setName(res.data.firstname + " " + res.data.lastname);
          } else {
            console.log("User not found or another issue");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("User ID is null or undefined");
      }
    };

    getStudentName();
  }, [userId]);

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
      {sessionMode === "home" && <SessionLobby name={name} />}
      {sessionMode === "competition" && <StudentGame />}
      {sessionMode === "group" && <StudentGroup socket={socket} name={name} />}
      {sessionMode === "anonymous" && <StudentAnonymous />}
      {sessionMode === "pickon" && (
        <StudentPickOn socket={socket} name={name} sessionId={session} />
      )}
    </ThemeProvider>
  );
};

export default CourseSession;
