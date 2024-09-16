import { IconButton, Stack, Tooltip } from "@mui/material";
import { ClickSound, filterDataByType } from "../../utils";
import GrassIcon from "@mui/icons-material/Grass";
import ParkIcon from "@mui/icons-material/Park";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import SpaIcon from "@mui/icons-material/Spa";
import { useScreenSize } from "../../context/MediaContext";
import { useState } from "react";
import treesIcon from "./resources/trees.png";

export default function ButtonFilters({
  typeData,
  speciesData,
  buttonFilters,
  setButtonFilters,
}) {
  const [toggle, setToggle] = useState(false);
  const { name } = typeData;
  const screenSize = useScreenSize();
  const screenType = screenSize?.screenSize;

  const filteredData = (types) => {
    setToggle(!toggle);
    ClickSound();

    if (toggle) {
      const data = filterDataByType({ items: speciesData, id: types?._id });
      setButtonFilters(data);
    } else {
      setButtonFilters(null);
    }
  };

  const buttonStyle = {
    backgroundColor:
      typeData.name === "Trees"
        ? "green"
        : typeData.name === "Shrubs"
        ? "blue"
        : typeData.name === "Climbers"
        ? "red"
        : typeData.name === "Creepers"
        ? "purple"
        : typeData.name === "Herbs"
        ? "orange"
        : "gray",
    color: "white",
    borderRadius: 0,
  };

  const handleDataIcon = () => {
    switch (typeData.name) {
      case "Trees":
        return <ParkIcon />;
      case "Shrubs":
        return <SpaIcon />;
      case "Climbers":
        return <LocalFloristIcon />;
      case "Creepers":
        return <FilterVintageIcon />;
      case "Herbs":
        return <GrassIcon />;
      default:
        return <ParkIcon />;
    }
  };

  return (
    <Stack display="flex">
      <Tooltip
        title={`Filter by ${name}`}
        placement={
          screenType === "xs" || screenType === "sm" || screenType === "md"
            ? "bottom"
            : "right"
        }
        arrow
      >
        <IconButton onClick={() => filteredData(typeData)} style={buttonStyle}>
          {handleDataIcon()}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
