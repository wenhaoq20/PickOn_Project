import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const students = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
  { name: "David" },
  { name: "Eve" },
];

const StudentGroup = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Paper elevation={3} style={{ padding: "16px", width: "300px" }}>
        <Typography variant="h5" gutterBottom>
          Group 3
        </Typography>
        <List>
          {students.map((member) => (
            <ListItem key={member.id}>
              <ListItemText primary={member.name} secondary={member.role} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default StudentGroup;
