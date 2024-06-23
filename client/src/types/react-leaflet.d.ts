import { LatLngBoundsLiteral } from "react-leaflet";

export type CustomLatLngBoundsLiteral = LatLngBoundsLiteral & {
  southWest: [number, number];
  northEast: [number, number];
};
