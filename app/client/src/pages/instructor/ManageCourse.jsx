import React, { useState, useEffect } from "react";
import { Button, Grid, Container, Paper, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/Navbar";
import CreateCourse from "../../components/instructor/modals/CreateCourse";
import { getUserCourseList } from "../../api/course/courses";
import useAxios from "../../api/axios";
import { useAuth } from "../../AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import { tableColumns, tableRows } from "../../utilis/ManageCourseTable";

const defaultTheme = createTheme();

const ManageCourse = () => {
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const { userId } = useAuth();
  const axiosInstance = useAxios();

  const columns = tableColumns;
  const rows = tableRows(courses);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const res = await getUserCourseList(axiosInstance, userId);
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
      <Navbar name="Course List" redirect={true} />
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
