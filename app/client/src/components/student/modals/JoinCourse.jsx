import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Modal,
  Alert,
  AlertTitle,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../../../AuthContext";
import { joinCourse } from "../../../services/course/courses";
import useAxios from "../../../services/axios";

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
 * Component for the join course modal.
 * 
 * @component
 * @param {boolean} props.open Whether the modal is open.
 * @param {function} props.handleClose The function to close the modal.
 * @param {function} props.setSuccessMsg The function to set the success message.
 * @param {function} props.setAlertOpen The function to set the alert open.
 * @returns {React.ReactElement} The join course modal component.
 */
const JoinCourse = ({ open, handleClose, setSuccessMsg, setAlertOpen }) => {
  const { userId } = useAuth();
  const currDate = new Date();
  const [formData, setFormData] = useState({
    courseCode: "",
    courseSection: "",
    courseCRN: "",
    userId: userId,
    courseSemester: "",
    courseYear: currDate.getFullYear(),
  });
  const [errorMsg, setErrorMsg] = useState("");
  const sucessAlert = () => {
    setSuccessMsg("Successfully joined the course");
    setAlertOpen(true);
  };
  const axiosInstance = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await joinCourse(axiosInstance, formData);
      if (response.status === 200) {
        sucessAlert();
        handleClose();
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No response from server");
      } else if (error.response?.status === 400) {
        setErrorMsg("Invalid user/course information or already joined");
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
      <Box sx={style} component="form" onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default JoinCourse;
