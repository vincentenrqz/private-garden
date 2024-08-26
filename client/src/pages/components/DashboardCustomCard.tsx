import React from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import TocIcon from "@mui/icons-material/Toc";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { findLatestUpdatedAt, formatReadableDate } from "../../utils";

type DashboardProps = {
  title: any;
  description: string;
  navigateTo: string;
  data: any;
};

const DashboardCustomCard = ({
  title,
  description,
  navigateTo,
  data,
}: DashboardProps) => {
  const navigate = useNavigate();

  const loweredTitle = title?.variant.toLowerCase();
  const latestUpdatedAt = formatReadableDate(
    new Date(findLatestUpdatedAt(data))
  );

  return (
    <div
      id={loweredTitle}
      className="border shadow-xl rounded-xl mt-6 p-4 bg-white"
    >
      <Stack direction="column" spacing={2}>
        <Grid
          container
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
          }}
          sx={{ alignContent: "center" }}
        >
          <Grid item display="column" xs={7}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ marginRight: 1 }}>{title?.avatar}</Avatar>
              <Typography variant="h6">{title?.variant}</Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="caption" align="justify">
                {description}
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="caption" className="text-gray-600">
                Updated {latestUpdatedAt ? latestUpdatedAt : ""}
              </Typography>
            </Box>
          </Grid>
          <Grid item display="flex" alignItems="center" xs={2}>
            <TocIcon fontSize="medium" className="text-blue-500" />
            <Typography variant="h6"> {data?.length}</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={() => navigate(navigateTo)}
              sx={{
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
      </Stack>
    </div>
  );
};

export default DashboardCustomCard;
