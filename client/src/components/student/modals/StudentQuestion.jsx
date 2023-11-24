import { Box, Button, Grid, Stack, Typography } from '@mui/material';

const StudentQuestion = () => {
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
        <Typography variant="h3">What is the capital of South Korea?</Typography>
        <Typography
            variant="h6"
            sx={{
              marginTop: 5,
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
        >Seconds remaining: 15</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack
                sx={{
                  marginTop: 5,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                spacing={3}
            >
              <Button variant="contained" color="primary" style={{minHeight: '150px', minWidth: '600px'}}>Busan</Button>
              <Button variant="contained" color="error" style={{minHeight: '150px', minWidth: '600px'}}>Seoul</Button>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
                sx={{
                  marginTop: 5,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                spacing={3}
            >
              <Button variant="contained" color="success" style={{minHeight: '150px', minWidth: '600px'}}>Daejeon</Button>
              <Button variant="contained" color="warning" style={{minHeight: '150px', minWidth: '600px'}}>Ulsan</Button>
            </Stack>
          </Grid>
        </Grid>
        <Typography
            sx={{
              marginTop: 8,
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
        >Answers received: 7</Typography>
      </Box>
  );
}

export default StudentQuestion();