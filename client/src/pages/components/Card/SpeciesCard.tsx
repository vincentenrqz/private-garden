import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useFetchData } from "../../../utils/queries";
import { findLatestUpdatedAt, formatReadableDate } from "../../../utils";

export default function SpeciesCard() {
  const { speciesData } = useFetchData();
  const navigate = useNavigate();

  const latestUpdatedAt = formatReadableDate(
    new Date(findLatestUpdatedAt(speciesData))
  );

  return (
    <Card
      id="species"
      sx={{ position: "relative", zIndex: 1 }}
      className="mt-7"
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={7}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Species
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
                File. This feature allows for the modification of exisiting
                Species Data or the creation of new Species. This functionality
                is priamrily based on identifying users throught their Name, Sub
                Name, Type Id, Species Id, Scientific Name, Etymology,
                description and attachments
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
                sx={{ marginTop: "1rem" }}
              >
                Updated {latestUpdatedAt ? latestUpdatedAt : ""}
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
            <Typography fontWeight="bold">{speciesData?.length}</Typography>
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
