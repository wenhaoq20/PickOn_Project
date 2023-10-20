import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const CourseCard = () => {
  const { userRole } = useAuth();
  const navigator = useNavigate();
  const onButtonClick = () => {
    if (userRole === "stundet") {
      navigator("/coursesession");
    } else if (userRole === "instructor") {
      navigator("/managecoursesession");
    }
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Semester Section
        </Typography>
        <Typography variant="h5" component="div">
          Course Title
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Instructor
        </Typography>
        <Typography variant="body2">Description of course</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onButtonClick}>
          Enter
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
