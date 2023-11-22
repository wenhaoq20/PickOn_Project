import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const StudentQuestion = ({ onButtonClick, onFinalButtonClick, questions, questionNum, socket , sessionId}) => {

  const [count, setCount] = useState(15);
  const [answers, setAnswers] = useState(0);
  let timer = useRef(null);
  timer.current = setTimeout(() => {
    setCount((count-1));
    if (count === 0) {
      timeUp();
    }
  }, 1000);

  const timeUp = () => {
    clearTimeout(timer.current);
    if (questions[questionNum].final === true) {
      onFinalButtonClick();
    } else {
      onButtonClick();
    }
  }

  const sendAnswer = (num) => {
    socket.emit("game_send_answer", { num, sessionId });
  }


  useEffect(() => {
    socket.on("game_receive_answer", num => {
      setAnswers(answers+1);
    });
  }, [socket, answers]);

  return (
      <Box
          sx={{
            marginTop: 5,
            marginBottom: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
      >
        <Typography variant="h3">{questions[questionNum].question}</Typography>
        <Typography
            variant="h6"
            sx={{
              marginTop: 5,
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
        >Seconds remaining: {count}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack
                sx={{
                  marginTop: 5,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                spacing={3}
            >
              <Button variant="contained" color="primary" style={{minHeight: '150px', minWidth: '600px'}} onClick={() => sendAnswer(0)}>{questions[questionNum].answers[0].text}</Button>
              <Button variant="contained" color="error" style={{minHeight: '150px', minWidth: '600px'}} onClick={() => sendAnswer(1)}>{questions[questionNum].answers[1].text}</Button>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
                sx={{
                  marginTop: 5,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                spacing={3}
            >
              <Button variant="contained" color="success" style={{minHeight: '150px', minWidth: '600px'}} onClick={() => sendAnswer(2)}>{questions[questionNum].answers[2].text}</Button>
              <Button variant="contained" color="warning" style={{minHeight: '150px', minWidth: '600px'}} onClick={() => sendAnswer(3)}>{questions[questionNum].answers[3].text}</Button>
            </Stack>
          </Grid>
        </Grid>
        <Typography
            sx={{
              marginTop: 8,
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
        >Answers received: {answers}</Typography>
      </Box>
  );
}

export default StudentQuestion;