import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function ModeCard({ title, description, image, altText, onButtonClick }) {
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
