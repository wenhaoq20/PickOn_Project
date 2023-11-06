import React, { useState, useEffect } from "react";
import { CssBaseline, Button, Container, Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadCourseRoster, getCourseRoster } from "../../api/course/courses";
import { DataGrid } from "@mui/x-data-grid";
import { tableColumns, tableRows } from "../../utilis/CoursePageTable";

const defaultTheme = createTheme();

const CoursePage = () => {
  const [rosterFile, setRosterFile] = useState(null);
  const [rosterData, setRosterData] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const { state } = useLocation();
  const rows = tableRows(rosterData);

  const getRosterData = async () => {
    try {
      const response = await getCourseRoster(state);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await uploadCourseRoster(rosterFile, state);
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
        <Grid>
          <h1>test</h1>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload a file
              <input type="file" accept=".csv" hidden onChange={handleChange} />
            </Button>
            {selectedFileName && <p>File selected: {selectedFileName}</p>}
            <Button
              type="submit"
              variant="contained"
              disabled={!selectedFileName}
            >
              Submit
            </Button>
          </Box>
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
      </Container>
    </ThemeProvider>
  );
};

export default CoursePage;
