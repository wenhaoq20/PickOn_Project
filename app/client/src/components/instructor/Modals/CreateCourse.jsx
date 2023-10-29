import React, { useState } from "react";
import { Modal, Box, TextField } from "@mui/material";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseSection: "",
    courseCRN: "",
    courseName: "",
    courseSemester: "",
    instructor: "",
    description: "",
  });
  <Modal></Modal>;
};

export default CreateCourse;
