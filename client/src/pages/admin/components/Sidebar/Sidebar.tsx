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
import scrollToSection from "../../hooks";

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
      route: "#overview",
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
      route: "#species",
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
      route: "#maps",
    },
    {
      name: "Settings",
      icon: (
        <SettingsIcon
          fontSize="large"
          className={`${
            location.hash === "#settings" ? "text-blue-500" : "text-gray-800"
          }`}
        />
      ),
      route: "#settings",
    },
  ];

  const handleClick = (route: any) => {
    navigate(route);

    const id = route.startsWith("#") ? route.slice(1) : route;
    scrollToSection(id);
  };

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
            onClick={() => handleClick(list.route)}
            className={`${
              location.hash === list.route ? "text-blue-500" : "text-gray-800"
            }`}
          >
            <MenuItem>
              <ListItemIcon className="mr-2">{list.icon}</ListItemIcon>
              <Typography variant="inherit">{list.name}</Typography>
            </MenuItem>
          </MenuList>
        ))}
      </div>
    </Container>
  );
}
