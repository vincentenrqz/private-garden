import { Icon, IconButton, Stack, Tooltip } from "@mui/material";
import { filterDataByType } from "../../../../utils";
import GrassIcon from "@mui/icons-material/Grass";
import ParkIcon from "@mui/icons-material/Park";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import SpaIcon from "@mui/icons-material/Spa";

export default function ButtonFilters({
  typeData,
  speciesData,
  buttonFilters,
  setButtonFilters,
}) {
  const { name } = typeData;
  const filteredData = (types) => {
    const data = filterDataByType({ items: speciesData, id: types?._id });
    setButtonFilters(data);
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
      <Tooltip title={`Filter by ${name}`} placement="top-end" arrow>
        <IconButton onClick={() => filteredData(typeData)} style={buttonStyle}>
          {handleDataIcon()}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
