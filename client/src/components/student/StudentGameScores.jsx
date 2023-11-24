import React from "react";
import { Container, Typography } from "@mui/material";

const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 90 },
  { name: "Charlie", score: 78 },
  { name: "David", score: 92 },
  { name: "Eve", score: 88 },
];

const StudentGameScores = () => {
  return (
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
  );
};

export default StudentGameScores;
