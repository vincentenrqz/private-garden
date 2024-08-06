import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useFetchData } from "../../utils/queries";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export default function SpeciesCard() {
  const { typesData } = useFetchData();

  const navigate = useNavigate();

  return (
    <Card
      id="types"
      sx={{ display: "flex", position: "relative", zIndex: 1 }}
      className="mt-10"
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
        alt="Live from space album cover"
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={7}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Types
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ marginTop: "1rem" }}
              >
                This feature allows for the modification of existing Types Data
                or the creation of new Types. This functionality is primarily
                based on identifying users through their Name, Type Id and Icon
                File.
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
            <FormatListBulletedIcon
              sx={{ fontSize: "1.3rem" }}
              className="text-blue-700"
            />
            <Typography fontWeight="bold">{typesData?.length}</Typography>
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
              onClick={() => navigate("/admin/species")}
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
