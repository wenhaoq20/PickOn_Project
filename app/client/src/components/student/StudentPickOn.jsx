import React, { useState, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";

const StudentPickOn = ({ socket, name, sessionId }) => {
  const [message, setMessage] = useState(
    "You have not been picked on this session."
  );
  const [picked, setPicked] = useState(false);
  const [volunteer, setVolunteer] = useState(false);
  const [pass, setPass] = useState(false);

  const handleVolunteer = () => {
    setMessage("You volunteered on this session.");
    setVolunteer(true);
    setPass(false);
    setPicked(true);
    socket.emit("pickON_volunteer", { name, sessionId });
  };

  const handlePass = () => {
    if (picked) {
      setMessage("You pass to someone else.");
      setPass(true);
      setVolunteer(false);
      setPicked(false);
      socket.emit("pickOn_pass", { name, sessionId });
    } else {
      setMessage(
        "You have not been picked on this session so you can not pass."
      );
    }
  };

  useEffect(() => {
    socket.on("receive_pickON_student", ({ pickedName }) => {
      console.log(pickedName);  
      if (name === pickedName) {
        setPicked(true);
        setPass(false);
        setMessage("You have been picked on this session.");
      } else {
        setPicked(false);
        setPass(false);
        setMessage("You have not been picked on this session.");
      }
    });
  }, [socket]);

  return (
    <Grid Container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 30,
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
          {message}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => {
            handleVolunteer();
          }}
        >
          Volunteer
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => {
            handlePass();
          }}
        >
          Pass
        </Button>
      </Grid>
    </Grid>
  );
};

export default StudentPickOn;
