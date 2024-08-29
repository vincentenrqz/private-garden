import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import FlipbookPage from "./FlipbookPage";
import {
  MediaContextProvider,
  useScreenSize,
} from "../../context/MediaContext";
import LandingPage from "./LandingPage";
import { Stack, Tooltip, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    id: 1,
    color: "#FFD700",
    content: <LandingPage />,
  },
  {
    id: 2,
    color: "#6a5841",
    content: <FlipbookPage />,
  },
];

const Main = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const controls = useAnimation();
  const screenSize = useScreenSize();

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let nextPage = currentPage;

    if (offset < -100 || velocity < -500) {
      nextPage = currentPage < pages.length - 1 ? currentPage + 1 : currentPage;
    } else if (offset > 100 || velocity > 500) {
      nextPage = currentPage > 0 ? currentPage - 1 : currentPage;
    }

    controls.start({
      x: -nextPage * window.innerWidth,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });

    setCurrentPage(nextPage);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentPage(index);
    controls.start({
      x: -index * window.innerWidth,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  };

  const mobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  return (
    <div
      style={{
        overflow: !mobile || currentPage === 1 ? "hidden " : "auto",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <motion.div
        className="container"
        // drag={currentPage !== 1 ? "x" : false}
        drag={"x"}
        dragConstraints={{
          left: -window.innerWidth * (pages.length - 1),
          right: 0,
        }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{
          display: "flex",
          width: `${pages.length * 100}vw`,
          height: "100vh",
        }}
      >
        {pages.map((page, index) => (
          <div
            key={index}
            style={{
              minWidth: "100vw",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              // alignItems: "center", // Remove for iPad
              // backgroundColor: page.color,
              border: "1px solid #ddd",
              position: "relative",
            }}
          >
            <MediaContextProvider>
              <p className="font-mono text-5xl antialiased font-black text-white">
                {page.content}
              </p>
            </MediaContextProvider>
          </div>
        ))}
      </motion.div>

      {/* Floating Button */}
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
    </div>
  );
};

export default Main;
