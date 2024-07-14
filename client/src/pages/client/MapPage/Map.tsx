import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import L, { LatLngBoundsExpression } from "leaflet";
import MapDrawer from "./MapDrawer";
import ButtonFilters from "../components/ButtonFilters";

interface MarkerType {
  id: number;
  position: L.LatLngExpression;
  title: string;
  description: string;
  type?: string;
  icon: any;
}

const markerIcon = L.icon({
  iconUrl: `${window.location.origin}/resources/grass.svg`,
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapPage = () => {
  const [markers, setMarkers] = useState<MarkerType[]>([
    {
      id: 1,
      position: { lat: -68.04045866686049, lng: 23.52547138119504 },
      title: "",
      description: "",
      type: "grass",
      icon: {
        options: {
          iconUrl: `${window.location.origin}/resources/grass.svg`,
          iconSize: [40, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [41, 41],
        },
        _initHooksCalled: true,
      },
    },
    {
      id: 2,
      position: { lat: -68.62454109968843, lng: 28.095805294846134 },
      title: "",
      description: "",
      type: "grass",
      icon: {
        options: {
          iconUrl: `${window.location.origin}/resources/grass.svg`,
          iconSize: [40, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [41, 41],
        },
        _initHooksCalled: true,
      },
    },
    {
      id: 3,
      position: { lat: -45.573889514708746, lng: 48.12835693359375 },
      title: "",
      description: "",
      type: "tree",
      icon: {
        options: {
          iconUrl: `${window.location.origin}/resources/tree.svg`,
          iconSize: [40, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [41, 41],
        },
        _initHooksCalled: true,
      },
    },
    {
      id: 4,
      position: { lat: -44.25354186472623, lng: 36.4480011946954 },
      title: "",
      description: "",
      type: "tree",
      icon: {
        options: {
          iconUrl: `${window.location.origin}/resources/tree.svg`,
          iconSize: [40, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [41, 41],
        },
        _initHooksCalled: true,
      },
    },
    {
      id: 5,
      position: { lat: -51.70485290641144, lng: 15.099334716796877 },
      title: "",
      description: "",
      type: "flower",
      icon: {
        options: {
          iconUrl: `${window.location.origin}/resources/flower.svg`,
          iconSize: [40, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [41, 41],
        },
        _initHooksCalled: true,
      },
    },
    {
      id: 6,
      position: { lat: -51.26728128825844, lng: 24.064178466796875 },
      title: "",
      description: "",
      type: "flower",
      icon: {
        options: {
          iconUrl: `${window.location.origin}/resources/flower.svg`,
          iconSize: [40, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [41, 41],
        },
        _initHooksCalled: true,
      },
    },
  ]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [screenSize, setScreenSize] = useState("");
  const [defaultZoom, setDefaultZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);

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

  console.log("markers", markers);

  // Function to add an icon position
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newMarker: MarkerType = {
      id: markers.length + 1,
      position: e.latlng,
      title: "",
      description: "",
      type: "tree",
      icon: markerIcon,
    };

    setMarkers([...markers, newMarker]);
  };

  const mobile = useMediaQuery("(max-width:768px)");
  const [readMore, setReadMore] = useState(false);
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const matchPosition = (position: any) => {
    const matchedPositionMarker = markers?.find((marker: any) => {
      return (
        marker.position.lat === position.lat &&
        marker.position.lng === position.lng
      );
    });

    setData(matchedPositionMarker);
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const filteredMarkers = selectedType
    ? markers.filter((marker) => marker?.type === selectedType)
    : markers;

  return (
    <Box
      style={{
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "16px",
        paddingRight: "16px",
        backgroundColor: "white",
        boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="flex flex-row items-end">
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
          {!selectedType &&
            markers?.map((marker) => {
              const { id, position, icon } = marker;

              return (
                <Marker
                  key={id}
                  position={position}
                  icon={markerIconFunction(icon.options)}
                  eventHandlers={{
                    click: (e) => {
                      toggleDrawer(true);
                      matchPosition(e.latlng);
                    },
                  }}
                ></Marker>
              );
            })}
          {selectedType &&
            filteredMarkers?.map((marker) => {
              const { id, position, icon } = marker;

              return (
                <Marker
                  key={id}
                  position={position}
                  icon={markerIconFunction(icon.options)}
                  eventHandlers={{
                    click: (e) => {
                      toggleDrawer(true);
                      matchPosition(e.latlng);
                    },
                  }}
                ></Marker>
              );
            })}
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
        <ButtonFilters
          setSelectedType={setSelectedType}
          handleTypeClick={handleTypeClick}
        />
      </div>
    </Box>
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

const markerIconFunction = (props: any) => {
  return L.icon({
    iconUrl: props.iconUrl,
    iconSize: props.iconSize,
    iconAnchor: props.iconAnchor,
    popupAnchor: props.popupAnchor,
    tooltipAnchor: props.tooltipAnchor,
    shadowUrl: props.shadowUrl,
    shadowSize: props.shadowSize,
  });
};

export default MapPage;
