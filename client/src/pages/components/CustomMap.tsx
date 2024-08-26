import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngBoundsExpression } from "leaflet";
import { useScreenSize } from "../../context/MediaContext";
import { handleMapSize } from "../../utils";
import { useFetchData } from "../../utils/queries";

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

  const filteredMarkers = selectedType
    ? markers.filter((marker) => marker?.type === selectedType)
    : markers;

  return (
    <>
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
          url="/anning/{z}/{x}/{y}.jpg"
          bounds={maxBounds}
          noWrap={true}
        />
        {!selectedType &&
          mapsData?.map((marker) => {
            const { _id, position, icon } = marker;

            return (
              <Marker
                key={_id}
                position={position}
                icon={markerIconFunction(icon.options, icon.options.iconUrl)}
                eventHandlers={{
                  click: (e) => {
                    forAdmin ? openDrawerHandler(marker) : toggleDrawer(true);
                  },
                }}
              ></Marker>
            );
          })}
        {selectedType &&
          filteredMarkers?.map((marker) => {
            const { _id, position, icon } = marker;

            return (
              <Marker
                key={_id}
                position={position}
                icon={markerIconFunction(icon.options, icon.options.iconUrl)}
                eventHandlers={{
                  click: (e) => {
                    forAdmin ? openDrawerHandler(marker) : toggleDrawer(true);
                  },
                }}
              ></Marker>
            );
          })}
        {/* ADMIN MAP */}
        {!selectedType &&
          forAdmin &&
          markers?.map((marker) => {
            const { _id, position, icon } = marker;

            return (
              <Marker
                key={_id}
                position={position}
                icon={markerIconFunction(icon.options, icon.options.iconUrl)}
                eventHandlers={{
                  click: (e) => {
                    forAdmin ? openDrawerHandler(marker) : toggleDrawer(true);
                  },
                }}
              ></Marker>
            );
          })}{" "}
        {forAdmin && <MapClickHandler onClick={handleMapClick} />}
      </MapContainer>
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
