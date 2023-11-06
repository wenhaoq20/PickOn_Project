export const tableColumns = [
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
        headerName: "points",
        width: 170,
    },
    {
        field: "edit",
        headerName: "Edit",
        width: 170,
    },
    {
        field: "delete",
        headerName: "Delete",
        width: 170,
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