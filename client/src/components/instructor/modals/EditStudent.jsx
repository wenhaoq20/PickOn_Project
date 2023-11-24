import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Modal,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useAuth } from "../../../AuthContext";
import {
  editStudent,
  getStudentFromRoster,
} from "../../../services/course/courses";
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
 * Component for editing a course.
 *
 * @component
 * @param {boolean} props.open The boolean for the modal open state.
 * @param {function} props.handleClose The function to handle the modal close.
 * @param {function} props.setSuccessMsg The function to set the success message.
 * @param {function} props.setAlertOpen The function to set the alert open state.
 * @param {Object} props.selectEditStudent The student information to edit.
 * @param {Object} props.courseInfo The course information.
 * @returns {React.ReactElement} The edit course component.
 */
const EditStudent = ({
  open,
  handleClose,
  setSuccessMsg,
  setAlertOpen,
  selectEditStudent,
  courseInfo,
}) => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    firstName: selectEditStudent.firstName,
    lastName: selectEditStudent.lastName,
    middleName: selectEditStudent.middleName,
    email: selectEditStudent.email,
    uhId: selectEditStudent.uhId,
    userId: userId,
  });
  const axiosInstance = useAxios();
  const [errorMsg, setErrorMsg] = useState("");
  const sucessAlert = () => {
    setSuccessMsg("Successfully edited the course");
    setAlertOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editStudent(
        axiosInstance,
        formData,
        selectEditStudent,
        courseInfo
      );
      if (response.status === 200) {
        sucessAlert();
        handleClose();
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No response from server");
      } else if (error.response?.status === 400) {
        setErrorMsg("Invalid user/course information or user doesn't exist");
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
        <Typography variant="h5">Edit the student information</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoFocus
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="middleName"
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={(e) =>
                setFormData({ ...formData, middleName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="uhId"
              label="UH ID"
              name="uhId"
              value={formData.uhId}
              onChange={(e) =>
                setFormData({ ...formData, uhId: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="uhEmail"
          label="UH Email"
          name="uhEmail"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default EditStudent;
