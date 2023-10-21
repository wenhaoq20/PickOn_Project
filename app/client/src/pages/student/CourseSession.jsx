import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  Stack,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import io from "socket.io-client";
import StudentGame from "../../components/student/StudentGame";
import StudentGroup from "../../components/student/StudentGroup";
import StudentPickOn from "../../components/student/StudentPickOn";
import StudentAnonymous from "../../components/student/StudentAnonymous";
import Navbar from "../../components/Navbar";

const socket = io.connect("http://localhost:5000");
const defaultTheme = createTheme();

const createData = (name, scores) => {
  return { name, scores };
};

const rows = [
  createData("Game Mode", 10),
  createData("Anonymous Mode", 8),
  createData("Group Mode", 12),
  createData("PickOn Mode Points", 5),
  createData("Total", 35),
];

const SessionLobby = () => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={3}
    >
      <Typography variant="h4">Waiting for your instructor.....</Typography>
      <Typography variant="h5"> John Doe </Typography>
      <Typography variant="h5"> ITM 352 </Typography>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mode name</TableCell>
                <TableCell align="center">Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.scores}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Typography variant="h5">Progress in course: {rows[4].scores}</Typography>
    </Stack>
  );
};

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
