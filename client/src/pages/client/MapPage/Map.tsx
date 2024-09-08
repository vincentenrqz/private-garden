import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Box, Stack, Typography } from "@mui/material";
import ButtonFilters from "../../components/ButtonFilters";
import CustomDrawer from "../../components/CustomDrawer";
import { useScreenSize } from "../../../context/MediaContext";
import { handleFlexStyles, handleMapSize } from "../../../utils";
import CustomMap from "../../components/CustomMap";
import FloatingButton from "../../components/FloatingButton";
import { useFetchData } from "../../../utils/queries";

const MapPage = () => {
  const paperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [readMore, setReadMore] = useState(false);
  const screenSize = useScreenSize();
  const mapSize = handleMapSize(screenSize);
  const flexStyle = handleFlexStyles(screenSize);
  const [buttonFilters, setButtonFilters] = useState(null); //Todo: Pass this in custom map to have a conditional logic
  const { speciesData, typesData } = useFetchData();

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (paperRef.current && !paperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setReadMore(false);
        setData({});
        switch (screenSize?.screenSize) {
          case "xs":
          case "sm":
            return (paperRef.current.style.top = "95%");
          case "xl":
            return (paperRef.current.style.left = "-32%");
          default:
            return (paperRef.current.style.left = "-43%");
        }
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
    if (paperRef.current) {
      switch (screenSize?.screenSize) {
        case "xs":
          return (paperRef.current.style.top = "50%");
        case "sm":
          return (paperRef.current.style.top = "68%");
        case "md":
          return (paperRef.current.style.left = "-21%");
        case "lg":
          return (paperRef.current.style.left = "-22%");
        case "xl":
          return (paperRef.current.style.left = "-17%");
        default:
          return (paperRef.current.style.left = "-15%");
      }
    }
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const toggleReadMore = () => {
    setReadMore(!readMore);
    if (!readMore && paperRef.current) {
      if (screenSize?.screenSize === "xs" || screenSize?.screenSize === "sm") {
        paperRef.current.style.top = "10%";
      } else {
        paperRef.current.style.left = "50%";
      }
    }

    if (readMore && paperRef.current) {
      if (screenSize?.screenSize === "xs" || screenSize?.screenSize === "sm") {
        paperRef.current.style.top = "95%";
      } else if (screenSize?.screenSize === "xl") {
        paperRef.current.style.left = "-32%";
      } else {
        paperRef.current.style.left = "-43%";
      }

      setData({});
    }
  };

  const toggleInfo = () => {
    setOpen(true);
    if (paperRef.current) {
      switch (screenSize?.screenSize) {
        case "xs":
          return (paperRef.current.style.top = "80%");
        case "sm":
          return (paperRef.current.style.top = "68%");
        case "md":
          return (paperRef.current.style.left = "-21%");
        case "lg":
          return (paperRef.current.style.left = "-22%");
        case "xl":
          return (paperRef.current.style.left = "-17%");
        default:
          return (paperRef.current.style.left = "-15%");
      }
    }
  };

  const supportAllDevice = {
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "16px",
    height: mapSize?.containerHeight,
    maxWidth: mapSize?.width,
    backgroundColor: "#c9c9c9",
    boxShadow: "15px 10px 5px rgba(0, 0, 0, 0.3)",
  };

  const mapStyle =
    screenSize?.screenSize !== "xs"
      ? supportAllDevice
      : {
          marginTop: "4rem",
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingLeft: "4px",
          paddingRight: "4px",
          boxShadow: "15px 10px 5px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#c9c9c9",
        };

  return (
    <div
      style={{
        backgroundImage: `url(resources/backgroundMap.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`flex flex-col ${
        screenSize?.screenSize === "xs"
          ? "min-w-full min-h-screen flex justify-center"
          : "min-w-full min-h-screen flex justify-center items-center"
      }`}
    >
      <Typography
        variant="h3"
        color="white"
        sx={{
          color: "#647c64",
        }}
      >
        Explore with me
      </Typography>
      <div className={`flex ${flexStyle?.parent} `}>
        <Box style={mapStyle}>
          <div className="flex flex-row items-end">
            <CustomMap
              open={open}
              setOpen={setOpen}
              setReadMore={setReadMore}
              toggleDrawer={toggleDrawer}
              forAdmin={false}
              selectedType={selectedType}
              buttonFilters={buttonFilters}
              handleMapClick={undefined}
              markers={undefined}
              openDrawerHandler={undefined}
              setData={setData}
            />
          </div>
        </Box>
        <Stack
          direction={
            screenSize?.screenSize === "xs"
              ? "row"
              : screenSize?.screenSize === "sm"
              ? "row"
              : screenSize?.screenSize === "md"
              ? "row"
              : "column-reverse"
          }
          width={50}
        >
          {typesData?.map((type) => (
            <ButtonFilters
              key={type?._id}
              typeData={type}
              speciesData={speciesData}
              buttonFilters={buttonFilters}
              setButtonFilters={setButtonFilters}
            />
          ))}
        </Stack>
        <CustomDrawer
          data={data}
          paperRef={paperRef}
          open={open}
          readMore={readMore}
          toggleReadMore={toggleReadMore}
          toggleInfo={toggleInfo}
        />
        <FloatingButton />
      </div>
    </div>
  );
};

export default MapPage;
