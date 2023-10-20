import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ModeCard({ title, description, image, altText, onButtonClick }) {
  return (
    <Card sx={{ backgroundColor: "white", minWidth: 300, maxWidth: 400 }}>
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
      <CardActions>
        <Button size="small" color="primary" onClick={onButtonClick}>
          Start
        </Button>
      </CardActions>
    </Card>
  );
}

export default ModeCard;
