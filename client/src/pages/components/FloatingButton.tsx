import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Certificate from "./Certificate";
import { ClickSound } from "../../utils";

type Props = {
  clickedCounts?: number[];
};

const FloatingButton = ({ clickedCounts }: Props) => {
  const [progress, setProgress] = useState<number>(0);
  const [progressClick, setProgressClick] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path: string) => {
    ClickSound();
    navigate(path);
  };

  useEffect(() => {
    const getProgress = () => {
      if (clickedCounts) {
        const totalSteps = 20;
        const completedSteps = clickedCounts.filter(
          (value) => value === 1
        ).length;

        const progress =
          (Math.min(completedSteps, totalSteps) / totalSteps) * 100;
        setProgress(progress);
      }
    };

    getProgress();
  }, [clickedCounts]);

  const handleProgressClick = () => {
    if (progress === 100) {
      setProgressClick(!progressClick);
    }
  };

  return (
    <React.Fragment>
      {location.pathname === "/maps" && (
        <Tooltip
          title="Total progression"
          placement="left"
          sx={{ zIndex: 3001 }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: "fixed",
              bottom: { xs: "320px", md: "600px" },
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
            className="bg-gray-200"
            onClick={progress === 100 ? handleProgressClick : undefined}
          >
            <Box position="relative" display="inline-flex">
              <CircularProgress
                variant="determinate"
                value={progress}
                size={80}
                thickness={4}
                sx={{ color: "#647c64" }}
              />

              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="textSecondary"
                >
                  Species Goal
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Tooltip>
      )}
      <Tooltip
        title="Navigate to landing page"
        placement="bottom"
        sx={{ zIndex: 3001 }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            top: { xs: "10px", md: "20px" },
            left: { xs: "30%", md: "40%", lg: "42%" },
            transform: "translateX(-50%)",
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
            handleClick("/");
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
        </Stack>
      </Tooltip>

      <Tooltip
        title="Navigate to glossary page"
        placement="bottom"
        sx={{ zIndex: 3001 }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            top: { xs: "10px", md: "20px" },
            left: "50%",
            transform: "translateX(-50%)",
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
            handleClick("/flipbook");
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
        placement="bottom"
        sx={{ zIndex: 3001 }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "fixed",
            top: { xs: "10px", md: "20px" },
            left: { xs: "70%", md: "60%", lg: "58%" },
            transform: "translateX(-50%)",
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
            handleClick("/maps");
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
      {progressClick && <Certificate />}
    </React.Fragment>
  );
};

export default FloatingButton;
