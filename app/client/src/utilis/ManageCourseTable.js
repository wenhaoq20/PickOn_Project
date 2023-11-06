import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";




const ViewButton = ({ row }) => {
    const navigator = useNavigate();
    const handleEnter = (course) => {
        navigator(`/c/${course.crn}`, {
            state: {
                courseCRN: course.crn,
                courseYear: course.year,
                courseSemester: course.semester,
            },
        });
    };

    return (<Button onClick={() => handleEnter(row)}
        style={{ backgroundColor: "#2eb24d" }}
        variant="contained">
        View
    </Button>
    );

}

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
        width: 170,
    },
    {
        field: "view",
        headerName: "View",
        width: 170,
        sortable: false,
        renderCell: ({ row }) => <ViewButton row={row} />,

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
        };
    });
};