import React, { useState } from "react";
import { CssBaseline, Button, Container, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadCourseRoster } from "../../api/course/courses";

const defaultTheme = createTheme();

const CoursePage = () => {
  const [rosterFile, setRosterFile] = useState(null);
  const [rosterData, setRosterData] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const { state } = useLocation();

  const handleChange = (event) => {
    const file = event.target.files[0];
    setRosterFile(file);
    setSelectedFileName(file ? file.name : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await uploadCourseRoster(rosterFile, state);
      setRosterData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar name="Courses" redirect={true} />
      <Container>
        <h1>test</h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
      </Container>
    </ThemeProvider>
  );
};

export default CoursePage;
