import React from "react";
import {
  Box,
  Button,
  Fade,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { IoIosInformationCircle } from "react-icons/io";
import { useScreenSize } from "../../context/MediaContext";
import ReactPlayer from "react-player";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

interface Props {
  data: any;
  paperRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  readMore: boolean;
  toggleReadMore: () => void;
  toggleInfo: () => void;
}
const CustomDrawer = ({
  data,
  paperRef,
  open,
  readMore,
  toggleReadMore,
  toggleInfo,
}: Props) => {
  const { screenSize } = useScreenSize();
  const screenType = screenSize;

  const informationStyle =
    screenSize === "xs"
      ? { borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 40 }
      : { borderTopRightRadius: 10, borderBottomRightRadius: 10, height: 60 };

  const drawerSize = () => {
    switch (screenType) {
      case "xs":
      case "sm":
        return "98%";
      case "xl":
        return "70%";
      default:
        return "90%";
    }
  };

  const leftPosition = () => {
    switch (screenType) {
      case "xs":
        return "50%";
      case "sm":
        return "50%";
      case "xl":
        return "-32%";
      default:
        return "-43%";
    }
  };

  const mediaPlayerSize = () => {
    switch (screenType) {
      case "md":
        return 420;
      case "lg":
        return 500;
      case "xl":
        return 550;
      default:
        return 500;
    }
  };

  const variantSize = () => {
    switch (screenType) {
      case "md":
        return "h6";
      case "lg":
      case "xl":
        return "h5";
      default:
        return "h5";
    }
  };

  const fields = [
    { label: "Family name", value: data?.family_name },
    { label: "Eco class", value: data?.eco_class },
    { label: "Type of plant growth", value: data?.type_of_plant_growth },
    { label: "Native distribution", value: data?.native_distribution },
    { label: "Native habitat", value: data?.native_habitat },
    { label: "Preferred climate zone", value: data?.preferred_climate_zone },
    { label: "Growth form", value: data?.growth_form },
    { label: "Trunk", value: data?.trunk },
    { label: "Foliage", value: data?.foliage },
    { label: "Flower", value: data?.flower },
    { label: "Fruit", value: data?.fruit },
    {
      label: "Plant rootzone tolerance",
      value: data?.plant_rootzone_tolerance,
    },
    { label: "Light preference", value: data?.light_preference },
    { label: "Water preference", value: data?.water_preference },
    { label: "Pollination", value: data?.pollination },
    { label: "Propagation", value: data?.propagation },
    { label: "Ethnobotanical uses", value: data?.ethnobotanical_uses },
    { label: "Landscape uses", value: data?.landscape_uses },
    { label: "Thematic landscaping", value: data?.thematic_landscaping },
  ];

  return (
    <div style={{ position: "relative" }}>
      <Paper
        ref={paperRef}
        elevation={3}
        sx={{
          position: "fixed",
          top: screenType === "xs" || screenType === "sm" ? "95%" : "10%",
          left: leftPosition(),
          bottom: 0,
          transform: "translateX(-50%)",
          zIndex: 1000,
          height: screenType === "xs" || screenType === "sm" ? "auto" : "80vh",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
          overflowY: {
            xs: "auto",
            sm: "auto",
            md: "visible",
            lg: "visible",
            xl: "visible",
          },
          width: drawerSize(),
          transition: "all 0.3s ease",
          overflow:
            screenType === "xs" || screenType === "sm" ? "auto" : "visible",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          borderRadius: "15px",
        }}
      >
        {screenType !== "xs" && screenType !== "sm" && (
          <Box
            onClick={() => toggleInfo()}
            sx={{
              position: "absolute",
              top: screenType === "xs" || screenType === "sm" ? 10 : 20,
              right:
                screenType === "xs" || screenType === "sm" ? "10px" : "-50px",
              width: 50,
              backgroundColor: "rgba(237,233,146,255)",
              display: "flex",
              alignItems: "center",
              padding: 1,
              ...informationStyle,
              zIndex: 2000,
            }}
          >
            <IoIosInformationCircle color="#2196f3" size="40px" />
          </Box>
        )}
        <Box
          sx={{
            order: {
              xs: 1,
              sm: 1,
              md: 3,
            },
            flex: {
              xs: "1 1 auto",
              md: "1 1 25%",
            },
            padding: 2,
            position: "relative",
            overflow: screenType === "md" ? "auto" : "visible",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="bg-drawer-right-page"
        >
          <div className="absolute inset-0 bg-grid-lines-vertical z-0 my-5"></div>
          <div className="absolute inset-0 bg-grid-lines-horizontal z-0 my-5"></div>
          {Object.keys(data).length !== 0 ? (
            <Grid
              container
              direction={
                screenType === "xs" || screenType === "sm" ? "row" : "column"
              }
              alignItems={
                screenType === "xs" || screenType === "sm"
                  ? "flex-start"
                  : "center"
              }
              spacing={2}
              sx={{
                position: "relative",
                zIndex: 10,
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                mt={screenType === "xs" || screenType === "sm" ? 2 : 0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  order: screenType === "xs" || screenType === "sm" ? 1 : 2,
                  width:
                    screenType === "xs"
                      ? "150px"
                      : screenType === "sm"
                      ? "300px"
                      : "auto",
                  height:
                    screenType === "xs" || screenType === "sm"
                      ? "300px"
                      : "150px",
                  maxWidth:
                    screenType === "xs"
                      ? "400px"
                      : screenType === "sm"
                      ? "300px"
                      : "100%",
                  maxHeight:
                    screenType === "xs" || screenType === "sm"
                      ? "300px"
                      : "500px",
                }}
              >
                <Box
                  className="w-[90%] h-full bg-gray-200 flex justify-center items-center rounded-md"
                  sx={{
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                >
                  {data?.attachments ? (
                    <img
                      src={data.attachments}
                      alt="Thumbnail"
                      className="w-full h-full rounded-md"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                display="flex"
                flexDirection="column"
                alignItems={
                  screenType === "xs" || screenType === "sm"
                    ? "flex-start"
                    : "center"
                }
                sx={{
                  order: screenType === "xs" || screenType === "sm" ? 2 : 1,
                  textAlign:
                    screenType === "xs" || screenType === "sm"
                      ? "left"
                      : "center",
                }}
              >
                <Box mt={2}>
                  <Typography variant={variantSize()} fontWeight="bold">
                    {data?.name} {data?.sub_name ? `'${data?.sub_name}'` : ""}
                  </Typography>
                  <Typography variant="h6" className="italic">
                    {data?.scientific_name}
                  </Typography>
                </Box>
                {(screenType === "xs" || screenType === "sm") && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    className="bg-orange-200 bg-opacity-60"
                    p={2}
                    width="100%"
                    maxWidth={400}
                    textAlign={
                      screenType === "xs" || screenType === "sm"
                        ? "left"
                        : "center"
                    }
                    mt={10}
                    sx={{
                      overflow: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                    height={120}
                  >
                    <Typography variant="body2" sx={{ textAlign: "justify" }}>
                      Fun fact:
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "justify" }}>
                      {data?.fun_fact}
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                display="flex"
                flexDirection="column"
                alignItems={
                  screenType === "xs" || screenType === "sm"
                    ? "flex-start"
                    : "center"
                }
                sx={{
                  order: screenType === "xs" || screenType === "sm" ? 3 : 3,
                  textAlign:
                    screenType === "xs" || screenType === "sm"
                      ? "left"
                      : "center",
                }}
              >
                {screenType !== "xs" && screenType !== "sm" && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    className="bg-orange-200 bg-opacity-60"
                    p={2}
                    width="100%"
                    maxWidth={400}
                    textAlign={
                      screenType === "xs" || screenType === "sm"
                        ? "left"
                        : "center"
                    }
                    sx={{
                      overflow: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                    height={100}
                  >
                    <Typography variant="body2" sx={{ textAlign: "justify" }}>
                      Fun fact:
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "justify" }}>
                      {data?.fun_fact}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="middle"
              height={
                screenType !== "xs" && screenType !== "sm" ? "100vh" : "auto"
              }
              sx={{ position: "relative", zIndex: 10, bottom: 100 }}
            >
              <Typography variant="h5">Please select a species</Typography>
              <Typography variant="subtitle1">
                You are required to select any type of species from the map
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            order: {
              xs: 2,
              sm: 2,
              md: 1,
            },
            flex: {
              xs: "1 1 auto",
              md: "1 1 50%",
            },
            padding: 2,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
          className={`${
            screenSize === "xs" || screenSize === "sm"
              ? "bg-drawer-right-page"
              : "bg-drawer-left-page"
          }`}
        >
          <div className="absolute inset-0 bg-grid-lines-vertical z-0 m-5"></div>
          <div className="absolute inset-0 bg-grid-lines-horizontal z-0 m-5"></div>
          {data && (
            <Box
              sx={{
                position: "relative",
                overflowY: "auto",
                maxHeight: "calc(100vh - 100px)",
                padding: 2,
                paddingBottom:
                  screenType === "xs" || screenType === "sm" ? 0 : 4,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                height: "100%",
              }}
            >
              <Grid
                container
                display="flex"
                justifyContent="center"
                flexDirection="column"
                sx={{
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <Grid item>
                  <Typography variant="h6">Media</Typography>
                </Grid>
                <Grid item display="flex" justifyContent="center" mt={2}>
                  <ReactPlayer
                    url={data?.video}
                    controls
                    width={mediaPlayerSize()}
                    height={300}
                  />
                </Grid>
                <Stack mt={3} direction="column" spacing={2}>
                  <Box>
                    <Typography variant="h6" className="uppercase">
                      Etymology:
                    </Typography>
                    <Typography variant="subtitle1">
                      {data?.etymology}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" className="uppercase">
                      Notable Remarks
                    </Typography>
                    <Typography variant="subtitle1">
                      {data?.description}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" className="uppercase">
                      Cultural Maintenance
                    </Typography>
                    <Typography variant="subtitle1">
                      {data?.cultural_maintenance}
                    </Typography>
                  </Box>
                  {screenType !== "xs" && screenType !== "sm" && (
                    <Box
                      sx={{
                        position: "fixed",
                        bottom: 0,
                        left: "25%",
                        transform: "translateX(-50%)",
                        paddingBottom: 2,
                        zIndex: 10,
                        borderTop: "1px solid #e0e0e0",
                        textAlign: "center",
                      }}
                    >
                      <KeyboardDoubleArrowDownIcon
                        className="text-gray-500 animate-fade-in-out"
                        fontSize="small"
                      />
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            order: {
              xs: 3,
              sm: 3,
              md: 2,
            },
            flex: {
              xs: "1 1 auto",
              md: "1 1 25%",
            },
            overflow: screenType === "xs" || screenType === "sm" ? "" : "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="bg-drawer-right-page"
        >
          <div className="absolute inset-0 bg-grid-lines-vertical z-0 my-5"></div>
          <div className="absolute inset-0 bg-grid-lines-horizontal z-0 my-5"></div>
          {data && (
            <Box
              sx={{
                position: "relative",
                maxHeight: "calc(100vh - 100px)",
                paddingBottom:
                  screenType === "xs" || screenType === "sm" ? 0 : 4,
              }}
            >
              <Grid
                container
                display="flex"
                justifyContent="center"
                flexDirection="column"
                sx={{
                  position: "relative",
                  zIndex: 10,
                }}
                p={4}
                className={
                  screenType === "xs" || screenType === "sm"
                    ? "bg-drawer-right-page"
                    : ""
                }
              >
                {screenType === "xs" ||
                  (screenType === "sm" && (
                    <>
                      <div className="absolute inset-0 bg-grid-lines-vertical z-0 my-5"></div>
                      <div className="absolute inset-0 bg-grid-lines-horizontal z-0 my-5"></div>
                    </>
                  ))}
                {fields.map(
                  (field, index) =>
                    field.value && (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          zIndex: 10,
                        }}
                      >
                        <Typography variant="h6" className="uppercase">
                          {field.label}:
                        </Typography>
                        <Typography variant="subtitle1">
                          {field.value}
                        </Typography>
                        {screenType !== "xs" && screenType !== "sm" && (
                          <Box
                            sx={{
                              position: "fixed",
                              bottom: 0,
                              left: "65%",
                              transform: "translateX(-50%)",
                              paddingBottom: 2,
                              zIndex: 10,
                              borderTop: "1px solid #e0e0e0",
                              textAlign: "center",
                            }}
                          >
                            <KeyboardDoubleArrowDownIcon
                              className="text-gray-500 animate-fade-in-out"
                              fontSize="small"
                            />
                          </Box>
                        )}
                      </Box>
                    )
                )}
              </Grid>
            </Box>
          )}
        </Box>

        {Object.keys(data).length !== 0 && (
          <Button
            onClick={() => toggleReadMore()}
            sx={{
              color: "black",
              position: "fixed",
              bottom: {
                xs: "auto",
                sm: "auto",
                md: 16,
                lg: 0,
              },
              top: {
                xs: 16,
                sm: 16,
                md: "auto",
              },
              right: 16,
              zIndex: 1000,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#647c64 !important",
                "&:hover": {
                  backgroundColor: "#647c64 !important",
                },
              }}
            >
              <Typography variant="caption">
                {open ? (readMore ? "Read less" : "Read more") : ""}
              </Typography>
            </Button>
          </Button>
        )}
      </Paper>
    </div>
  );
};

export default CustomDrawer;
