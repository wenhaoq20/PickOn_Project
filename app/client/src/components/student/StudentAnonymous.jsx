import React from "react";
import {
  Stack,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Container,
  Paper,
} from "@mui/material";

const responses = [
  "I found the course very informative and engaging.",
  "The content was a bit advanced for me, but I learned a lot.",
  "Great course! Looking forward to more like this.",
  "The instructor was knowledgeable and explained concepts clearly.",
  "I had some technical issues with the platform, but the course itself was good.",
];

const StudentAnonymous = () => {
  return (
    <Container>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Anonymous Mode</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Stack
            sx={{
              direction: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 3,
            }}
            spacing={3}
          >
            <Typography variant="h5">Responses</Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
              {responses.map((response, index) => (
                <Box key={index} mt={1} mb={1}>
                  <Typography variant="body1">{response}</Typography>
                </Box>
              ))}
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            sx={{
              direction: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 3,
            }}
            spacing={3}
          >
            <Typography variant="h5">
              Waiting for your instructor.....
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <TextField
                placeholder="Type something here..."
                multiline
                fullWidth
                rows={10}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentAnonymous;
