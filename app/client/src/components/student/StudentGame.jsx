import React, { useState } from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import StudentStandings from './modals/StudentStandings';
import StudentQuestion from './modals/StudentQuestion';

/**
 * Component for the student game mode for courseSession.
 *
 * @component
 * @param {Object} props The props for the component.
 * @returns {React.ReactElement} The countdown timer component.
 */
const StudentGame = ({ socket, sessionId }) => {
  const [participants, setParticipants] = useState('Waiting for people to join...');
  const [mode, setMode] = useState(0);
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState();
  let [num, setNum] = useState(0);
    const goQuestions = () => {
      setMode(1);
    }
    const goStandings = () => {
      setMode(2);
    }
    const goResults = () => {
      setMode(3);
    }

    const join = (name) => {
      socket.emit('join_game', { name, sessionId });
      setMode(0);
    }

    socket.on('begin_game_student', ({ questions }) => {
      setQuestions(questions);
      goQuestions();
    })

    socket.on('join_game', ({ participant }) => {
      setParticipants(participant);
    })

    return (
        <Container>
          {mode === 0 && (
              <Container>
                <Box
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                >
                  <Typography
                      variant="h3"
                      sx={{
                        marginTop: 2,
                        marginBottom: 2,
                      }}
                  >
                    Competition Mode
                  </Typography>
                  <Typography
                      variant="h4"
                      sx={{
                        marginTop: 2,
                        marginBottom: 2,
                      }}
                  >
                    Waiting for instructor to start
                  </Typography>
                  <TextField
                      id="outlined-multiline-static"
                      label="Student participants list"
                      multiline
                      rows={8}
                      disabled
                      style={{ width: 800 }}
                      value={participants}
                  />
                </Box>
              </Container>
          )}
          {mode === 1 && (
              <StudentQuestion
                  onButtonClick={() => {
                    setNum(num + 1);
                    goStandings();
                  }}
                  onFinalButtonClick={() => goResults()}
                  questions={questions}
                  questionNum={num}
                  socket={socket}
                  sessionId={sessionId}
              />
          )}
          {mode === 2 && (
              <StudentStandings
                  onButtonClick={() => goQuestions()}
                  socket={socket}
                  sessionId={sessionId}
              />
          )}
          {mode === 3 && (
              <div>RESULTS</div>
          )}
          {mode === 4 && (
              <Container>
                <TextField
                    onChange={(e) => setName(e.target.value)}
                >
                  hi
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => (
                        join(name)
                    )}
                >
                  Join
                </Button>
              </Container>
          )}
        </Container>
    );
  }

export default StudentGame;
