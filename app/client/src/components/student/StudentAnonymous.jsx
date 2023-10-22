import React, { useEffect, useRef, useState } from "react";
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

const StudentAnonymous = ({ socket }) => {
  const [responses, setResponses] = useState([]);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    socket.on("receive_answer", (answer) => {
      setResponses([...responses, answer]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("receive_question", (question) => {
      setQuestion(question);
    });
  }, [socket]);

  const ref = useRef("");

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
      <Container
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "inline",
            p: 1,
            m: 1,
            border: "1px solid",
            borderRadius: 2,
            fontSize: "3rem",
            fontWeight: "700",
          }}
        >
          {question}
        </Box>
      </Container>
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
                onChange={(event) => setResponse(event.target.value)}
                value={response}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={}
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
