import React from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";

function FloatingButton({ currentPage, setCurrentPage }: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleNavigatePage = (page: any) => {
    if (pathname === "/maps") {
      if (page === 0) {
        navigate("/");
        setCurrentPage(0);
      } else if (page === 1) {
        navigate("/");
        setCurrentPage(1);
      } else {
        navigate("/maps");
      }
    } else {
      handlePageChange(page);
    }
  };

  return (
    <React.Fragment>
      {/* FLOATING HOME BTN */}
      <Tooltip title="Navigate to landing page" placement="top">
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            bottom: { xs: "180px", md: "220px" },
            right: { xs: "5px", md: "30px" },
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            width: { xs: "60px", md: "80px" },
            height: { xs: "60px", md: "80px" },
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          className="bg-gray-200 hover:bg-[#306d53]  transition duration-300 ease-in-out"
          onClick={() => handleNavigatePage(0)}
        >
          <IconButton aria-label="home">
            <HomeIcon fontSize="large" sx={{ fontSize: { xs: 30, md: 40 } }} />
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
            bottom: { xs: "110px", md: "130px" },
            right: { xs: "5px", md: "30px" },
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            width: { xs: "60px", md: "80px" },
            height: { xs: "60px", md: "80px" },
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          className="bg-gray-200 hover:bg-[#306d53]  transition duration-300 ease-in-out"
          onClick={() => handleNavigatePage(1)}
        >
          <IconButton aria-label="glossary">
            <MenuBookIcon
              fontSize="large"
              sx={{ fontSize: { xs: 30, md: 40 } }}
            />
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
            right: { xs: "5px", md: "30px" },
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            width: { xs: "60px", md: "80px" },
            height: { xs: "60px", md: "80px" },
            zIndex: 9999,
          }}
          className="bg-gray-200 hover:bg-[#306d53] transition duration-300 ease-in-out"
          onClick={() => navigate("/maps")}
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
