import React from "react";
import { Button } from "@mui/material";
import useAxios from "../services/axios";
import { removeStudent } from "../services/course/courses";

const EditButton = ({ row, handleOpen, handleSetEditStudent }) => {
    const handleEdit = (row) => {
        handleSetEditStudent(row._id);
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
        const uhId = row.uhId;
        try {
            const response = await removeStudent(axiosInstance, { uhId, userId, courseInfo });
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
        renderCell: ({ row }) => <EditButton row={row} courseInfo={courseInfo} handleOpen={handleOpen} handleSetEditStudent={handleSetEditStudent} />,
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
            firstName: student.firstName,
            lastName: student.lastName,
            middleName: student.middleName,
            email: student.email,
            uhId: student.uhId,
        };
    });
};