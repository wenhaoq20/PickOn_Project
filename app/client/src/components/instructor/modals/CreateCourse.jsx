import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Modal,
  Alert,
  AlertTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useAuth } from "../../../AuthContext";
import { createCourse } from "../../../services/course/courses";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import useAxios from "../../../services/axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

/**
 * Component for creating a course.
 * 
 * @component
 * @param {boolean} props.open The boolean for the modal open state.
 * @param {function} props.handleClose The function to handle the modal close.
 * @param {function} props.setSuccessMsg The function to set the success message.
 * @param {function} props.setAlertOpen The function to set the alert open state.
 * @returns {React.ReactElement} The create course component.
 */
const CreateCourse = ({ open, handleClose, setSuccessMsg, setAlertOpen }) => {
  const { userName, userId } = useAuth();
  const currDate = new Date();
  const [formData, setFormData] = useState({
    courseCode: "",
    courseSection: "",
    courseCRN: "",
    courseName: "",
    courseSemester: "Spring",
    courseYear: currDate.getFullYear(),
    instructor: userName,
    description: "",
    userId: userId,
    startTime: "",
    endTime: "",
  });
  const axiosInstance = useAxios();
  const [errorMsg, setErrorMsg] = useState("");
  const sucessAlert = () => {
    setSuccessMsg("Successfully created the course");
    setAlertOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCourse(axiosInstance, formData);
      console.log(response);
      if (response.status === 200) {
        sucessAlert();
        handleClose();
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No response from server");
      } else if (error.response?.status === 400) {
        setErrorMsg(
          "Invalid user/course information or course already created"
        );
      } else {
        setErrorMsg("Something went wrong");
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={handleSubmit}>
        {errorMsg && (
          <Alert severity="error">
            <AlertTitle> Error </AlertTitle>
            <strong> {errorMsg} </strong>
          </Alert>
        )}
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
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl variant="outlined" margin="normal" required fullWidth>
              <InputLabel id="courseSemesterLabel">Semester</InputLabel>
              <Select
                id="courseSemester"
                value={formData.courseSemester}
                onChange={(e) =>
                  setFormData({ ...formData, courseSemester: e.target.value })
                }
                label="Semester"
              >
                <MenuItem value={"Spring"}>Spring</MenuItem>
                <MenuItem value={"Summer"}>Summer</MenuItem>
                <MenuItem value={"Fall"}>Fall</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="courseYear"
              label="Course Year"
              name="courseYear"
              value={formData.courseYear}
              onChange={(e) =>
                setFormData({ ...formData, courseYear: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={6}>
              <TimePicker
                label="Course Start Time"
                value={formData.startTime}
                onChange={(time) => {
                  const formattedTime = time ? time.format("HH:mm") : null;
                  setFormData({ ...formData, startTime: formattedTime });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="Course End Time"
                value={formData.endTime}
                onChange={(time) => {
                  const formattedTime = time ? time.format("HH:mm") : null;
                  setFormData({ ...formData, endTime: formattedTime });
                }}
              />
            </Grid>
          </LocalizationProvider>
        </Grid>
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
