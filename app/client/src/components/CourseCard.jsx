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

/**
 * Component for the course card in CourseList.
 *
 * @component
 * @param {Object} props Component props
 * @param {Object} props.data Course data
 * @returns {React.ReactElement} The course card.
 */
const CourseCard = ({ data }) => {
  const { userRole } = useAuth();
  const navigator = useNavigate();
  const now = new Date().toLocaleTimeString("en-GB");

  const onButtonClick = () => {
    if (userRole === "student") {
      navigator(`/cs/${data.courseCRN}`, {
        state: {
          courseCRN: data.courseCRN,
          courseCode: data.courseCode,
          courseSection: data.courseSection,
        },
      });
    } else if (userRole === "instructor") {
      navigator(`/mcs/${data.courseCRN}`);
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
        {userRole !== "instructor" ? (
          <Button
            size="small"
            variant="contained"
            onClick={onButtonClick}
            disabled={!(now >= data.startTime && now < data.endTime)}
          >
            Enter
          </Button>
        ) : (
          <Button size="small" variant="contained" onClick={onButtonClick}>
            Enter
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseCard;
