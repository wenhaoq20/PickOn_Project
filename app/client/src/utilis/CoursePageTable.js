import React from "react";
import { Button } from "@mui/material";
import useAxios from "../services/axios";
import { removeStudent } from "../services/course/courses";

const EditButton = ({ row, handleOpen, handleSetEditCourse }) => {
    const handleEdit = (row) => {
        handleSetEditCourse(row._id);
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

const RemoveButton = ({ row, userId, courseInfo }) => {
    const axiosInstance = useAxios();
    const handleRemove = async (row) => {
        const studentUHId = row.uhid;
        try {
            const response = await removeStudent(axiosInstance, { studentUHId, userId, courseInfo });
            console.log(response);
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

export const tableColumns = (courseInfo, userId) => [
    {
        field: "name",
        headerName: "Name",
        width: 170,
    },
    {
        field: "email",
        headerName: "Email",
        width: 170,
    },
    {
        field: "uhid",
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
        renderCell: ({ row }) => <EditButton row={row} courseInfo={courseInfo} />,
    },
    {
        field: "delete",
        headerName: "Delete",
        width: 120,
        sortable: false,
        renderCell: ({ row }) => <RemoveButton row={row} userId={userId} courseInfo={courseInfo} />,
    },
];

export const tableRows = (students) => {
    return students.map((student, index) => {
        return {
            id: index + 1,
            name: student.name,
            email: student.email,
            uhid: student.uhid,
        };
    });
};