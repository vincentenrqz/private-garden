import { IconButton, Stack, Tooltip } from "@mui/material";
import { ClickSound, filterDataByType } from "../../utils";
import { useScreenSize } from "../../context/MediaContext";
import { useState } from "react";

// Import images from the resources folder
import Trees from "../../../public/resources/trees.png";
import Shrubs from "../../../public/resources/shrubs.png";
import Palms from "../../../public/resources/palms.png";
import Grasses from "../../../public/resources/grasses.png";
import Climbers from "../../../public/resources/climbers.png";
import GroundCover from "../../../public/resources/ground-cover.png";

export default function ButtonFilters({
  admin,
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

  const iconStyle = {
    width: admin ? "50%" : "100%",
    height: "auto",
  };

  const handleDataIcon = () => {
    switch (typeData.name) {
      case "Trees":
        return <img src={Trees} alt="Trees" style={iconStyle} />;
      case "Shrubs":
        return <img src={Shrubs} alt="Shrubs" style={iconStyle} />;
      case "Palms":
        return <img src={Palms} alt="Palms" style={iconStyle} />;
      case "Grasses Bamboos and Ferns":
        return <img src={Grasses} alt="Grasses" style={iconStyle} />;
      case "Climbers":
        return <img src={Climbers} alt="Climbers" style={iconStyle} />;
      case "Ground Cover":
        return <img src={GroundCover} alt="Ground Cover" style={iconStyle} />;
      default:
        return <img src={Trees} alt="Default" style={iconStyle} />;
    }
  };

  return (
    <Stack display="flex">
      <Tooltip
        title={`Filter by ${name}`}
        placement={
          screenType === "xs" || screenType === "sm" || screenType === "md"
            ? "top"
            : "right"
        }
        arrow
      >
        <IconButton
          onClick={() => filteredData(typeData)}
          style={{
            minWidth: 40,
            minHeight: 40,
            borderRadius: "12px",
            margin: 3,
            boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            background: "#647c64",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          {handleDataIcon()}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
