import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import L, { LatLngBoundsExpression } from "leaflet";
import ButtonFilters from "../components/ButtonFilters";
import CustomDrawer from "../components/CustomDrawer";
import { useScreenSize } from "../../../context/MediaContext";

interface MarkerType {
  id: number;
  position: L.LatLngExpression;
  title: string;
  description: string;
  type?: string;
  icon: any;
}

const markerIcon = L.icon({
  iconUrl: `${window.location.origin}/resources/tree.svg`,
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapPage = () => {
  const paperRef = useRef<HTMLDivElement>(null);

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
  const [defaultZoom, setDefaultZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [readMore, setReadMore] = useState(false);
  const screenSize = useScreenSize();

  useEffect(() => {
    const handleZoom = () => {
      switch (screenSize) {
        case "sm":
        case "md":
        case "lg":
          return setDefaultZoom(3), setMinZoom(3);
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
      type: "tree",
      icon: markerIcon,
    };

    setMarkers([...markers, newMarker]);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
    if (paperRef.current) {
      paperRef.current.style.left = "-15%";
    }
  };

  // Display the marker position
  const matchPosition = (position: any) => {
    const matchedPositionMarker = markers?.find((marker: any) => {
      return (
        marker.position.lat === position.lat &&
        marker.position.lng === position.lng
      );
    });

    setData(matchedPositionMarker);
  };

  // Handles selected type: Trees/Flowers/Grass, etc.
  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  // Displays filtered marker by clicking button filters
  const filteredMarkers = selectedType
    ? markers.filter((marker) => marker?.type === selectedType)
    : markers;

  const toggleReadMore = () => {
    setReadMore(!readMore);
    if (!readMore && paperRef.current) {
      paperRef.current.style.left = "50%";
    }

    if (readMore && paperRef.current) {
      paperRef.current.style.left = "-45%";
    }
  };

  const handleMapSize = () => {
    switch (screenSize) {
      case "sm":
      case "md":
      case "lg":
        return "90vw";
      case "xl":
        return "80vw";
    }
  };

  const largeScreen = screenSize === "lg";

  return (
    <div className="flex flex-col">
      <Box
        style={{
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingLeft: "16px",
          paddingRight: "16px",
          height: "82vh",
          // backgroundColor: "white",
          // boxShadow: "15px 10px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex flex-row items-end">
          <MapContainer
            key={defaultZoom}
            bounds={maxBounds}
            center={[0, 0]}
            zoom={defaultZoom}
            minZoom={minZoom}
            zoomControl={true}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
            style={{ height: "80vh", width: handleMapSize() }}
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
            <MapClickHandler onClick={handleMapClick} />
          </MapContainer>
          {largeScreen && (
            <ButtonFilters
              screenSize={screenSize}
              setSelectedType={setSelectedType}
              handleTypeClick={handleTypeClick}
            />
          )}
        </div>
      </Box>
      {!largeScreen && (
        <Box sx={{ display: "flex" }}>
          <ButtonFilters
            setSelectedType={setSelectedType}
            handleTypeClick={handleTypeClick}
          />
        </Box>
      )}
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
