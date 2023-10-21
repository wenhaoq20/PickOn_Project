import React from "react";
import {
  Box, Button,
  Container, CssBaseline, Grid, List, ListItem, ListItemText, TextField, Typography
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CasinoIcon from '@mui/icons-material/Casino';

const defaultTheme = createTheme();

const students = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
  { name: "David" },
  { name: "Eve" },
];

const InstructorGroup = () => {
  return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container>
          <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
          >
            <Typography variant="h3">PickOn Mode</Typography>
          </Box>
          <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={5} textAlign='center'>
              <Typography variant='h4'>Student List</Typography>
              <Box sx={{ boxShadow: 2 }}>
                <List>
                  {students.map((member) => (
                      <ListItem>
                        <ListItemText primary={member.name}/>
                      </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5} textAlign='center' sx={{mt: 5}}>
              <TextField
                  id="outlined-multiline-static"
                  label="Question"
                  multiline
                  rows={6}
                  fullWidth
                  defaultValue="Enter the question here"
              />
              <Button variant="contained" sx={{mt: 2}}>Submit</Button>
              <Container/>
              <Button variant="contained" sx={{mt: 8}} size='large' startIcon={<CasinoIcon/>}>PickOn</Button>
              <TextField
                  id="outlined-multiline-static"
                  label="Picked Student"
                  fullWidth
                  defaultValue="No current student"
                  sx={{mt: 1}}
              />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
  );
};

export default InstructorGroup;
