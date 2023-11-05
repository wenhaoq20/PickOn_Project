import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/Navbar";
import CreateCourse from "../../components/instructor/modals/CreateCourse";
import { getUserCourseList } from "../../api/course/courses";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
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
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.crn}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id}>
                              {column.id === "enter" ? (
                                <Button
                                  style={{ backgroundColor: "#2eb24d" }}
                                  variant="contained"
                                  onClick={() => handleEnter(row)}
                                >
                                  Enter
                                </Button>
                              ) : column.id === "edit" ? (
                                <Button variant="contained">Edit</Button>
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
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
