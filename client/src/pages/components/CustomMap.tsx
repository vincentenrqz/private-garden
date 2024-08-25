import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngBoundsExpression } from "leaflet";
import { useScreenSize } from "../../context/MediaContext";
import { handleMapSize } from "../../utils";

interface MarkerType {
  id: number;
  position: L.LatLngExpression;
  title: string;
  description: string;
  type?: string;
  icon: any;
}

type Prop = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setReadMore?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer?: (newOpen: boolean) => void;
  forAdmin: boolean;
  selectedType?: any;
  selectedIcon?: any;
  buttonFilters: any;
};

const CustomMap = ({
  open,
  setOpen,
  setReadMore,
  toggleDrawer,
  forAdmin,
  selectedType,
  selectedIcon,
  buttonFilters,
}: Prop) => {
  const paperRef = useRef<HTMLDivElement>(null);
  const iconUrl = `${import.meta.env.VITE_API_URL}uploads/${
    selectedIcon?.icon?.iconUrl
  }`;
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
  const [data, setData] = useState<any>({});
  const [defaultZoom, setDefaultZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const screenSize = useScreenSize();
  const mapSize = handleMapSize(screenSize);

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

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (!selectedIcon) return;

    const newMarker: MarkerType = {
      id: markers.length + 1,
      position: e.latlng,
      title: "",
      description: "",
      type: "tree",
      icon: L.icon({
        iconUrl,
        iconSize: [50, 50],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20],
        tooltipAnchor: [10, -15],
        shadowUrl: selectedIcon?.icon?.shadowUrl,
        shadowSize: [41, 41],
      }),
    };

    setMarkers([...markers, newMarker]);
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
          markers?.map((marker) => {
            const { id, position, icon } = marker;

            return (
              <Marker
                key={id}
                position={position}
                icon={markerIconFunction(icon.options, icon.options.iconUrl)}
                eventHandlers={{
                  click: (e) => {
                    if (toggleDrawer) {
                      toggleDrawer(true);
                    }
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
                icon={markerIconFunction(icon.options, icon.options.iconUrl)}
                eventHandlers={{
                  click: (e) => {
                    if (toggleDrawer) {
                      toggleDrawer(true);
                    }
                    matchPosition(e.latlng);
                  },
                }}
              ></Marker>
            );
          })}
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
