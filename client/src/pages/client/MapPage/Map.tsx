import React, { useRef, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  // LatLngBoundsLiteral,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Drawer } from "@mui/material";
import MapDrawer from "./MapDrawer";
import { CustomLatLngBoundsLiteral } from "../../../types/react-leaflet";

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
  const mapRef = useRef<any>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([
    {
      id: 1,
      position: [15.623037, 28.152447],
      title: "Test Title",
      description: "Test Description",
      type: "Trees",
    },
    {
      id: 2,
      position: [-9.102097, 79.841222],
      title: "Title 2",
      description: "Descrioptiuon 2",
      type: "Flowers",
    },
  ]);

  const bounds: CustomLatLngBoundsLiteral = [
    [83.318733, -161.164965],
    [-83.366776, 160.93596],
  ];

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;
      const southWest = L.latLng(bounds[0]);
      const northEast = L.latLng(bounds[1]);
      const boundsLatLng = L.latLngBounds(southWest, northEast);

      const center = boundsLatLng.getCenter();

      if (map) {
        map.setMaxBounds(boundsLatLng);
        map.setMinZoom(1);
        map.setMaxZoom(2);
        const zoom = calculateZoomLevel(boundsLatLng, map.getSize());

        map.setView(center, zoom);
      }
    }
  }, [bounds]);

  const calculateZoomLevel = (
    bounds: L.LatLngBounds,
    mapSize?: { x: number; y: number }
  ): number => {
    if (!mapSize) return 1;

    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 2;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const latFraction =
      (Math.log(Math.tan(Math.PI / 4 + (ne.lat * Math.PI) / 360)) -
        Math.log(Math.tan(Math.PI / 4 + (sw.lat * Math.PI) / 360))) /
      (2 * Math.PI);

    const lngDiff = ne.lng - sw.lng;
    const lngFraction = lngDiff < 0 ? (lngDiff + 360) / 360 : lngDiff / 360;

    const latZoom = Math.floor(
      Math.log(mapSize.y / WORLD_DIM.height / latFraction) / Math.LN2
    );
    const lngZoom = Math.floor(
      Math.log(mapSize.x / WORLD_DIM.width / lngFraction) / Math.LN2
    );

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  };

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newMarker: MarkerType = {
      id: markers.length + 1,
      position: e.latlng,
      title: "",
      description: "",
    };

    setMarkers([...markers, newMarker]);
  };

  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
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
  console.log("data", data);

  return (
    <MapContainer
      ref={mapRef}
      center={[0, 0]}
      zoom={2}
      zoomControl={true} // Enable zoom control buttons
      scrollWheelZoom={false}
      doubleClickZoom={false}
      style={{ height: "100vh", width: "48vw" }}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer attribution="Private Garden" url={`/map5/{z}/{x}/{y}.png`} />
      {markers?.map((marker) => (
        //TODO: ICON SHOULD BE THE MARKER TYPE. TREES/FLOWER/ETC.
        //TODO: Marker should have a data of ID, POSITION, TITLE, DESCRIPTION, IMAGE, TYPE
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
        anchor="left"
        onClick={() => toggleDrawer(false)}
        open={open}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            height: "90vh",
            width: 300,
            position: "fixed",
            top: "5%",
            transform: "translateY(-50%)",
            transition: "width 0.3s ease-in-out",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            overflow: "hidden",
          },
        }}
      >
        <MapDrawer toggleDrawer={toggleDrawer} data={data} />
      </Drawer>
      <MapClickHandler onClick={handleMapClick} />
      <ZoomHandler />
    </MapContainer>
  );
};

function MapClickHandler({
  onClick,
}: {
  onClick: (e: L.LeafletMouseEvent) => void;
}) {
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
}

function ZoomHandler() {
  const map = useMap();

  useEffect(() => {
    const handleZoomEnd = () => {
      const currentZoom = map.getZoom();
      if (currentZoom < 1) {
        map.setZoom(1); // Prevent zoom out beyond zoom level 1
      }
    };

    map.on("zoomend", handleZoomEnd);

    return () => {
      map.off("zoomend", handleZoomEnd);
    };
  }, [map]);

  return null;
}

export default MapPage;
