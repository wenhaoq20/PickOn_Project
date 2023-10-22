import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";

const InstructorGroup = ({ onButtonClick, socket, onlineUsers, sessionId }) => {
  const [pickedStudent, setPickedStudent] = useState(null);

  const handleRandomPickOn = () => {
    if (onlineUsers.length > 0) {
      const randomIndex = Math.floor(Math.random() * onlineUsers.length);
      setPickedStudent(onlineUsers[randomIndex]);
    }
  };

  useEffect(() => {
    socket.emit("pickON_student", { name: pickedStudent, sessionId });
  }, [pickedStudent]);

  return (
    <Container>
      <Button onClick={onButtonClick}> Back </Button>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">PickOn Mode</Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={5} textAlign="center">
          <Typography variant="h4">Student List</Typography>
          <Box sx={{ boxShadow: 2 }}>
            <List>
              {onlineUsers.map((member) => (
                <ListItem>
                  <ListItemText primary={member} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5} textAlign="center" sx={{ mt: 5 }}>
          <Typography variant="h4">Picked Student</Typography>
          <Box sx={{ boxShadow: 2 }}>
            <Typography variant="h5">{pickedStudent}</Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 8 }}
            size="large"
            startIcon={<CasinoIcon />}
            onClick={handleRandomPickOn}
          >
            PickOn A Student
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorGroup;
