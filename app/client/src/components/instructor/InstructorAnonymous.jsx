import React, { useRef, useState } from "react";
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
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const sendQuestion = (ref) => {
  socket.emit("send_question", ref.current.value);
}

const InstructorAnonymous = ({ onButtonClick }) => {
  const [responses, updateResponses] =  useState([]);

  useEffect(() => {
    socket.on("receive_answer", (answer) => {
      updateResponses([...responses, answer]);
    });
  }, [socket]);

  const ref = useRef('');

  return (
    <Container>
      <Button onClick={onButtonClick}> back </Button>
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
              Write a question for your class to answer
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
                inputRef={ref}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => sendQuestion(ref)}
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

export default InstructorAnonymous;
