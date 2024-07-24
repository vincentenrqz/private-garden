import { Icon, IconButton } from "@mui/material";
import { BsFlower1 } from "react-icons/bs";
import { GiFlowers, GiFruitTree, GiGrass } from "react-icons/gi";

export default function ButtonFilters({
  setSelectedType,
  handleTypeClick,
}: any) {
  return (
    <div className="text-black flex flex-row">
      <div className="bg-lime-600">
        <IconButton onClick={() => setSelectedType(null)}>
          <Icon fontSize="large">
            <BsFlower1 />
          </Icon>
        </IconButton>
      </div>

      <div className="bg-cyan-200">
        <IconButton onClick={() => handleTypeClick("flower")}>
          <Icon fontSize="large">
            <GiFlowers />
          </Icon>
        </IconButton>
      </div>

      <div className="bg-rose-400">
        <IconButton onClick={() => handleTypeClick("grass")}>
          <Icon fontSize="large">
            <GiGrass />
          </Icon>
        </IconButton>
      </div>

      <div className="bg-yellow-200">
        <IconButton onClick={() => handleTypeClick("tree")}>
          <Icon fontSize="large">
            <GiFruitTree />
          </Icon>
        </IconButton>
      </div>
    </div>
  );
}
