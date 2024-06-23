import { useMapEvents } from "react-leaflet";
import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";

const MapEventsHandler = ({
  addMarker,
  bounds,
}: {
  addMarker: (latlng: LatLngTuple) => void;
  bounds: LatLngBoundsLiteral;
}) => {
  const map = useMapEvents({
    click: (e) => {
      if (!map || !bounds) return;

      const clickedPoint = map.project(e.latlng); // Project click event to pixel coordinates
      const boundsMin = map.project(bounds[0]); // Project bottom-left corner
      const boundsMax = map.project(bounds[1]); // Project top-right corner

      if (!boundsMin || !boundsMax) return;

      // Calculate the position relative to the ImageOverlay
      const x = (clickedPoint.x - boundsMin.x) / (boundsMax.x - boundsMin.x);
      const y = (clickedPoint.y - boundsMin.y) / (boundsMax.y - boundsMin.y);

      // Calculate the coordinates in the ImageOverlay space
      const latlng = map.unproject([x * map.getSize().x, y * map.getSize().y]);
      console.log("latLng", latlng);
      // Add marker at the calculated coordinates
      addMarker([latlng.lat, latlng.lng]);
    },
  });

  return <div style={{ display: "none" }}></div>;
};

export default MapEventsHandler;
