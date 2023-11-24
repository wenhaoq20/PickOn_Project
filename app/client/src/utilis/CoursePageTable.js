import React from "react";
import { Button } from "@mui/material";
import useAxios from "../services/axios";
import { removeStudent } from "../services/course/courses";

/**
 * Component for the edit button in the student table.
 * 
 * @component
 * @param {Object} row The row of the table
 * @param {function} handleOpen Function to open the edit student modal
 * @param {function} handleSetEditStudent Function to set the student to edit
 * @returns {React.Element} The edit button
 */
const EditButton = ({ row, handleOpen, handleSetEditStudent }) => {
    const handleEdit = () => {
        handleSetEditStudent(row);
        handleOpen();
    };

    return (
        <Button
            onClick={() => handleEdit(row)}
            style={{ backgroundColor: "#2eb24d" }}
            variant="contained"
        >
            Edit
        </Button>
    );
}

/**
 * Component for the remove button in the student table.
 * 
 * @component
 * @param {Object} row The row of the table
 * @param {string} userId The user's ID
 * @param {Object} courseInfo The course information
 * @returns {React.Element} The remove button
 */
const RemoveButton = ({ row, userId, courseInfo }) => {
    const axiosInstance = useAxios();
    const handleRemove = async (row) => {
        const uhId = row.uhId;
        try {
            const response = await removeStudent(axiosInstance, { uhId, userId, courseInfo });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button
            style={{
                backgroundColor: "#e63946",
                color: "white",
            }}
            varint="contained"
            onClick={() => handleRemove(row)}
        >
            Remove
        </Button>
    );
}

/**
 * The columns for the student table.
 * 
 * @param {Object} courseInfo The student information
 * @param {string} userId The user's ID
 * @param {function} handleOpen Function to open the edit student modal
 * @param {function} handleSetEditStudent Function to set the student to edit
 * @returns {Array} The array of columns
 */
export const tableColumns = (courseInfo, userId, handleOpen, handleSetEditStudent) => [
    {
        field: "firstName",
        headerName: "First Name",
        width: 170,
    },
    {
        field: "lastName",
        headerName: "Last Name",
        width: 170,
    },
    {
        field: "middleName",
        headerName: "Middle Name",
        width: 120,
    },
    {
        field: "email",
        headerName: "Email",
        width: 170,
    },
    {
        field: "uhId",
        headerName: "UHID",
        width: 170,
    },
    {
        field: "points",
        headerName: "Points",
        width: 170,
    },
    {
        field: "edit",
        headerName: "Edit",
        width: 120,
        sortable: false,
        renderCell: ({ row }) => <EditButton row={row} handleOpen={handleOpen} handleSetEditStudent={handleSetEditStudent} />,
    },
    {
        field: "delete",
        headerName: "Delete",
        width: 120,
        sortable: false,
        renderCell: ({ row }) => <RemoveButton row={row} userId={userId} courseInfo={courseInfo} />,
    },
];

/**
 * The rows for the student table.
 * 
 * @param {Array} students The array of students
 * @returns {Array} The array of rows
 */
export const tableRows = (students) => {
    return students.map((student, index) => {
        return {
            id: index + 1,
            firstName: student.firstName,
            lastName: student.lastName,
            middleName: student.middleName,
            email: student.email,
            uhId: student.uhId,
        };
    });
};