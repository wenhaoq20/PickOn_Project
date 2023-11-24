import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  Link,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../services/user/users";
import useAxios from "../services/axios";

const defaultTheme = createTheme();

/**
 * Page for user registration.
 *
 * @component
 * @returns {React.ReactElement} The register form page.
 */
const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    uhId: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigator = useNavigate();
  const axiosInstance = useAxios();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userRegister(axiosInstance, formData);
      setSuccessMsg("Successfully registered.");
      navigator("/login");
    } catch (error) {
      setErrorMsg("Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"main"} maxWidth={"xs"}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component={"h1"} variant={"h5"}>
            Create an account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {errorMsg && (
              <Alert severity="error">
                <AlertTitle> Error </AlertTitle>
                <strong> {errorMsg} </strong>
              </Alert>
            )}
            {successMsg && (
              <Alert severity="success">
                <AlertTitle> Success </AlertTitle>
                <strong> {successMsg} </strong>
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="First Name"
              id="firstName"
              autoComplete="firstName"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              id="lastName"
              autoComplete="lastName"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="uhId"
              label="UH ID"
              id="uhId"
              autoComplete="UH ID"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
