import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Container, ListItemIcon, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import PieChartIcon from "@mui/icons-material/PieChart";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsIcon from "@mui/icons-material/Settings";
import PlaceIcon from "@mui/icons-material/Place";
import ForestIcon from "@mui/icons-material/Forest";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = useMediaQuery("(max-width:800px)");

  const menuList = [
    {
      name: "Species",
      icon: (
        <FormatListBulletedIcon
          fontSize="medium"
          className={`${
            location.hash === "#species" ? "text-blue-500" : "text-blue-800"
          }`}
        />
      ),
      route: "/admin/species",
      cardId: "species",
    },
    {
      name: "Types",
      icon: (
        <ForestIcon
          fontSize="medium"
          className={`${
            location.hash === "#types" ? "text-blue-500" : "text-blue-800"
          }`}
        />
      ),
      route: "/admin/types",
      cardId: "types",
    },
    {
      name: "Maps",
      icon: (
        <PlaceIcon
          fontSize="medium"
          className={`${
            location.hash === "#maps" ? "text-blue-500" : "text-blue-800"
          }`}
        />
      ),
      route: "/admin/maps",
      cardId: "maps",
    },
    // {
    //   name: "Settings",
    //   icon: (
    //     <SettingsIcon
    //       fontSize="medium"
    //       className={`${
    //         location.hash === "#user-settings"
    //           ? "text-blue-500"
    //           : "text-blue-800"
    //       }`}
    //     />
    //   ),
    //   route: "/admin/user-settings",
    //   cardId: "user-settings",
    // },
  ];

  //Menu list should be in # anchor target and not in pages since pages will be listed in the header
  return (
    <div
      className={`border mx-6 my-6 p-4 shadow-xl rounded-xl ${
        !mobile ? "fixed w-1/6" : "inherit"
      } bg-white`}
    >
      {menuList.map((list) => (
        <MenuList
          key={list.name}
          // onClick={() => navigate(list.route)}
          className={`${
            location.hash === `#${list.cardId}`
              ? "text-blue-500"
              : "text-gray-800"
          } `}
        >
          <a
            href={`#${list.cardId}`}
            onClick={() => smoothScroll(list.cardId)}
            className="flex items-center"
          >
            <MenuItem sx={{ width: "100%" }}>
              <ListItemIcon className="mr-1">{list.icon}</ListItemIcon>
              <Typography variant="subtitle1">{list.name}</Typography>
            </MenuItem>
          </a>
        </MenuList>
      ))}
    </div>
  );
}

function smoothScroll(targetId: string) {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
