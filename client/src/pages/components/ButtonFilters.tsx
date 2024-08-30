import { Icon, IconButton } from "@mui/material";
import React from "react";
import { BsFlower1 } from "react-icons/bs";
import { GiFlowers, GiFruitTree, GiGrass } from "react-icons/gi";
import { handleIconSize } from "../../utils";
import { useFetchData } from "../../utils/queries";

//TODO: SHOULD CHANGE THIS LOGIC TO A DYNAMIC ONE. MAYBE USE FROM ADMIN MAP BUTTON FILTERS REUSABLE
export default function ButtonFilters({
  screenSize,
  setSelectedType,
  handleTypeClick,
  flexStyle,
}: any) {
  const { typesData } = useFetchData();

  const filteredNames = typesData.map((item) => {
    return {
      name: item?.name,
      icon: item?.icons[0]?.iconUrl,
    };
  });

  return (
    <div className={`text-black flex ${flexStyle.child}`}>
      {/* {filteredNames.map((item) => {
        const randomColors = ["yellow", "lime", "blue", "rose", "red"];
        const shades = [300, 400, 500, 600];
        const randomColor =
          randomColors[Math.floor(Math.random() * randomColors.length)];

        const randomShade = shades[Math.floor(Math.random() * shades.length)];
        const backgroundColor = `${randomColor}-${randomShade}`;
        return (
          <div style={{ backgroundColor: `var(--${backgroundColor})` }}>
            <IconButton onClick={() => setSelectedType(item.name)}>
              <Icon fontSize={handleIconSize(screenSize)}>
                <img src={item.icon} alt="" height={40} width={40} />
              </Icon>
            </IconButton>
          </div>
        );
      })} */}

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
