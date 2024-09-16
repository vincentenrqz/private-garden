import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { IoIosInformationCircle } from "react-icons/io";
import { useScreenSize } from "../../context/MediaContext";
import ReactPlayer from "react-player";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { typesService } from "../../services/types.service";
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
  const [speciesType, setSpeciesType] = useState(null);
  const { screenSize } = useScreenSize();
  const screenType = screenSize;

  useEffect(() => {
    if (data) {
      const getType = async () => {
        if (data?._id) {
          const response = await typesService.getOneType(data.type);

          if (response.data) {
            const data = response.data.types;
            setSpeciesType(data.name);
          }
        }
      };

      getType();
    }
  }, [data]);

  const informationStyle =
    screenSize === "xs"
      ? { borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 40 }
      : { borderTopRightRadius: 10, borderBottomRightRadius: 10, height: 60 };

  const drawerSize = () => {
    switch (screenType) {
      case "xs":
      case "sm":
        return "98%";
      case "md":
      case "lg":
        return "30%";
      case "xl":
        return "25%";
      default:
        return "25%";
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

  const leftPosition = () => {
    switch (screenType) {
      case "xs":
        return "50%";
      case "sm":
        return "50%";
      case "xl":
        return "-10%";
      default:
        return "-10%";
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

        {Object.keys(data).length !== 0 && (
          <>
            {/* <Box
              onClick={() => toggleInfo()}
              sx={{
                position: "absolute",
                bottom: screenType === "xs" || screenType === "sm" ? 10 : 0,
                right:
                  screenType === "xs" || screenType === "sm" ? "10px" : "-50px",
                width: 50,
                zIndex: 2000,
                color: "white",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#647c64 !important",
                  "&:hover": {
                    backgroundColor: "#647c64 !important",
                  },
                  paddingY: 1,
                }}
              >
                <Typography variant="caption">Next</Typography>
              </Button>
            </Box>

            <Box
              onClick={() => toggleInfo()}
              sx={{
                position: "absolute",
                bottom: screenType === "xs" || screenType === "sm" ? 10 : 35,
                right:
                  screenType === "xs" || screenType === "sm" ? "10px" : "-50px",
                width: 50,
                zIndex: 2000,
                color: "white",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#647c64 !important",
                  "&:hover": {
                    backgroundColor: "#647c64 !important",
                  },
                  paddingY: 1,
                }}
              >
                <Typography variant="caption">Prev</Typography>
              </Button>
            </Box> */}
          </>
        )}

        <Box
          sx={{
            flex: "auto",
            position: "relative",
            overflow: screenType === "md" ? "auto" : "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
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
                sm={12}
                md={12}
                mt={screenType === "xs" || screenType === "sm" ? 2 : 0}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div
                  className={`w-full ${
                    screenType === "xs" || screenType === "sm" ? "" : "mt-10"
                  }`}
                >
                  {screenType === "md" ||
                  screenType === "lg" ||
                  screenType === "xl" ? (
                    <>
                      <Box display="flex" justifyContent="center">
                        <Typography
                          variant="h6"
                          className="uppercase tracking-widest"
                          sx={{
                            color: "#647c64",
                            fontWeight: "bold",
                          }}
                        >
                          {speciesType}
                        </Typography>
                      </Box>

                      <div className="relative w-full h-96">
                        <div className="w-full h-full">
                          {data?.attachments ? (
                            <img
                              src={data.attachments}
                              alt="Sebastian Plum Tree"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Box
                              sx={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#e0e0e0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography variant="body1" color="textSecondary">
                                No image available
                              </Typography>
                            </Box>
                          )}
                        </div>
                        <div className="absolute bottom-0 left-10 w-full text-left">
                          <h2 className="text-white uppercase text-5xl">
                            {data?.name}
                          </h2>
                        </div>
                        <div className="text-left pl-10 -m-1">
                          <p className="text-gray-700 text-2xl uppercase">
                            {data?.sub_name ? `"${data?.sub_name}"` : ""}
                          </p>
                        </div>
                      </div>

                      <div className="pb-6 mt-10">
                        <div className="flex">
                          <div className="bg-[#647c64] w-12 flex-shrink-0"></div>

                          <div className="flex flex-col justify-start pl-4">
                            <div className="mb-4">
                              <Typography
                                variant="h6"
                                sx={{ color: "#647c64", fontWeight: "bold" }}
                              >
                                Scientific Name:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ color: "#647c64" }}
                              >
                                {data?.scientific_name}
                              </Typography>
                            </div>

                            <div>
                              <Typography
                                variant="h6"
                                sx={{ color: "#647c64", fontWeight: "bold" }}
                              >
                                Etymology:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ color: "#647c64" }}
                              >
                                {data?.etymology}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center w-full h-auto">
                      {/* Image Section */}
                      <div className="relative w-full sm:w-1/2 h-64 sm:h-60">
                        <div className="w-full h-full">
                          {data?.attachments ? (
                            <img
                              src={data.attachments}
                              alt="Sebastian Plum Tree"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Box
                              sx={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#e0e0e0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography variant="body1" color="textSecondary">
                                No image available
                              </Typography>
                            </Box>
                          )}
                        </div>
                        <div className="absolute bottom-0 left-10 w-full text-left">
                          <h2 className="text-white uppercase text-5xl">
                            {data?.name}
                          </h2>
                        </div>
                        <div className="text-left pl-10 -m-1">
                          <p className="text-gray-700 text-2xl uppercase">
                            {data?.sub_name ? `"${data?.sub_name}"` : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex w-full sm:w-1/2 h-64 sm:h-60 justify-start sm:pl-4 mt-4 sm:mt-0">
                        <div className="bg-[#647c64] w-12 flex-shrink-0 mr-4 h-full"></div>

                        <div className="flex flex-col justify-between h-full">
                          <div className="mb-4">
                            <Typography
                              variant="h6"
                              sx={{ color: "#647c64", fontWeight: "bold" }}
                            >
                              Scientific Name:
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ color: "#647c64" }}
                            >
                              {data?.scientific_name}
                            </Typography>
                          </div>

                          {/* Etymology */}
                          <div>
                            <Typography
                              variant="h6"
                              sx={{ color: "#647c64", fontWeight: "bold" }}
                            >
                              Etymology:
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ color: "#647c64" }}
                            >
                              {data?.etymology}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Typography
                    variant="body1"
                    sx={{
                      paddingX: 2,
                      textAlign: "justify",
                      marginBottom: 2,
                      marginTop:
                        screenType === "xs" || screenType === "sm" ? 5 : 0,
                    }}
                  >
                    {data?.description}
                  </Typography>
                  {data?.video && (
                    <Box sx={{ padding: 2 }}>
                      <ReactPlayer
                        url={data?.video}
                        controls
                        width="auto"
                        height={300}
                      />
                    </Box>
                  )}

                  <Box sx={{ marginY: 2 }}>
                    {fields.map(
                      (field, index) =>
                        field.value && (
                          <Box
                            key={index}
                            sx={{
                              position: "relative",
                              zIndex: 10,
                              paddingX: 2,
                            }}
                          >
                            <Typography
                              variant="h6"
                              className="first-letter:uppercase"
                              sx={{ color: "#647c64", fontWeight: "bold" }}
                            >
                              {field.label}:
                            </Typography>
                            <Typography variant="subtitle1">
                              {field.value}
                            </Typography>
                          </Box>
                        )
                    )}
                  </Box>
                </div>
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
            position: "fixed",
            bottom: 0,
            left: "50%",
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
      </Paper>
    </div>
  );
};

export default CustomDrawer;
