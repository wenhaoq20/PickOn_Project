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
  Alert,
  AlertTitle,
  IconButton,
  Collapse,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../AuthContext";
import JoinCourse from "../components/student/modals/JoinCourse";
import CreateCourse from "../components/instructor/modals/CreateCourse";
import { getUserCourseList } from "../services/course/courses";
import useAxios from "../services/axios";
import CloseIcon from "@mui/icons-material/Close";
const defaultTheme = createTheme();

/**
 * Page for user's course list.
 *
 * @component
 * @returns {React.ReactElement} The page for the list of user enrolled courses.
 */
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const { userId, userRole } = useAuth();
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const axiosInstance = useAxios();

  //TODO - automatically update course list when a new course is created by using Socket.io and Mongoose change streams
  useEffect(() => {
    const getCourseList = async () => {
      try {
        const res = await getUserCourseList(axiosInstance, userId);
        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
      }
    };

    getCourseList(userId);
  }, [successMsg]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar name="Courses" />
      <Collapse in={alertOpen}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle> Success! </AlertTitle>
          <strong> {successMsg} </strong>
        </Alert>
      </Collapse>
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
        {userRole === "student" ? (
          <JoinCourse
            open={open}
            handleClose={handleClose}
            setSuccessMsg={setSuccessMsg}
            setAlertOpen={setAlertOpen}
          />
        ) : (
          <CreateCourse
            open={open}
            handleClose={handleClose}
            setSuccessMsg={setSuccessMsg}
            setAlertOpen={setAlertOpen}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CourseList;
