import React from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";

function FloatingButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const currentPath = location.pathname;

    if (currentPath === "/") {
      navigate("/flipbook");
    } else if (currentPath === "/flipbook") {
      navigate("/");
    } else if (currentPath === "/maps") {
      navigate("/maps");
    }
  };
  return (
    <React.Fragment>
      {/* FLOATING HOME BTN */}
      <Tooltip
        title="Navigate to landing page"
        placement="left"
        sx={{ zIndex: 3001 }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            bottom: { xs: "180px", md: "220px" },
            right: { xs: "15px", md: "30px" },
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            width: { xs: "60px", md: "80px" },
            height: { xs: "60px", md: "80px" },
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
          }}
          className={`${
            location.pathname === "/" ? "bg-[#306d53]" : "bg-gray-200"
          } hover:bg-[#306d53] transition duration-300 ease-in-out`}
          onClick={() => {
            handleClick;
            navigate("/");
          }}
        >
          <img
            src="/resources/house.gif"
            alt="House Button"
            style={{
              width: "70%",
              height: "70%",
              borderRadius: "50%",
            }}
          />
          {/* <IconButton aria-label="home">
            <HomeIcon fontSize="large" sx={{ fontSize: { xs: 30, md: 40 } }} />
          </IconButton> */}
        </Stack>
      </Tooltip>

      {/* FLOATING GLOSSARY BTN */}
      <Tooltip
        title="Navigate to glossary page"
        placement="left"
        sx={{ zIndex: 3001 }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            bottom: { xs: "110px", md: "130px" },
            right: { xs: "15px", md: "30px" },
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            width: { xs: "60px", md: "80px" },
            height: { xs: "60px", md: "80px" },
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
          }}
          className={`${
            location.pathname === "/flipbook" ? "bg-[#306d53]" : "bg-gray-200"
          } hover:bg-[#306d53] transition duration-300 ease-in-out`}
          onClick={() => {
            handleClick;
            navigate("/flipbook");
          }}
        >
          <img
            src="/resources/book.gif"
            alt="Glossary Button"
            style={{
              width: "50%",
              height: "50%",
              borderRadius: "50%",
            }}
          />
        </Stack>
      </Tooltip>

      {/* FLOATING MAP BTN */}
      <Tooltip
        title="Navigate to map page"
        placement="left"
        sx={{ zIndex: 3001 }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            bottom: "40px",
            right: { xs: "15px", md: "30px" },
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            width: { xs: "60px", md: "80px" },
            height: { xs: "60px", md: "80px" },
            zIndex: 3000,
          }}
          className={`${
            location.pathname === "/maps" ? "bg-[#306d53]" : "bg-gray-200"
          } hover:bg-[#306d53] transition duration-300 ease-in-out`}
          onClick={() => {
            handleClick;
            navigate("/maps");
          }}
        >
          <img
            src="/resources/animated-earth.gif"
            alt="Floating Button"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        </Stack>
      </Tooltip>
    </React.Fragment>
  );
}

export default FloatingButton;
