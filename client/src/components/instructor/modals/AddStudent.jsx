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
} from "@mui/material";
import { useAuth } from "../../../AuthContext";
import { addStudent } from "../../../services/course/courses";
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
 * Component for adding a student.
 * 
 * @component
 * @param {boolean} props.open The boolean for the modal open state.
 * @param {function} props.handleClose The function to handle the modal close.
 * @param {function} props.setSuccessMsg The function to set the success message.
 * @param {function} props.setAlertOpen The function to set the alert open state.
 * @param {Object} props.courseInfo The course information.
 * @returns {React.ReactElement} The add student component.
 */
const AddStudent = ({ open, handleClose, setSuccessMsg, setAlertOpen, courseInfo }) => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    uhId: "",
    userId: userId,
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
      const response = await addStudent(axiosInstance, formData, courseInfo);
      if (response.status === 200) {
        sucessAlert();
        handleClose();
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No response from server");
      } else if (error.response?.status === 400) {
        setErrorMsg(
          "Invalid user/course information or user already added"
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
        <Typography variant="h5">Enter the student information</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
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
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddStudent;
