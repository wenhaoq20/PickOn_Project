import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
  Typography,
  Button,
    Stack,
} from '@mui/material';

const ManageCourseSession = () => {
  return <Container>
    <Grid
        container
        spacing={3}
        alignItems='center'
        justifyContent={'center'}
    >
      <h1>PickOn Session Manager</h1>
    </Grid>
    <Grid
        container
        spacing={3}
        alignItems='center'
        justifyContent={'center'}
    >
      <h2>Choose a mode</h2>
    </Grid>
    <Stack direction="row" spacing={2}>
    <Card sx={{ backgroundColor: 'white', minWidth: 300, maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
            component="img"
            height="140"
            image="https://i0.wp.com/www.campuzine.com/wp-content/uploads/2022/01/The-6-Best-Contest-Software.jpg?fit=1000%2C662&ssl=1"
            alt="competition"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Mode: Game
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Competition mode in which students will answer questions as fast as they can. Each question gives a score based on the student's speed as well as the accuracy of their answer. Scores will be tracked and displayed throughout the
            mode, and the student's final placements will be determined by their ending score.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Start
        </Button>
      </CardActions>
    </Card>
      <Card sx={{ backgroundColor: 'white', minWidth: 300, maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
              component="img"
              height="140"
              image="https://media.istockphoto.com/id/1349031644/vector/womens-career-concept.jpg?s=612x612&w=0&k=20&c=hDbGnrU1ui659lOVde4w4MN28ECIPoPP1nsdMAh1dkc="
              alt="group"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Mode: Group
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cooperative mode in which students are randomly divided into groups. Students will work together to come up with answers as a group which will be submitted at the end of the allotted time.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Start
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ backgroundColor: 'white', minWidth: 300, maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
              component="img"
              height="140"
              image="https://media.istockphoto.com/id/1364830492/vector/avatar-of-graduate-student-portraits-of-anonymous-people-set-of-silhouettes-vector.jpg?s=612x612&w=0&k=20&c=df8Jc0SjF9IpW1TWTn_09dc5PI8ytUQGLRF8Hafyxvk="
              alt="anonymous"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Mode: Anonymous Submission
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Students will submit answers individually in this game mode while being completely anonymous. Answers will be received by the instructor and may be displayed, but there will be no indication of who the answer belongs to. Mode made to encourage participation and remove fear of judgement.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Start
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ backgroundColor: 'white', minWidth: 300, maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
              component="img"
              height="140"
              image="https://cdn2.iconfinder.com/data/icons/hand-conversation/91/Hand_53-512.png"
              alt="pickon"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Mode: PickOn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mode in which students are "picked on" randomly from available students in the student roster. Selections are such that all students will have chances to answer. Students may also elect to volunteer themselves to answer, in which case they will be considered "picked" and won;t be randomly selected until everyone has been "picked on".
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Start
          </Button>
        </CardActions>
      </Card>
    </Stack>
  </Container>
}

export default ManageCourseSession;