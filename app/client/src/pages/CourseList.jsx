import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Modal,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../AuthContext";
import JoinCourse from "../components/student/Modals/JoinCourse";
import CreateCourse from "../components/instructor/Modals/CreateCourse";
import { getCourses } from "../api/course/courses";
const defaultTheme = createTheme();

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { userId, userRole } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const res = await getCourses(userId);
        setCourses(res.data.courses);
      } catch (err) {
        console.log(err);
      }
    };

    getCourseList(userId);
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
          <Grid item>
            <Card
              variant="outlined"
              sx={{
                width: 300,
                height: 270,
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => handleOpen()}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <AddCircleOutlineIcon fontSize="large" sx={{ fontSize: 60 }} />
                {userRole === "student" ? (
                  <Typography variant="h5">Join a class</Typography>
                ) : (
                  <Typography variant="h5">Create a class</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            {userRole === "student" ? <JoinCourse /> : <CreateCourse />}
          </div>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default CourseList;
