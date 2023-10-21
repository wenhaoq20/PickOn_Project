import React, { useState } from "react";
import { Container, Box, Typography, Stack, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import Navbar from "../../components/Navbar";
import ModeCard from "../../components/instructor/ModeCard";
import InstructorAnonymous from "../../components/instructor/InstructorAnonymous";
import InstructorGroup from "../../components/instructor/InstructorGroup";
import InstructorPickOn from "../../components/instructor/InstructorPickOn";

const defaultTheme = createTheme();
const socket = io.connect("http://localhost:5000");

const ManageCourseSession = () => {
  const modeCardData = [
    {
      title: "Competition",
      description:
        "Competition mode in which students will answer questions as fast as they can. Each question gives a score based on the student's speed as well as the accuracy of their answer. Scores will be tracked and displayed throughout the mode, and the student's final placements will be determined by their ending score.",
      image:
        "https://i0.wp.com/www.campuzine.com/wp-content/uploads/2022/01/The-6-Best-Contest-Software.jpg?fit=1000%2C662&ssl=1",
      altText: "competition",
    },
    {
      title: "Group",
      description:
        "Cooperative mode in which students are randomly divided into groups. Students will work together to come up with answers as a group which will be submitted at the end of the allotted time.",
      image:
        "https://media.istockphoto.com/id/1349031644/vector/womens-career-concept.jpg?s=612x612&w=0&k=20&c=hDbGnrU1ui659lOVde4w4MN28ECIPoPP1nsdMAh1dkc=",
      altText: "group",
    },
    {
      title: "Anonymous Submission",
      description:
        "Students will submit answers individually in this game mode while being completely anonymous. Answers will be received by the instructor and may be displayed, but there will be no indication of who the answer belongs to. Mode made to encourage participation and remove fear of judgement.",
      image:
        "https://media.istockphoto.com/id/1364830492/vector/avatar-of-graduate-student-portraits-of-anonymous-people-set-of-silhouettes-vector.jpg?s=612x612&w=0&k=20&c=df8Jc0SjF9IpW1TWTn_09dc5PI8ytUQGLRF8Hafyxvk=",
      altText: "anonymous",
    },
    {
      title: "PickOn",
      description:
        "Mode in which students are 'picked on' randomly from available students in the student roster. Selections are such that all students will have chances to answer. Students may also elect to volunteer themselves to answer, in which case they will be considered 'picked' and won't be randomly selected until everyone has been 'picked on'.",
      image:
        "https://cdn2.iconfinder.com/data/icons/hand-conversation/91/Hand_53-512.png",
      altText: "pickon",
    },
  ];

  const [sessionMode, setSessionMode] = useState("home");

  const selectMode = (mode) => {
    socket.emit("select_mode", mode);
    setSessionMode(mode);
  };

  const baseScreen = () => {
    return (
      <>
        <Container component="main">
          <Box
            sx={{
              marginTop: 5,
              marginBottom: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Choose a mode</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            {modeCardData.map((card, index) => (
              <ModeCard
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
                altText={card.altText}
                onButtonClick={() => selectMode(card.altText)}
              />
            ))}
          </Stack>
        </Container>
      </>
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar name="Session Manager" redirect={true} />
      {sessionMode === "home" && baseScreen()}
      {sessionMode === "competition" && <div>competition</div>}
      {sessionMode === "group" && (
        <InstructorGroup onButtonClick={() => selectMode("home")} />
      )}
      {sessionMode === "anonymous" && (
        <InstructorAnonymous onButtonClick={() => selectMode("home")} />
      )}
      {sessionMode === "pickon" && (
        <InstructorPickOn onButtonClick={() => selectMode("home")} />
      )}
    </ThemeProvider>
  );
};

export default ManageCourseSession;
