import { Icon, IconButton } from "@mui/material";
import React from "react";
import { BsFlower1 } from "react-icons/bs";
import { GiFlowers, GiFruitTree, GiGrass } from "react-icons/gi";
import { handleIconSize } from "../../utils";

//TODO: SHOULD CHANGE THIS LOGIC TO A DYNAMIC ONE. MAYBE USE FROM ADMIN MAP BUTTON FILTERS REUSABLE
export default function ButtonFilters({
  screenSize,
  setSelectedType,
  handleTypeClick,
  flexStyle,
}: any) {
  return (
    <div className={`text-black flex ${flexStyle.child}`}>
      <div className="bg-lime-600">
        <IconButton onClick={() => setSelectedType(null)}>
          <Icon fontSize={handleIconSize(screenSize)}>
            <BsFlower1 />
          </Icon>
        </IconButton>
      </div>

      <div className="bg-cyan-200">
        <IconButton onClick={() => handleTypeClick("flower")}>
          <Icon fontSize={handleIconSize(screenSize)}>
            <GiFlowers />
          </Icon>
        </IconButton>
      </div>

      <div className="bg-rose-400">
        <IconButton onClick={() => handleTypeClick("grass")}>
          <Icon fontSize={handleIconSize(screenSize)}>
            <GiGrass />
          </Icon>
        </IconButton>
      </div>

      <div className="bg-yellow-200">
        <IconButton onClick={() => handleTypeClick("tree")}>
          <Icon fontSize={handleIconSize(screenSize)}>
            <GiFruitTree />
          </Icon>
        </IconButton>
      </div>
    </div>
  );
}
