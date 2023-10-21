import React from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
const defaultTheme = createTheme();

const CourseList = () => {
  const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar name="Courses" />
      <Container component="main">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component={"h1"} variant={"h5"}>
            Course List
          </Typography>
        </Box>
        <TextField
          margin="normal"
          fullWidth
          id="course"
          label="Course name"
          name="course"
          autoComplete="course"
          autoFocus
        />
        <Grid
          container
          rowSpacing={1}
          columnSpacing={2}
          sx={{
            marginTop: 5,
          }}
        >
          {courses.map((c) => (
            <Grid item key={c}>
              <CourseCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default CourseList;
