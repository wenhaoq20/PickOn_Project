import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { useAuth } from "../../../AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const JoinCourse = () => {
  const { userName, userId } = useAuth();
  const [formData, setFormData] = useState({
    courseCode: "",
    courseSection: "",
    courseCRN: "",
    studentName: userName,
    courseSemester: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Box sx={style} component="form" onSubmit={handleSubmit}>
      <Typography variant="h5">Enter the class information</Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="courseCode"
            label="Course Code"
            name="courseCode"
            autoFocus
            onChange={(e) =>
              setFormData({ ...formData, courseCode: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="courseSection"
            label="Course Section"
            name="courseSection"
            onChange={(e) =>
              setFormData({ ...formData, courseSection: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="courseCRN"
        label="Course CRN"
        name="courseCRN"
        onChange={(e) =>
          setFormData({ ...formData, courseCRN: e.target.value })
        }
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="courseSemester"
        label="Course Semester"
        name="courseSemester"
        onChange={(e) =>
          setFormData({ ...formData, courseSemester: e.target.value })
        }
      />
      <Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}>
        Submit
      </Button>
    </Box>
  );
};

export default JoinCourse;
