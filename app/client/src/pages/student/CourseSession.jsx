import React from "react";
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
import StudentGame from "../../components/student/StudentGame";
import StudentGameScores from "../../components/student/StudentGameScores";

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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
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
        <Typography variant="h5">
          Progress in course: {rows[4].scores}
        </Typography>
      </Stack>
    </ThemeProvider>
  );
};

const CourseSession = () => {
  return (
    <div>

    </div>
  );
};

export default CourseSession;
