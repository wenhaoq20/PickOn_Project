import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

const students = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
  { name: "David" },
  { name: "Eve" },
];

const InstructorGroup = ({ onButtonClick }) => {
  return (
    <Container>
      <Button onClick={onButtonClick}>Back</Button>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Group Mode</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={5} textAlign="center">
          <Typography variant="h4">Student List</Typography>
          <Box sx={{ boxShadow: 2 }}>
            <List>
              {students.map((member) => (
                <ListItem>
                  <ListItemText primary={member.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5} textAlign="center">
          <Typography variant="h4">Groups</Typography>
          <Box sx={{ boxShadow: 2 }}>
            <List>
              <ListItem>Group1</ListItem>
            </List>
          </Box>
          <Box sx={{ boxShadow: 2 }}>
            <List>
              <ListItem>Group2</ListItem>
            </List>
          </Box>
          <Box sx={{ boxShadow: 2 }}>
            <List>
              <ListItem>Group3</ListItem>
            </List>
          </Box>
          <Button variant="contained" sx={{ margin: 2 }}>
            Randomize
          </Button>
          <Button variant="contained">Select groups</Button>
          <Container padding={2} />
          <TextField
            id="outlined-multiline-static"
            label="Question"
            multiline
            rows={6}
            fullWidth
            defaultValue="Enter the question here"
          />
          <Button variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorGroup;
