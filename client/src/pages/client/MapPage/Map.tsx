import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  Box,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ButtonFilters from "../../components/ButtonFilters";
import CustomDrawer from "../../components/CustomDrawer";
import { useScreenSize } from "../../../context/MediaContext";
import { handleFlexStyles, handleMapSize } from "../../../utils";
import CustomMap from "../../components/CustomMap";
import FloatingButton from "../../components/FloatingButton";
import { useFetchData } from "../../../utils/queries";
import Certificate from "../../components/Certificate";

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
  const { speciesData, typesData, mapsData } = useFetchData();
  const [clickCounts, setClickCounts] = useState([]);
  const [progress, setProgress] = useState<number>(0);
  const [progressClick, setProgressClick] = useState<boolean>(false);

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
            return (paperRef.current.style.left = "-10%");
          default:
            return (paperRef.current.style.left = "-10%");
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
          return (paperRef.current.style.left = "15%");
        case "lg":
          return (paperRef.current.style.left = "15%");
        case "xl":
          return (paperRef.current.style.left = "12%");
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

  useEffect(() => {
    const storedClickCounts = localStorage.getItem("clickCounts");
    if (storedClickCounts) {
      setClickCounts(JSON.parse(storedClickCounts));
    } else if (mapsData) {
      setClickCounts(Array(mapsData.length).fill(0));
    }
  }, [mapsData]);

  useEffect(() => {
    if (clickCounts.length > 0) {
      localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
    }
  }, [clickCounts]);

  useEffect(() => {
    const getProgress = () => {
      if (clickCounts) {
        const totalSteps = 20;
        const completedSteps = clickCounts.filter(
          (value) => value === 1
        ).length;

        const progress =
          (Math.min(completedSteps, totalSteps) / totalSteps) * 100;
        setProgress(progress);
      }
    };

    getProgress();
  }, [clickCounts]);

  const handleProgressClick = () => {
    if (progress === 100) {
      setProgressClick(!progressClick);
    }
  };

  console.log("screenSize?.screenSize", screenSize?.screenSize);
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
      <div className={`flex ${flexStyle?.parent} `}>
        <Box>
          <div
            className={`flex ${
              screenSize?.screenSize === "xl" ? "flex-row" : "flex-col"
            } items-end`}
          >
            <Box
              sx={{
                order: screenSize?.screenSize === "xl" ? 2 : 1,
                position: "relative",
                flexGrow: 1,
              }}
            >
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
                clickCounts={clickCounts}
                setClickCounts={setClickCounts}
              />

              <Stack
                direction={
                  screenSize?.screenSize === "xs"
                    ? "row-reverse"
                    : screenSize?.screenSize === "sm"
                    ? "row-reverse"
                    : screenSize?.screenSize === "md"
                    ? "row-reverse"
                    : "row-reverse"
                }
                width={50}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 10,
                  marginTop: 3,
                }}
              >
                {typesData?.map((type) => (
                  <ButtonFilters
                    admin={false}
                    key={type?._id}
                    typeData={type}
                    speciesData={speciesData}
                    buttonFilters={buttonFilters}
                    setButtonFilters={setButtonFilters}
                  />
                ))}
              </Stack>
              {location.pathname === "/maps" && (
                <Tooltip
                  title="Total progression"
                  placement="left"
                  sx={{ zIndex: 3001 }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      position: "absolute",
                      bottom: { xs: "40px", md: "30px" },
                      left: { xs: "40px", md: "50px" },
                      border: "none",
                      borderRadius: "50px",
                      cursor: "pointer",
                      width: { xs: "100px", md: "100px" },
                      height: { xs: "100px", md: "100px" },
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1000,
                    }}
                    onClick={progress === 100 ? handleProgressClick : undefined}
                  >
                    <Box position="relative" display="inline-flex">
                      <CircularProgress
                        variant="determinate"
                        value={progress}
                        size={120}
                        thickness={4}
                        sx={{ color: "#1d4509" }}
                      />

                      <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ textAlign: "center" }} // Ensures text is centered
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          color="#d5c87f"
                        >
                          Discovery <br /> Meter
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Tooltip>
              )}
            </Box>

            {/* <Box
              sx={{
                order: screenSize?.screenSize === "xl" ? 1 : 2,
                height:
                  screenSize?.screenSize === "xl"
                    ? mapSize?.containerHeight
                    : "",
                width: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection:
                  screenSize?.screenSize === "xl" ? "column" : "row-reverse",
              }}
            >
              <Box
                width="50%"
                height={130}
                style={{ borderColor: "#647c64" }}
                className="border-2 rounded-lg border-dashed p-4 flex flex-col justify-center items-center mx-auto"
              >
                <Typography
                  variant="h6"
                  className="leading-normal"
                  sx={{ color: "#647c64" }}
                >
                  Can you uncover every one of the 96 hidden species?
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Tap the plant icons to uncover details and see their
                  snapshots.
                </Typography>
              </Box>
              <Box>
                <img
                  src="/resources/fire_tree_flower.png"
                  alt=""
                  height={250}
                  width={250}
                />
              </Box>
            </Box> */}
          </div>
        </Box>
        <CustomDrawer
          data={data}
          paperRef={paperRef}
          open={open}
          readMore={readMore}
          toggleReadMore={toggleReadMore}
          toggleInfo={toggleInfo}
        />

        <FloatingButton />
        {progressClick && <Certificate />}
      </div>
    </div>
  );
};

export default MapPage;
