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
        field: "enter",
        headerName: "Enter",
        width: 170,
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