import React, { useState, useEffect } from "react";
import { Button, Grid, Container, Paper, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/Navbar";
import CreateCourse from "../../components/instructor/modals/CreateCourse";
import { getUserCourseList } from "../../api/course/courses";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tableColumns, tableRows } from "../../utilis/ManageCourseTable";

const defaultTheme = createTheme();

const ManageCourse = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userId } = useAuth();
  const navigator = useNavigate();

  const columns = tableColumns;
  const rows = tableRows(courses);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEnter = (course) => {
    navigator(`/c/${course.crn}`, {
      state: {
        courseCRN: course.crn,
        courseYear: course.year,
        courseSemester: course.semester,
      },
    });
  };

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const res = await getUserCourseList(userId);
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
      <Navbar name="Manage Courses" redirect={true} />
      <Container>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent={"center"}
        >
          <h1>Manage Courses</h1>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            pageSizeOptions={[25, 50, 100]}
          />
        </Paper>
        <Grid
          padding="5%"
          container
          spacing={0}
          alignItems="center"
          justifyContent={"center"}
        >
          <Button variant="contained" onClick={() => handleOpen()}>
            Add new
          </Button>
        </Grid>
        <CreateCourse
          open={open}
          handleClose={handleClose}
          setSuccessMsg={setSuccessMsg}
          setAlertOpen={setAlertOpen}
        />
      </Container>
    </ThemeProvider>
  );
};

export default ManageCourse;
