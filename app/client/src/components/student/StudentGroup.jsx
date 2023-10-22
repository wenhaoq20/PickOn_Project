import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
} from "@mui/material";

const StudentGroup = ({ socket, name }) => {
  const [groupNumber, setGroupNumber] = useState(null);
  const [group, setGroup] = useState([]);
  const [isPicked, setIsPicked] = useState(false);

  useEffect(() => {
    socket.on("user_group", (group) => {
      for (let i = 0; i < group.length; i++) {
        if (group[i].includes(name)) {
          setGroupNumber(i + 1);
          setGroup(group[i]);
        }
      }
    });
  }, [socket, group]);

  useEffect(() => {
    socket.on("receive_group", (pickedGroupNumber) => {
      setIsPicked(pickedGroupNumber === groupNumber);
    });
  }, [socket]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "90vh" }}
    >
      {isPicked && (
        <Grid item>
          <Typography variant="h3" align="center">
            Your group has been picked
          </Typography>
        </Grid>
      )}
      <Grid item>
        <Paper elevation={3} style={{ padding: "16px", width: "300px" }}>
          <Typography variant="h5" gutterBottom align="center">
            {groupNumber ? `Group ${groupNumber}` : "Not in a group"}
          </Typography>
          <List>
            {group.map((member, index) => (
              <ListItem key={index}>
                <ListItemText primary={member} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StudentGroup;
