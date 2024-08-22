import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { IoIosInformationCircle } from "react-icons/io";
import { useScreenSize } from "../../context/MediaContext";

interface Props {
  data: any;
  paperRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  readMore: boolean;
  toggleReadMore: () => void;
}
const CustomDrawer = ({ paperRef, open, readMore, toggleReadMore }: Props) => {
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
            backgroundColor: "lightblue",
            padding: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Content 1
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            padding: 2,
          }}
        >
          <Box sx={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button onClick={() => toggleReadMore()} sx={{ color: "black" }}>
              {open ? (readMore ? "Read less" : "Read more") : ""}
            </Button>
          </Box>
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
