import * as React from "react";
import { useFetchData } from "../../utils/queries";
import { Skeleton } from "@mui/material";
import DashboardCustomCard from "./DashboardCustomCard";

export default function MediaControlCard() {
  const { loading } = useFetchData();
  const { speciesData, typesData } = useFetchData();

  const dashboardList = [
    {
      title: {
        avatar: "S",
        variant: "Species",
      },
      description:
        "This feature allows for the modification of existing Types Data or the creation of new Types. This functionality is primarily based on identifying users through their Name, Type Id and Icon File. This feature allows for the modification of exisiting Species Data or the creation of new Species. This functionality is priamrily based on identifying users throught their Name, Sub Name, Type Id, Species Id, Scientific Name, Etymology, description and attachments",
      navigateTo: "/admin/species",
      data: speciesData,
    },
    {
      title: {
        avatar: "T",
        variant: "Types",
      },
      description:
        "This feature allows for the modification of existing Types Data or the creation of new Types. This functionality is primarily based on identifying users through their Name, Type Id and Icon File.",
      navigateTo: "/admin/types",
      data: typesData,
    },
    {
      title: {
        avatar: "M",
        variant: "Maps",
      },
      description:
        "The primary objective of this feature is to empower users with the ability to visually plan and document the placement of various plant types within a specific geographical area. By allowing users to dynamically add, move, and remove markers on a map, this feature provides a flexible and interactive way to manage plant locations. Each marker is not just a point on the map but a rich repository of information, where users can attach detailed content, such as plant species data, care instructions, and environmental conditions.",
      navigateTo: "/admin/maps",
      data: typesData,
    },
  ];

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
      {dashboardList.map((item) => (
        <DashboardCustomCard
          title={item.title}
          description={item.description}
          navigateTo={item.navigateTo}
          data={item.data}
        />
      ))}
    </React.Fragment>
  );
}
