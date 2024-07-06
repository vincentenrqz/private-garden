import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Drawer, useMediaQuery } from "@mui/material";
import L, { LatLngBoundsExpression } from "leaflet";
import MapDrawer from "./MapDrawer";

interface MarkerType {
  id: number;
  position: L.LatLngExpression;
  title: string;
  description: string;
  type?: string;
}

const markerIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapPage = () => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [screenSize, setScreenSize] = useState("");
  const [defaultZoom, setDefaultZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 576) {
        setScreenSize("sm");
      } else if (screenWidth >= 576 && screenWidth < 768) {
        setScreenSize("md");
      } else if (screenWidth >= 768 && screenWidth < 992) {
        setScreenSize("lg");
      } else if (screenWidth >= 992) {
        setScreenSize("xl");
      }
    };

    handleResize();
  }, []);

  useEffect(() => {
    const handleZoom = () => {
      switch (screenSize) {
        case "sm":
        case "md":
        case "lg":
          return setDefaultZoom(2), setMinZoom(2);
        case "xl":
          return setDefaultZoom(3), setMinZoom(3);
        default:
          setDefaultZoom(1);
          setMinZoom(1);
          break;
      }
    };

    handleZoom();
  }, [screenSize]);

  const maxBounds: LatLngBoundsExpression = [
    [83.318733, -161.164965],
    [-83.366776, 160.93596],
  ];

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newMarker: MarkerType = {
      id: markers.length + 1,
      position: e.latlng,
      title: "",
      description: "",
    };

    setMarkers([...markers, newMarker]);
  };

  const mobile = useMediaQuery("(max-width:768px)");
  const [readMore, setReadMore] = useState(false);
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const matchPosition = (position: any) => {
    const matchedPositionMarker = markers?.find(
      (marker: any) =>
        marker.position[0] === position.lat &&
        marker.position[1] === position.lng
    );

    setData(matchedPositionMarker);
  };

  return (
    <MapContainer
      key={defaultZoom}
      bounds={maxBounds}
      center={[0, 0]}
      zoom={defaultZoom}
      // minZoom={minZoom}
      zoomControl={true}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      maxBounds={maxBounds}
      maxBoundsViscosity={1.0}
      style={{ height: "90vh", width: "90vw" }}
    >
      <TileLayer
        attribution="Private Garden"
        url="/map5/{z}/{x}/{y}.png"
        bounds={maxBounds}
        noWrap={true}
      />
      {markers?.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={markerIcon}
          eventHandlers={{
            click: (e) => {
              toggleDrawer(true);
              matchPosition(e.latlng);
            },
          }}
        ></Marker>
      ))}
      <Drawer
        anchor={`${mobile ? "bottom" : "left"}`}
        onClose={() => {
          toggleDrawer(false);
          setReadMore(false);
        }}
        open={open}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            height: mobile ? (readMore ? "50vh" : "40%") : "90vh",
            width: mobile ? "90%" : 300,
            position: "fixed",
            top: mobile ? "" : "5%",
            bottom: "0%",
            left: mobile ? "5%" : "",
            transform: "translateY(-50%)",
            transition: "width 0.3s ease-in-out",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            overflow: "hidden",
          },
        }}
      >
        <MapDrawer
          toggleDrawer={toggleDrawer}
          data={data}
          mobile={mobile}
          readMore={readMore}
          setReadMore={setReadMore}
        />
      </Drawer>
      <MapClickHandler onClick={handleMapClick} />
    </MapContainer>
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

export default MapPage;
