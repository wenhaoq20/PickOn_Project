import React, { useEffect, useState } from "react";
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

/**
 * Component for the student anonymous mode for courseSession.
 * 
 * @component
 * @param {function} props.onButtonClick The function to handle the back button.
 * @param {Object} props.socket The socket for the component.
 * @param {string} props.sessionId The id of the session.
 * @returns {React.ReactElement} The student anonymous component.
 */
const InstructorAnonymous = ({ onButtonClick, socket, sessionId }) => {
  const [responses, setResponses] = useState([]);
  const [question, setQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");

  const handleSendQuestion = () => {
    socket.emit("send_question", { question, sessionId });
    setCurrentQuestion(question);
    setQuestion("");
  };

  const handleClearResponses = () => {
    socket.emit("clear_responses", { sessionId });
  };

  useEffect(() => {
    socket.on("receive_responses", (responses) => {
      setResponses(responses);
    });
  }, [socket]);

  return (
    <Container maxWidth={false}>
      <Button onClick={onButtonClick}> back </Button>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Anonymous Mode</Typography>
        <Typography variant="h4">
          Current Question:
          <Box
            component="div"
            sx={{
              display: "inline",
              p: 1,
              m: 1,
              border: "1px solid",
              borderRadius: 2,
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            {currentQuestion}
          </Box>
        </Typography>
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
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                width: "40vw",
                height: "65vh",
                overflow: "auto",
              }}
            >
              {responses.map((response, index) => (
                <Box
                  key={index}
                  mt={1}
                  mb={1}
                  sx={{
                    width: "100%",
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      width: "100%",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {response}
                  </Typography>
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
                rows={2}
                onChange={(event) => setQuestion(event.target.value)}
                value={question}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSendQuestion()}
              >
                Submit
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleClearResponses()}
              >
                Clear
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorAnonymous;
