import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngBoundsExpression } from "leaflet";
import { useScreenSize } from "../../context/MediaContext";
import { handleMapSize } from "../../utils";
import { useFetchData } from "../../utils/queries";
import { ClickSound } from "../../utils";

import Certificate from "./Certificate";
import { Box, Typography } from "@mui/material";

type Prop = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setReadMore?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer?: (newOpen: boolean) => void;
  forAdmin: boolean;
  selectedType?: any;
  buttonFilters: any;
  handleMapClick: any;
  markers: any;
  openDrawerHandler: any;
  setData?: React.Dispatch<React.SetStateAction<null>>;
  clickCounts?: number[];
  setClickCounts?: React.Dispatch<React.SetStateAction<number[]>>;
};

const CustomMap = ({
  open,
  setOpen,
  setReadMore,
  toggleDrawer,
  forAdmin,
  selectedType,
  buttonFilters,
  handleMapClick,
  markers,
  openDrawerHandler,
  setData,
  clickCounts,
  setClickCounts,
}: Prop) => {
  const paperRef = useRef<HTMLDivElement>(null);
  const [defaultZoom, setDefaultZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const screenSize = useScreenSize();
  const mapSize = handleMapSize(screenSize);
  const { mapsData } = useFetchData();

  useEffect(() => {
    const handleZoom = () => {
      switch (screenSize?.screenSize) {
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return setDefaultZoom(2), setMinZoom(2);
        default:
          setDefaultZoom(1);
          setMinZoom(1);
          break;
      }
    };

    handleZoom();
  }, [screenSize]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (paperRef.current && !paperRef.current.contains(e.target as Node)) {
        if (screenSize?.screenSize === "xs") {
          paperRef.current.style.top = "95%";
        } else {
          paperRef.current.style.left = "-43%";
        }

        if (setOpen) {
          setOpen(false);
        }

        if (setReadMore) {
          setReadMore(false);
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

  const maxBounds: LatLngBoundsExpression = [
    [83.318733, -161.164965],
    [-83.366776, 160.93596],
  ];

  const filteredMapData = mapsData?.filter((marker) =>
    buttonFilters?.some((filter) => marker?.species?._id === filter?._id)
  );

  const countOnes = clickCounts?.reduce(
    (acc, count) => (count === 1 ? acc + 1 : acc),
    0
  );

  const renderMarkers = (data) =>
    data?.map((marker: any, index: number) => {
      const { _id, species, position } = marker;
      const icon = species?.icon;

      return (
        <Marker
          key={_id}
          position={position}
          icon={markerIconFunction(icon, icon?.iconUrl)}
          eventHandlers={{
            click: (e) => {
              if (forAdmin) {
                openDrawerHandler(marker);
              } else {
                const newClickCounts = [...clickCounts];

                if (newClickCounts[index] === 0) {
                  newClickCounts[index] += 1;

                  setClickCounts(newClickCounts);
                }
                setData(marker?.species);
                ClickSound();
                toggleDrawer(true);
              }
            },
          }}
        ></Marker>
      );
    });

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
    <>
      <Box
        sx={{
          marginTop: "4rem",
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingLeft: "16px",
          paddingRight: "16px",
          backgroundColor: "#c9c9c9",
          boxShadow: "15px 10px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <MapContainer
          key={defaultZoom}
          bounds={maxBounds}
          center={[51.505, -0.09]}
          zoom={defaultZoom}
          minZoom={minZoom}
          maxZoom={5}
          zoomControl={true}
          scrollWheelZoom={true}
          doubleClickZoom={false}
          maxBounds={maxBounds}
          maxBoundsViscosity={1.0}
          style={{
            height: mapSize?.height,
            width: mapSize?.width,
          }}
        >
          <TileLayer
            attribution="Private Garden"
            url="/anning_clean/{z}/{x}/{y}.jpg"
            bounds={maxBounds}
            noWrap={true}
          />
          {renderMarkers(buttonFilters ? filteredMapData : mapsData)}
          {forAdmin &&
            markers?.map((marker: any) => {
              const { _id, species, position } = marker;
              const icon = species?.icon;

              return (
                <Marker
                  key={_id}
                  position={position}
                  icon={markerIconFunction(
                    icon?.options,
                    icon?.options?.iconUrl
                  )}
                  eventHandlers={{
                    click: (e) => {
                      if (forAdmin) {
                        openDrawerHandler(marker);
                      } else {
                        setData(marker?.species);
                        toggleDrawer(true);
                      }
                    },
                  }}
                ></Marker>
              );
            })}{" "}
          {forAdmin && <MapClickHandler onClick={handleMapClick} />}
        </MapContainer>
      </Box>
      {countOnes >= 20 && <Certificate />}
    </>
  );
};

const MapClickHandler = ({
  onClick,
}: {
  onClick: (e: L.LeafletMouseEvent) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    const handleMarkerClick = (e: L.LeafletMouseEvent) => {
      onClick(e);
    };

    map.on("click", handleMarkerClick);

    return () => {
      map.off("click", handleMarkerClick);
    };
  }, [map, onClick]);

  return null;
};

const markerIconFunction = (props: any, iconUrl: string) => {
  return L.icon({
    iconUrl: iconUrl,
    iconSize: props?.iconSize,
    iconAnchor: props?.iconAnchor,
    popupAnchor: props?.popupAnchor,
    tooltipAnchor: props?.tooltipAnchor,
    shadowUrl: props?.shadowUrl,
    shadowSize: props?.shadowSize,
  });
};

export default CustomMap;
