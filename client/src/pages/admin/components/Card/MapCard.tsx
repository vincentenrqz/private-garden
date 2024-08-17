import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

export default function MapCard() {
  const navigate = useNavigate();

  return (
    <Card id="maps" sx={{ position: "relative", zIndex: 1 }} className="mt-10">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={7}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Maps
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ marginTop: "1rem" }}
              >
                The user settings feature allows for the modification of
                existing user information or the creation of new user profiles.
                This functionality is primarily based on identifying users
                through their name, username, and password.
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
                sx={{ marginTop: "1rem" }}
              >
                Updated at
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            xs
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => navigate("/admin/maps")}
              sx={{
                position: "absolute",
                right: 10,
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              <ArrowForwardIosIcon className="hover:text-blue-400 transition-all" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
