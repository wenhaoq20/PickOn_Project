import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

/**
 * Component for the mode card in InstructorLobby.
 * 
 * @component
 * @param {Object} props Component props
 * @param {string} props.title The title of the mode.
 * @param {string} props.description The description of the mode.
 * @param {string} props.image The image of the mode.
 * @param {string} props.altText The alt text of the image.
 * @param {function} props.onButtonClick The function to call when the button is clicked.
 * @returns {React.ReactElement} The mode card.
 */
const ModeCard = ({ title, description, image, altText, onButtonClick }) => {
  return (
    <Card
      sx={{ backgroundColor: "white", minWidth: 300, maxWidth: 400 }}
      onClick={onButtonClick}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={altText} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Mode: {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ModeCard;
