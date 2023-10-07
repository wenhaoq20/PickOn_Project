import * as React from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { AccountCircle, Settings } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CourseCard from "../components/CourseCard";
const defaultTheme = createTheme();

const CourseList = () => {
  const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline component="main">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
            <IconButton aria-controls="menu-appbar" color="inherit" aria-label="user">
              <AccountCircle />
            </IconButton>
            <IconButton aria-controls="menu-appbar" color="inherit" aria-label="setting">
              <Settings />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component={"h1"} variant={"h5"}>
              Course List
            </Typography>
          </Box>
          <TextField
            margin="normal"
            fullWidth
            id="course"
            label="Course name"
            name="course"
            autoComplete="course"
            autoFocus
          />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2}
            sx={{
              marginTop: 5,
            }}
          >
            {courses.map((c) => (
              <Grid item>
                <CourseCard key={c} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default CourseList;
