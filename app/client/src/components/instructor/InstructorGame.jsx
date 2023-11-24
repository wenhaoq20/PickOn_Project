import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import InstructorQuestion from './modals/InstructorQuestion';
import InstructorStandings from './modals/InstructorStandings';

/**
 * Component for the instructor game mode for courseSession.
 * 
 * @component
 * @param {Object} props The props for the component.
 * @param {function} props.onButtonClick The function to handle the back button.
 * @param {Object} props.socket The socket for the component.
 * @param {string} props.sessionId The id of the session.
 * @returns {React.ReactElement} The instructor game component.
 */
const InstructorGame = ({ onButtonClick, socket, sessionId }) => {
  const [participants, setParticipants] = useState('Waiting for people to join...');
  const [mode, setMode] = useState(0);
  let [num, setNum] = useState(0);

  let questions = [{
    question: 'What is the capital of Korea',
    final: false,
    answers: [
        {text: 'Seoul', correct: true},
      {text: 'Busan', correct: false},
      {text: 'Daejeon', correct: false},
      {text: 'Ulsan', correct: false}
    ]
  },
    {
      question: 'What is the capital of Japan',
      final: false,
      answers: [
        {text: 'Tokyo', correct: true},
        {text: 'Kyoto', correct: false},
        {text: 'Nagano', correct: false},
        {text: 'Yamanashi', correct: false}
      ]
    },
    {
      question: 'What is 2+2',
      final: true,
      answers: [
        {text: '4', correct: true},
        {text: '3', correct: false},
        {text: '(2^2)', correct: true},
        {text: '(4+8)/3', correct: true}
      ]
    },
    {
      question: 'What is 2+2 (again)',
      final: true,
      answers: {
        one: ['4', true],
        two: ['3', false],
        three: ['(2^2)', true],
        four: ['(4+8)/3', true]
      }
    }]
  const goQuestions = () => {
    setMode(1);
  }
  const goStandings = () => {
    setMode(2);
  }
  const goResults = () => {
    setMode(3);
  }

  useEffect(() => {
    socket.on('join_game', ({ participant }) => {
      setParticipants(participant);
    })
  }, [socket, setParticipants])

  const begin = (questions) => {
    const newQuestions = JSON.stringify(questions);
    socket.emit('begin_game', newQuestions, sessionId);
    goQuestions();
  }

  return (
      <Container>
        {mode === 0 && (
            <Container>
              <Button onClick={onButtonClick}> back </Button>
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
                <TextField
                    id="outlined-multiline-static"
                    label="Student participants list"
                    multiline
                    rows={8}
                    disabled
                    style={{ width: 800 }}
                    value={participants}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => (begin(questions))}
                >
                  Start!
                </Button>
              </Box>
            </Container>
        )}
        {mode === 1 && (
            <InstructorQuestion
                onButtonClick={() => {
                  setNum(num+1);
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
            <InstructorStandings
                onButtonClick={() => goQuestions()}
                socket={socket}
                sessionId={sessionId}
            />
        )}
        {mode === 3 && (
            <Button onClick={onButtonClick}> back </Button>
        )}
      </Container>
  );
};

export default InstructorGame;
