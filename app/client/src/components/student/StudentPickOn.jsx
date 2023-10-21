import React from "react";
import { useState } from "react";
import { Box, Button, Grid } from "@mui/material";

const StudentPickOn = () => {
  const [message, setMessage] = useState(
    "You have not been picked on this session."
  );

  return (
    <Grid Container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 30,
        }}
      >
        <Box
          component="div"
          sx={{
            display: "inline",
            p: 1,
            m: 1,
            border: "1px solid",
            borderRadius: 2,
            fontSize: "3rem",
            fontWeight: "700",
          }}
        >
          {message}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => {
            setMessage("You have been picked on this session.");
          }}
        >
          Volunteer
        </Button>
      </Grid>
    </Grid>
  );
};

export default StudentPickOn;
