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
      <Grid container spacing={2}>
        <Grid item xs={5} textAlign="center">
          <Button onClick={onButtonClick}> back </Button>
          <h1>Student List</h1>
          <Box sx={{ boxShadow: 2 }}>
            <List>
              {students.map((member) => (
                <ListItem key={member.name}>
                  <ListItemText primary={member.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5} textAlign="center">
          <h1>Groups</h1>
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
          <Container style={{ justifyContent: "flex-start" }}>
            <Button variant="contained">Submit</Button>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorGroup;
