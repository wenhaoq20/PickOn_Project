import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * Component for the instructor group mode for courseSession.
 * 
 * @component
 * @param {function} props.onButtonClick The function to handle the back button.
 * @param {string[]} props.onlineUsers The array of online users.
 * @param {Object} props.socket The socket for the component.
 * @param {string} props.sessionId The id of the session.
 * @returns {React.ReactElement} The instructor group component.
 */
const InstructorGroup = ({ onButtonClick, onlineUsers, sessionId, socket }) => {
  const [groupSize, setGroupSize] = useState(1);
  const [groups, setGroups] = useState([]);
  const [pickedGroup, setPickedGroup] = useState(null);
  const [pickedGroupNumber, setPickedGroupNumber] = useState(null);

  const handleGroupGeneration = () => {
    const shuffledNames = onlineUsers.sort(() => 0.5 - Math.random());
    const generatedGroups = Array.from({ length: groupSize }, () => []);
    for (let i = 0; i < shuffledNames.length; i++) {
      generatedGroups[i % groupSize].push(shuffledNames[i]);
    }
    setGroups(generatedGroups);
    setPickedGroup(null);
    setPickedGroupNumber(null);
  };

  const handleRandomGroup = () => {
    if (groups.length > 0) {
      const randomIndex = Math.floor(Math.random() * groups.length);
      setPickedGroupNumber(randomIndex + 1);
      setPickedGroup(randomIndex);
    }
  };

  const handleGroupSelect = (index) => {
    setPickedGroupNumber(index + 1);
    setPickedGroup(index);
  };

  useEffect(() => {
    socket.emit("receive_groups", { groups, sessionId });
  }, [groups]);

  useEffect(() => {
    socket.emit("select_group", { pickedGroupNumber, sessionId });
  }, [pickedGroup]);

  return (
    <Container>
      <Button onClick={onButtonClick}>Back</Button>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Group Mode</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={5}
          textAlign="center"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h4">Currently Picking On</Typography>
          <Paper sx={{ p: 1, textAlign: "center" }}>
            {pickedGroup === null ? "" : `Group ${pickedGroup + 1}`}
          </Paper>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Group Generator
          </Typography>
          <Typography variant="body1" sx={{ my: 1 }}>
            There are currently {onlineUsers.length} students currently logged
            in. How many groups would you like to create?
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Enter the number of groups here"
            fullWidth
            onChange={(event) => setGroupSize(event.target.value)}
          />
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={handleGroupGeneration}
          >
            Generate Groups
          </Button>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5} textAlign="center">
          <Typography variant="h4">Groups</Typography>
          <Box sx={{ boxShadow: 2 }}>
            {groups.map((group, index) => (
              <Accordion key={index} onClick={() => handleGroupSelect(index)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5">Group {index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "8px 16px" }}>
                  <List style={{ padding: 0 }}>
                    {group.map((member) => (
                      <ListItem
                        key={member + index}
                        style={{ padding: "4px 16px" }}
                      >
                        <ListItemText primary={member} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          <Button
            variant="contained"
            sx={{ margin: 2 }}
            onClick={handleRandomGroup}
          >
            PickOn a random group
          </Button>
          <Button variant="contained">Reset</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorGroup;
