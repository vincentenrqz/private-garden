import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { MediaContextProvider } from "../../context/MediaContext";
import LandingPage from "./LandingPage";
import Flipbook from "./Flip";
import { useMediaQuery } from "@mui/material";
import FloatingButton from "../components/FloatingButton";

const pages = [
  {
    id: 1,
    color: "#FFD700",
    content: <LandingPage />,
  },
  {
    id: 2,
    color: "#6a5841",
    content: <Flipbook />,
  },
];

const Main = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    // Animate to the current page when currentPage changes
    controls.start({
      x: -window.innerWidth * currentPage,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  }, [currentPage, controls]);

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
        drag={false}
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

      <FloatingButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Main;
