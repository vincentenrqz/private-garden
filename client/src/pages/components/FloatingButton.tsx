import React from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";

function FloatingButton({ currentPage, setCurrentPage }: any) {
  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <React.Fragment>
      {/* FLOATING GLOSSARY BTN */}
      <Tooltip title="Navigate to landing page" placement="top">
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            bottom: "220px",
            right: "30px",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            width: "80px",
            height: "80px",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="bg-gray-200 hover:bg-[#306d53]  transition duration-300 ease-in-out"
          onClick={() => handlePageChange(0)}
        >
          <IconButton aria-label="glossary">
            <HomeIcon fontSize="large" color="inherit" />
          </IconButton>
        </Stack>
      </Tooltip>

      {/* FLOATING GLOSSARY BTN */}
      <Tooltip title="Navigate to glossary page" placement="top">
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            bottom: "130px",
            right: "30px",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            width: "80px",
            height: "80px",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="bg-gray-200 hover:bg-[#306d53]  transition duration-300 ease-in-out"
          onClick={() => handlePageChange(1)}
        >
          <IconButton aria-label="glossary">
            <MenuBookIcon fontSize="large" color="inherit" />
          </IconButton>
        </Stack>
      </Tooltip>

      {/* FLOATING MAP BTN */}
      <Tooltip title="Navigate to map page" placement="top">
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            bottom: "40px",
            right: "30px",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            width: "80px",
            height: "80px",
          }}
          className="bg-gray-200 hover:bg-[#306d53] transition duration-300 ease-in-out"
          //   onClick={() => navigate("/maps")}
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
