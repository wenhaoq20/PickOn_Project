import React from "react";
import { Box, Container, Typography, Stack } from "@mui/material";
import ModeCard from "./cards/ModeCard";
import { modeData } from "../../public/data/modesInfo.js";

/**
 * Component for the instructor lobby for courseSession.
 * 
 * @component
 * @param {function} props.handleSelectMode The function to handle the mode selection.
 * @returns {React.ReactElement} The instructor lobby component.
 */
const InstructorLobby = ({ handleSelectMode }) => {
  const modeCardData = modeData;
  return (
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
            onButtonClick={() => handleSelectMode(card.altText)}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default InstructorLobby;
