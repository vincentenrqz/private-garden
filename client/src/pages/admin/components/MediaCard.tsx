import * as React from "react";
import { useFetchData } from "../utils/queries";

import SpeciesCard from "./Card/SpeciesCard";
import SettingsCard from "./Card/SettingsCard";
import { Skeleton } from "@mui/material";
import MapCard from "./Card/MapCard";
import TypeCard from "./Card/TypeCard";

export default function MediaControlCard() {
  const { loading } = useFetchData();

  if (loading)
    return Array.from({ length: 3 }).map((_, index) => (
      <Skeleton
        key={index}
        variant="rounded"
        width="100%"
        height={150}
        sx={{ marginTop: "3rem" }}
      />
    ));

  return (
    <React.Fragment>
      <SpeciesCard />
      <TypeCard />
      <MapCard />
      <SettingsCard />
    </React.Fragment>
  );
}