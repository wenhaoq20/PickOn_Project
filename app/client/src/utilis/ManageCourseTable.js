import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import useAxios from "../services/axios";
import { removeCourse } from "../services/course/courses";

/**
 * Component for the view button in the course table.
 * 
 * @component
 * @param {Object} row The row of the table
 * @returns {React.Element} The view button
 */
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

/**
 * Component for the remove button in the course table.
 * 
 * @component
 * @param {Object} row The row of the table
 * @returns {React.Element} The remove button
 */
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

/**
 * Component for the edit button in the course table.
 * 
 * @component
 * @param {Object} row The row of the table
 * @param {function} handleOpen Function to open the edit dialog
 * @param {function} handleSetEditCourse Function to set the course to edit
 * @returns {React.Element} The edit button
 */
const EditButton = ({ row, handleOpen, handleSetEditCourse }) => {
    const handleEdit = (row) => {
        handleSetEditCourse(row._id);
        handleOpen();
    }

    return (
        <Button variant="contained" onClick={() => handleEdit(row)}>
            Edit
        </Button>
    )
};

/**
 * The columns of the course table.
 * 
 * @param {function} handleOpen Function to open the edit dialog
 * @param {function} handleSetEditCourse Function to set the course to edit
 * @returns {Object[]} The columns of the course table
 */
export const tableColumns = (handleOpen, handleSetEditCourse) => [
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
        renderCell: ({ row }) => <EditButton row={row} handleOpen={handleOpen} handleSetEditCourse={handleSetEditCourse} />,
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
];

/**
 * The rows of the course table.
 * 
 * @param {Object[]} courses The courses to display
 * @returns {Object[]} The rows of the course table
 */
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