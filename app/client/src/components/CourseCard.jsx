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

const CourseCard = ({ data }) => {
  const { userRole } = useAuth();
  const navigator = useNavigate();

  const onButtonClick = () => {
    if (userRole === "student") {
      navigator(`/coursesession/${data.courseCRN}`, {
        state: {
          courseCRN: data.courseCRN,
          courseCode: data.courseCode,
          courseSection: data.courseSection,
        },
      });
    } else if (userRole === "instructor") {
      navigator(`/managecoursesession/${data.courseCRN}`);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: 300, height: 270, display: "flex", flexDirection: "column" }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.courseSemester} {data.courseYear} | Section:{data.courseSection}
        </Typography>
        <Typography variant="h5" component="div">
          {data.courseCode}
        </Typography>
        <Typography variant="h6" component="div">
          {data.courseName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.courseInstructor}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
        >
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={onButtonClick}>
          Enter
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
