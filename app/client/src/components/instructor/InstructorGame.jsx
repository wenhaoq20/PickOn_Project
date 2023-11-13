import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const InstructorGame = ({ onButtonClick, socket, sessionId }) => {
  const [participants, setParticipants] = useState('Waiting for people to join...');

  return (
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
              style={{width: 800}}
              value={participants}
              onChange={(event) => (null)}
          />
          <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => (null)}
          >
            Start!
          </Button>
        </Box>
      </Container>
  );
};

export default InstructorGame;