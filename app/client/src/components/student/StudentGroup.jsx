import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const defaultTheme = createTheme();

const students = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
  { name: "David" },
  { name: "Eve" },
];

const StudentGroup = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}
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
    </ThemeProvider>
  );
};

export default StudentGroup;
