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

const SessionLobby = ({ name, data }) => {
  console.log(data);
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={3}
    >
      <Typography variant="h4">Waiting for your instructor.....</Typography>
      <Typography variant="h5"> {name} </Typography>
      <Typography variant="h5"> {data.courseCode} Section: {data.courseSection} </Typography>
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

export default SessionLobby;
