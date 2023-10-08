import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Typography } from "@mui/material";

const defaultTheme = createTheme();

const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 90 },
  { name: "Charlie", score: 78 },
  { name: "David", score: 92 },
  { name: "Eve", score: 88 },
];

const StudentGameScores = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container>
        <Typography variant="h2" align="center" marginTop={8} marginBottom={6}>
          Leaderboard
        </Typography>
        {students.map((s) => (
          <div>
            <Typography variant="h6" align="center">
              {s.name}: {s.score}
            </Typography>
          </div>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default StudentGameScores;
