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
            location.pathname === "/admin/dashboard/"
              ? "text-blue-500"
              : "text-gray-800"
          }`}
        />
      ),
      route: "/admin/dashboard/",
    },
    {
      name: "Species",
      icon: (
        <FormatListBulletedIcon
          fontSize="large"
          className={`${
            location.pathname === "/admin/species/"
              ? "text-blue-500"
              : "text-gray-800"
          }`}
        />
      ),
      route: "/admin/species/",
    },
    {
      name: "Maps",
      icon: (
        <PlaceIcon
          fontSize="large"
          className={`${
            location.pathname === "/admin/maps/"
              ? "text-blue-500"
              : "text-gray-800"
          }`}
        />
      ),
      route: "/admin/maps/",
    },
    {
      name: "Settings",
      icon: (
        <SettingsIcon
          fontSize="large"
          className={`${
            location.pathname === "/admin/settings/"
              ? "text-blue-500"
              : "text-gray-800"
          }`}
        />
      ),
      route: "/admin/settings/",
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
            onClick={() => navigate(list.route)}
            className={`${
              location.pathname === list.route
                ? "text-blue-500"
                : "text-gray-800"
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
