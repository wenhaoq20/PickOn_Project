import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Button,
  Container,
  Box,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  uploadCourseRoster,
  getCourseRoster,
} from "../../services/course/courses";
import { DataGrid } from "@mui/x-data-grid";
import { tableColumns, tableRows } from "../../utilis/CoursePageTable";
import useAxios from "../../services/axios";
import { useAuth } from "../../AuthContext";
import AddStudent from "../../components/instructor/modals/AddStudent";
import EditStudent from "../../components/instructor/modals/EditStudent";

const defaultTheme = createTheme();

/**
 * Page for instructor individual course page
 *
 * @component
 * @returns {React.ReactElement} The course page.
 */
const CoursePage = () => {
  const [rosterFile, setRosterFile] = useState(null);
  const [rosterData, setRosterData] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openEditStudent, setOpenEditStudent] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectEditStudent, setSelectEditStudent] = useState(null);
  const { state } = useLocation();
  const { courseCode, courseSection, courseSemester, courseYear, courseCRN } =
    state;
  const rows = tableRows(rosterData);
  const axiosInstance = useAxios();
  const { userId } = useAuth();
  const courseInfo = { courseSemester, courseYear, courseCRN };
  
  const handleAddStudentOpen = () => setOpenAddStudent(true);
  const handleAddStudentClose = () => setOpenAddStudent(false);
  const handleEditStudentOpen = () => setOpenEditStudent(true);
  const handleEditStudentClose = () => setOpenEditStudent(false);

  const handleSetEditStudent = (studentId) => {
    setSelectEditStudent(studentId);
  };

  const getRosterData = async () => {
    try {
      const response = await getCourseRoster(axiosInstance, {
        courseCRN,
        courseSemester,
        courseYear,
      });
      setRosterData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setRosterFile(file);
    setSelectedFileName(file ? file.name : "");
  };

  const handleDelete = () => {
    setRosterFile(null);
    setSelectedFileName("");

    if (document && document.getElementById("fileInput")) {
      document.getElementById("fileInput").value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await uploadCourseRoster(
        axiosInstance,
        rosterFile,
        state
      );
      if (response.status === 200) {
        getRosterData(state);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRosterData(state);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar name="Manage Courses" redirect={true} />
      <Container>
        <Grid container direction="column" rowSpacing={{ xs: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h3">{`${courseCode} Section ${courseSection} ${courseSemester} ${courseYear}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <Chip
                label={selectedFileName}
                onDelete={handleDelete}
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              />
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload a file
                <input
                  id="fileInput"
                  type="file"
                  accept=".csv"
                  hidden
                  onChange={handleChange}
                />
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!selectedFileName}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => handleAddStudentOpen()}
              >
                Add a student
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              rows={rows}
              columns={tableColumns(
                courseInfo,
                userId,
                handleEditStudentOpen,
                handleSetEditStudent
              )}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
              }}
              pageSizeOptions={[25, 50, 100]}
            />
          </Grid>
        </Grid>
        {openAddStudent && (
          <AddStudent
            open={openAddStudent}
            handleClose={handleAddStudentClose}
            setSuccessMsg={setSuccessMsg}
            setAlertOpen={setAlertOpen}
            courseInfo={courseInfo}
          />
        )}
        {openEditStudent && (
          <EditStudent
            open={openEditStudent}
            handleClose={handleEditStudentClose}
            setSuccessMsg={setSuccessMsg}
            setAlertOpen={setAlertOpen}
            selectEditStudent={selectEditStudent}
            courseInfo={courseInfo}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CoursePage;
