import * as React from 'react';
import {
  Button,
  Grid,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

const columns = [
  { id: 'name', label: 'Course Name', minWidth: 170 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'instructor',
    label: 'Instructor',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'section',
    label: 'Section',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'enter',
    label: 'Enter',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, instructor, section) {
  const edit = <Button variant="contained">Edit</Button>;
  const enter = <Button style={{
    backgroundColor: "#2eb24d"
  }} variant="contained">Enter</Button>;
  return { name, code, instructor, section, edit, enter};
}

const rows = [
  createData('Software Engineering I', 'ICS 314', 'Carleton Moore', 1),
  createData('Design for Mobile Devices', 'ICS 466', 'Philip Johnson', 1),
  createData('Written Communication', 'ENG 100', 'Dax Garcia', 2),
  createData('Machine-lvl & Systems Programg', 'ICS 312', 'Henri Casanova', 1),
  createData('Intermediate Japanese', 'JPN 201', 'Sean Forte', 2),
  createData('Capstone Project', 'ICS 496', 'Anthony Peruma', 1),
  createData('Discrete Math for CS I', 'ICS 141', 'Kyungim Baek', 2),
];
const ManageCourse = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return <Container>
      <Grid
        container
        spacing={0}
        alignItems='center'
        justifyContent={'center'}
      >
      <h1>Manage Courses</h1>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                </TableCell>
                            );
                          })}
                        </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid
          padding='5%'
          container
          spacing={0}
          alignItems='center'
          justifyContent={'center'}
      >
      <Button variant="contained">Add new</Button>
      </Grid>
    </Container>;
}

export default ManageCourse;