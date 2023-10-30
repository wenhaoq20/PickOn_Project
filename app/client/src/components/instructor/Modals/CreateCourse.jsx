import React, { useState } from "react";
import { Box, TextField, Typography, Button, Grid, Modal } from "@mui/material";
import { useAuth } from "../../../AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CreateCourse = ({ open, handleClose }) => {
  const { userName, userId } = useAuth();
  const [formData, setFormData] = useState({
    courseCode: "",
    courseSection: "",
    courseCRN: "",
    courseName: "",
    courseSemester: "",
    instructor: userName,
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={handleSubmit}>
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
          id="courseName"
          label="Course Name"
          name="courseName"
          onChange={(e) =>
            setFormData({ ...formData, courseName: e.target.value })
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Course Description"
          name="description"
          multiline
          minRows={3}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateCourse;
