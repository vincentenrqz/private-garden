import * as React from "react";
import { useFetchData } from "../../utils/queries";

import SpeciesCard from "../../components/Card/SpeciesCard";
import TypesCard from "../../components/Card/TypesCard";
import SettingsCard from "../../components/Card/SettingsCard";
import { Skeleton } from "@mui/material";
import MapCard from "../../components/Card/MapCard";

export default function MediaControlCard() {
  const { typesData, speciesData, loading, error } = useFetchData();

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
      <TypesCard />
      <MapCard />
      <SettingsCard />
    </React.Fragment>
  );
}
