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
import { uploadCourseRoster, getCourseRoster } from "../../services/course/courses";
import { DataGrid } from "@mui/x-data-grid";
import { tableColumns, tableRows } from "../../utilis/CoursePageTable";
import useAxios from "../../services/axios";

const defaultTheme = createTheme();

const CoursePage = () => {
  const [rosterFile, setRosterFile] = useState(null);
  const [rosterData, setRosterData] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const { state } = useLocation();
  const { courseCode, courseSection, courseSemester, courseYear, courseCRN } =
    state;
  const rows = tableRows(rosterData);
  const axiosInstance = useAxios();

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
            </Box>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              rows={rows}
              columns={tableColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
              }}
              pageSizeOptions={[25, 50, 100]}
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default CoursePage;
