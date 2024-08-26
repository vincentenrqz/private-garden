import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { IoIosInformationCircle } from "react-icons/io";
import { useScreenSize } from "../../context/MediaContext";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

interface Props {
  data: any;
  paperRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  readMore: boolean;
  toggleReadMore: () => void;
}
const CustomDrawer = ({
  data,
  paperRef,
  open,
  readMore,
  toggleReadMore,
}: Props) => {
  console.log("data", data);
  const screenSize = useScreenSize();

  const informationStyle =
    screenSize?.screenSize === "xs"
      ? { borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 40 }
      : { borderTopRightRadius: 10, borderBottomRightRadius: 10, height: 60 };

  return (
    <Paper
      ref={paperRef}
      sx={{
        position: "fixed",
        top: screenSize?.screenSize === "xs" ? "95%" : "10%",
        bottom: 0,
        left: screenSize?.screenSize === "xs" ? "50%" : "-43%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        height: "75vh",
        width: screenSize?.screenSize === "xs" ? "98%" : "90%",
        transition: "all 0.3s ease",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: screenSize?.screenSize === "xs" ? -40 : 20,
          right: screenSize?.screenSize === "xs" ? "10px" : "-50px",
          width: 50,
          backgroundColor: "rgba(237,233,146,255)",
          display: "flex",
          alignItems: "center",
          padding: 1,
          ...informationStyle,
        }}
      >
        <IoIosInformationCircle color="#2196f3" size="40px" />
      </Box>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            flex: 2,
            padding: 2,
            marginLeft: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6">Media</Typography>
            </Grid>
            <Grid item mt={4} display="flex" justifyContent="center">
              <Box
                width={500}
                height={250}
                className="bg-gray-300"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <OndemandVideoIcon
                  fontSize="large"
                  sx={{ height: 200, width: 200 }}
                />
              </Box>
            </Grid>
            <Grid item mt={3}>
              <Typography variant="h6">Etymology</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">{data?.etymology}</Typography>
            </Grid>
            <Grid item mt={1}>
              <Typography variant="h6">Description</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">{data?.description}</Typography>
            </Grid>
            <Grid item mt={1}>
              <Typography variant="h6">Scientific name</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">{data?.scientific_name}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            padding: 2,
          }}
        >
          {/* <Box sx={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button onClick={() => toggleReadMore()} sx={{ color: "black" }}>
              {open ? (readMore ? "Read less" : "Read more") : ""}
            </Button>
          </Box> */}
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h6">{data?.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{data?.name}</Typography>
            </Grid>
            <Grid item>
              <img
                src={`${import.meta.env.VITE_API_URL}uploads/${
                  data.attachments
                }`}
                alt=""
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </Grid>
          </Grid>
          <Grid item px={5}>
            <Typography variant="caption" sx={{ textAlign: "justify" }}>
              {data?.scientific_name}
            </Typography>
          </Grid>
          <Box
            sx={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button onClick={() => toggleReadMore()} sx={{ color: "black" }}>
              {open ? (readMore ? "Read less" : "Read more") : ""}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CustomDrawer;
