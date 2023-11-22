import { Box, Grid, Paper, Typography } from '@mui/material';

const leaderboard = [
  "1st: Dave",
  "2nd: Hayley",
  "3rd: Indah",
  "4th: Zane",
  "5th: Hop",
]
const StudentStandings = ({ onButtonClick, socket, sessionId }) => {

  socket.on('standings_finished', () => {
    onButtonClick();
  })

  return (
      <Box
          sx={{
            marginTop: 5,
            marginBottom: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
      >
        <Typography variant='h3'>You got the last question Correct!</Typography>
        <Grid container
              sx={{
                marginTop: 4,
                marginBottom: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              spacing={2}
        >
          <Typography variant='h6'>Standings</Typography>
          <Paper
              elevation={3}
              style={{
                padding: "20px",
                width: "30vw",
                height: "50vh",
                overflow: "auto",
              }}
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
          >
            {leaderboard.map((element) => (
                <Box
                    mt={1}
                    mb={1}
                    sx={{
                      width: "100%",
                      p: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                >
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                          variant="body1"
                          style={{
                            width: "100%",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                          }}
                      >
                        {element}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Typography>
                        9999
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
            ))}
          </Paper>
          <Typography variant='h4' sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>Your Score: 8952</Typography>
        </Grid>

      </Box>
  );
}

export default StudentStandings;