import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import useAxios from "../services/axios";
import { removeCourse } from "../services/course/courses";

const ViewButton = ({ row }) => {
    const navigator = useNavigate();
    const handleEnter = (course) => {
        navigator(`/c/${course.crn}`, {
            state: {
                courseCRN: course.crn,
                courseYear: course.year,
                courseSemester: course.semester,
                courseCode: course.code,
                courseSection: course.section,
            },
        });
    };

    return (
        <Button onClick={() => handleEnter(row)}
            style={{ backgroundColor: "#2eb24d" }}
            variant="contained">
            View
        </Button>
    );

}

const RemoveButton = ({ row }) => {
    const { userId } = useAuth();
    const axiosInstance = useAxios();
    const handleRemove = async (course) => {
        const courseId = course._id;
        try {
            const response = await removeCourse(axiosInstance, { userId, courseId });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Button onClick={() => handleRemove(row)}
            style={{
                backgroundColor: "#e63946", color: "white",
            }}
            varint="contained" >
            Remove
        </Button >
    );
};

export const tableColumns = [
    { field: "name", headerName: "Course Name", width: 170 },
    { field: "code", headerName: "Code", width: 100 },
    {
        field: "instructor",
        headerName: "Instructor",
        width: 170,
    },
    {
        field: "section",
        headerName: "Section",
        width: 100,
    },
    {
        field: "semester",
        headerName: "Semester",
        width: 100,
    },
    {
        field: "year",
        headerName: "Year",
        width: 100,
    },
    {
        field: "edit",
        headerName: "Edit",
        width: 100,
        renderCell: ({ row }) => <Button variant="contained">Edit</Button>,
    },
    {
        field: "view",
        headerName: "View",
        width: 100,
        sortable: false,
        renderCell: ({ row }) => <ViewButton row={row} />,
    },
    {
        field: "delete",
        headerName: "Delete",
        width: 120,
        sortable: false,
        renderCell: ({ row }) => <RemoveButton row={row} />,
    },
]

export const tableRows = (courses) => {
    return courses.map((course, index) => {
        return {
            id: index + 1,
            name: course.courseName,
            code: course.courseCode,
            instructor: course.instructor,
            section: course.courseSection,
            semester: course.courseSemester,
            year: course.courseYear,
            crn: course.courseCRN,
            _id: course._id,
        };
    });
};