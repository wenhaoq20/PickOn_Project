import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../api/axios";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../AuthContext";
const defaultTheme = createTheme();

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const res = await axios.get("/get_enrolled_courses", {
          params: { id: userId },
        });
        setCourses(res.data.courses);
      } catch (err) {
        console.log(err);
      }
    };

    getCourseList();
  }, []);

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
          {courses.map((course) => (
            <Grid item key={course._id}>
              <CourseCard data={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default CourseList;
