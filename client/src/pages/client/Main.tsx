import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import FlipbookPage from "./FlipbookPage";
import {
  MediaContextProvider,
  useScreenSize,
} from "../../context/MediaContext";
import LandingPage from "./LandingPage";

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

  return (
    // <div
    //   className={`bg-gradient-page ${
    //     screenSize?.screenSize === "xs"
    //       ? "min-w-full min-h-screen flex justify-center"
    //       : "min-w-full min-h-screen flex justify-center pt-5 items-center"
    //   }`}
    // >
    //   <Map />
    // </div>
    <div
      style={{
        overflow: "auto",
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
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {pages.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 mx-2 rounded-full cursor-pointer ${
              index === currentPage ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Main;
