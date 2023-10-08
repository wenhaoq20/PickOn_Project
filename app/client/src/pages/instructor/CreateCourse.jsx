import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Stack
} from '@mui/material';
import { Link } from "react-router-dom"

const CreateCourse = () => {
  const [courseName, setCourseName] = useState('')
  const [code, setCode] = useState('')
  const [instructor, setInstructor] = useState('')
  const [section, setSection] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    console.log(courseName, code, instructor, section, description)
  }

  return (
      <Container>
        <React.Fragment>
          <Grid
              container
              alignItems='center'
              justifyContent='center'
          >
            <h1>Create Course</h1>
          </Grid>
          <form onSubmit={handleSubmit} action={<Link to="/login"/>}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Course Name"
                  onChange={e => setCourseName(e.target.value)}
                  value={courseName}
                  fullWidth
                  required
              />
              <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Code"
                  onChange={e => setCode(e.target.value)}
                  value={code}
                  fullWidth
                  required
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Instructor"
                  onChange={e => setInstructor(e.target.value)}
                  value={instructor}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
              />
              <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Section"
                  onChange={e => setSection(e.target.value)}
                  value={section}
                  required
                  fullWidth
                  sx={{ mb: 4 }}
              />
            </Stack>
            <TextField
                type="text"
                variant='outlined'
                color='secondary'
                label="Description"
                onChange={e => setDescription(e.target.value)}
                value={description}
                fullWidth
                required
                sx={{ mb: 4 }}
            />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
              <Button variant="outlined" color="secondary" type="submit">Create</Button>
              <small><Link to="/managecourse">Return to Course Manager</Link></small>
            </Grid>
          </form>

        </React.Fragment>
      </Container>
  )
}

export default CreateCourse;