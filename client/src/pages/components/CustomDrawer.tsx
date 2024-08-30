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
import ReactPlayer from "react-player";

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
  const screenSize = useScreenSize();
  console.log("screenSize", screenSize);
  const informationStyle =
    screenSize?.screenSize === "xs"
      ? { borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 40 }
      : { borderTopRightRadius: 10, borderBottomRightRadius: 10, height: 60 };

  const drawerSize =
    screenSize?.screenSize === "xs"
      ? "98%"
      : screenSize?.screenSize === "sm"
      ? "-2%"
      : screenSize?.screenSize === "xl"
      ? "70%"
      : "90%";

  const leftPosition =
    screenSize?.screenSize === "xs"
      ? "50%"
      : screenSize?.screenSize === "sm"
      ? "-10%"
      : screenSize?.screenSize === "xl"
      ? "-32%"
      : "-43%";

  console.log("data", data?.video);
  return (
    <Paper
      ref={paperRef}
      sx={{
        position: "fixed",
        top: screenSize?.screenSize === "xs" ? "95%" : "10%",
        bottom: 0,
        left: leftPosition,
        transform: "translateX(-50%)",
        zIndex: 1000,
        height: "80vh",
        width: drawerSize,
        transition: "all 0.3s ease",
        overflow: "visible",
        borderRadius: "25px",
      }}
      elevation={5}
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
            flex: 1,
            paddingLeft: 3,
            paddingRight: screenSize?.screenSize === "xl" ? 40 : 3,
            paddingY: 2,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="bg-drawer-left-page"
        >
          <div className="absolute inset-0 bg-grid-lines-vertical z-0 m-5"></div>
          <div className="absolute inset-0 bg-grid-lines-horizontal z-0 m-5"></div>

          <Grid
            container
            direction="column"
            sx={{ position: "relative", zIndex: 10 }}
          >
            <Grid item>
              <Typography variant="h6">Media</Typography>
            </Grid>
            <Grid item mt={1} display="flex" justifyContent="center">
              <ReactPlayer
                url={data?.video}
                controls
                width={500}
                height={300}
              />
            </Grid>
            <Grid item mt={3}>
              <Typography variant="h6" className="uppercase">
                Etymology:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{data?.etymology}</Typography>
            </Grid>
            <Grid item mt={1}>
              <Typography variant="h6" className="uppercase">
                Notable Remarks
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{data?.description}</Typography>
            </Grid>
            <Grid item mt={1}>
              <Typography variant="h6" className="uppercase">
                Cultural Maintenance
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" className="">
                {data?.cultural_maintenance}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box sx={{ flex: 1 }} className="bg-drawer-right-page">
          <div className="absolute inset-0 bg-grid-lines-vertical z-0 my-5"></div>
          <div className="absolute inset-0 bg-grid-lines-horizontal z-0 my-5"></div>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            paddingY: 2,
            paddingRight: 3,
            position: "relative",
          }}
          className="bg-drawer-right-page"
        >
          <div className="absolute inset-0 bg-grid-lines-vertical z-0 my-5"></div>
          <div className="absolute inset-0 bg-grid-lines-horizontal z-0 my-5"></div>
          <Grid
            container
            direction="column"
            alignItems="center"
            sx={{ position: "relative", zIndex: 10 }}
          >
            <Grid item>
              <Typography variant="h5" fontWeight="bold">
                {data?.name} '{data?.sub_name}'
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className="italic">
                {data?.scientific_name}
              </Typography>
            </Grid>
            <Grid
              item
              mt={1}
              height={400}
              width={300}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src={data?.attachments}
                alt=""
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "none",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item mt={3}>
              <Box
                display="flex"
                flexDirection="column"
                className="bg-orange-200 bg-opacity-60"
                p={2}
              >
                <Typography variant="body2" sx={{ textAlign: "justify" }}>
                  Fun fact:
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "justify" }}>
                  {data?.fun_fact}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              position: "relative",
              marginTop: "auto",
              display: "flex",
              justifyContent: "end",
              bottom: 30,
              zIndex: 999,
            }}
          >
            <Button onClick={() => toggleReadMore()} sx={{ color: "black" }}>
              <Typography variant="caption">
                {open ? (readMore ? "Read less" : "Read more") : ""}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CustomDrawer;
