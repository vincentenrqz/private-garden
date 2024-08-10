import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import PieChartIcon from "@mui/icons-material/PieChart";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsIcon from "@mui/icons-material/Settings";
import PlaceIcon from "@mui/icons-material/Place";
import { Container, ListItemIcon, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = useMediaQuery("(max-width:800px)");

  const menuList = [
    {
      name: "Overiew",
      icon: (
        <PieChartIcon
          fontSize="large"
          className={`${
            location.hash === "#overview" ? "text-blue-500" : "text-gray-800"
          }`}
        />
      ),
      route: "/admin",
      cardId: "overview",
    },
    {
      name: "Species",
      icon: (
        <FormatListBulletedIcon
          fontSize="large"
          className={`${
            location.hash === "#species" ? "text-blue-500" : "text-gray-800"
          }`}
        />
      ),
      route: "/admin/species",
      cardId: "species",
    },
    {
      name: "Types",
      icon: (
        <PlaceIcon
          fontSize="large"
          className={`${
            location.hash === "#types" ? "text-blue-500" : "text-gray-800"
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
          fontSize="large"
          className={`${
            location.hash === "#maps" ? "text-blue-500" : "text-gray-800"
          }`}
        />
      ),
      route: "/admin/maps",
      cardId: "maps",
    },
    {
      name: "Types",
      icon: (
        <PlaceIcon
          fontSize="large"
          className={`${
            location.hash === "/types" ? "text-blue-500" : "text-gray-800"
          }`}
        />
      ),
      route: "/admin/types",
      cardId: "Types",
    },
    {
      name: "Settings",
      icon: (
        <SettingsIcon
          fontSize="large"
          className={`${
            location.hash === "#user-settings"
              ? "text-blue-500"
              : "text-gray-800"
          }`}
        />
      ),
      route: "/admin/user-settings",
      cardId: "user-settings",
    },
  ];

  //Menu list should be in # anchor target and not in pages since pages will be listed in the header
  return (
    <Container maxWidth="xl">
      <div
        className={`border mx-6 my-10 p-6 shadow-xl rounded-lg ${
          !mobile ? "fixed w-1/4" : "inherit"
        }`}
      >
        {menuList.map((list) => (
          <MenuList
            key={list.name}
            // onClick={() => navigate(list.route)}
            className={`${
              location.hash === `#${list.cardId}`
                ? "text-blue-500"
                : "text-gray-800"
            }`}
          >
            <a
              href={`#${list.cardId}`}
              onClick={() => smoothScroll(list.cardId)}
              className="flex items-center"
            >
              <MenuItem>
                <ListItemIcon className="mr-2">{list.icon}</ListItemIcon>
                <Typography variant="inherit">{list.name}</Typography>
              </MenuItem>
            </a>
          </MenuList>
        ))}
      </div>
    </Container>
  );
}

function smoothScroll(targetId: string) {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
