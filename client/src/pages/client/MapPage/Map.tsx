import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import ButtonFilters from "../../components/ButtonFilters";
import CustomDrawer from "../../components/CustomDrawer";
import { useScreenSize } from "../../../context/MediaContext";
import { handleFlexStyles, handleMapSize } from "../../../utils";
import CustomMap from "../../components/CustomMap";

const MapPage = () => {
  const paperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [readMore, setReadMore] = useState(false);
  const screenSize = useScreenSize();
  const mapSize = handleMapSize(screenSize);
  const flexStyle = handleFlexStyles(screenSize);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (paperRef.current && !paperRef.current.contains(e.target as Node)) {
        if (screenSize?.screenSize === "xs") {
          paperRef.current.style.top = "95%";
        } else {
          paperRef.current.style.left = "-43%";
        }
        setOpen(false);
        setReadMore(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  const toggleDrawer = (newOpen: boolean, data: any) => {
    setOpen(newOpen);
    setData(data);
    if (paperRef.current) {
      if (screenSize?.screenSize === "xs") {
        paperRef.current.style.top = "80%";
      } else {
        paperRef.current.style.left = "-15%";
      }
    }
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const toggleReadMore = () => {
    setReadMore(!readMore);
    if (!readMore && paperRef.current) {
      if (screenSize?.screenSize === "xs") {
        paperRef.current.style.top = "40%";
      } else {
        paperRef.current.style.left = "50%";
      }
    }

    if (readMore && paperRef.current) {
      if (screenSize?.screenSize === "xs") {
        paperRef.current.style.top = "95%";
      } else {
        paperRef.current.style.left = "-43%";
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
            buttonFilters={undefined}
            handleMapClick={undefined}
            markers={undefined}
            openDrawerHandler={undefined}
          />
        </div>
      </Box>
      <ButtonFilters
        flexStyle={flexStyle}
        screenSize={screenSize}
        setSelectedType={setSelectedType}
        handleTypeClick={handleTypeClick}
      />
      <CustomDrawer
        data={data}
        paperRef={paperRef}
        open={open}
        readMore={readMore}
        toggleReadMore={toggleReadMore}
      />
    </div>
  );
};

export default MapPage;
