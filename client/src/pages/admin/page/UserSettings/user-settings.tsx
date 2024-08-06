import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import Header from "../../components/Header/Header";

export default function UserSettings() {
  //TODO: FETCH DATA FROM THE SESSION
  //TODO: STORE FETCHED DATA AS A INITIAL VALUE
  //TODO: ONCLICK FUNCTION TO UPDATE USER SETTINGS
  //TODO: TOAST
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="3rem"
        >
          <Card sx={{ maxWidth: 500, width: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                User Settings
              </Typography>
              <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth>
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
