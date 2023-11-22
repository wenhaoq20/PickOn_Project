import React, { useState, useEffect } from "react";
import { Button, Grid, Container, Paper, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/Navbar";
import CreateCourse from "../../components/instructor/modals/CreateCourse";
import { getUserCourseList } from "../../services/course/courses";
import useAxios from "../../services/axios";
import { useAuth } from "../../AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import { tableColumns, tableRows } from "../../utilis/ManageCourseTable";
import EditCourse from "../../components/instructor/modals/EditCourse";

const defaultTheme = createTheme();

/**
 * Page for instructor to manage their courses.
 *
 * @component
 * @returns {React.ReactElement} The course management page.
 */
const ManageCourse = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState("");
  const { userId } = useAuth();
  const axiosInstance = useAxios();
  const handleCreateOpen = () => setOpenCreate(true);
  const handleCreateClose = () => setOpenCreate(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleSetEditCourse = (courseId) => {
    setEditCourse(courseId);
  };

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

  const columns = tableColumns(handleEditOpen, handleSetEditCourse);
  const rows = tableRows(courses);

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
          <Button variant="contained" onClick={() => handleCreateOpen()}>
            Add new
          </Button>
        </Grid>
        {openCreate && (
          <CreateCourse
            open={openCreate}
            handleClose={handleCreateClose}
            setSuccessMsg={setSuccessMsg}
            setAlertOpen={setAlertOpen}
          />
        )}
        {openEdit && (
          <EditCourse
            open={openEdit}
            handleClose={handleEditClose}
            setSuccessMsg={setSuccessMsg}
            setAlertOpen={setAlertOpen}
            editCourse={editCourse}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ManageCourse;
