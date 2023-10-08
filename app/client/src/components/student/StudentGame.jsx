import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";

const defaultTheme = createTheme();

const CountDownTimer = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timerId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [count]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <Typography variant="h6" align="center">
                Time Remaining: {count}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const StudentGame = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Question
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center" marginTop={6}>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth>
              <Typography variant="h6" align="center">
                Answer 1
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth>
              <Typography variant="h6" align="center">
                Answer 2
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth>
              <Typography variant="h6" align="center">
                Answer 3
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth>
              <Typography variant="h6" align="center">
                Answer 4
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <CountDownTimer initialCount={30} />
      </Container>
    </ThemeProvider>
  );
};

export default StudentGame;
