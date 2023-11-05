export const tableColumns = [
    { id: "name", label: "Course Name", minWidth: 170 },
    { id: "code", label: "Code", minWidth: 100 },
    {
        id: "instructor",
        label: "Instructor",
        minWidth: 170,
    },
    {
        id: "section",
        label: "Section",
        minWidth: 100,
    },
    {
        id: "semester",
        label: "Semester",
        minWidth: 100,
    },
    {
        id: "year",
        label: "Year",
        minWidth: 100,
    },
    {
        id: "edit",
        label: "Edit",
        minWidth: 170,
    },
    {
        id: "enter",
        label: "Enter",
        minWidth: 170,
    },
]

export const tableRows = (courses) => {
    return courses.map((course) => {
        return {
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