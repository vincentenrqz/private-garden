import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import MapPage from "./MapPage";
import CoverPage from "./CoverPage";

const pages = [
  {
    id: 1,
    color: "#FFD700",
    content: <CoverPage />,
  },
  {
    id: 1,
    color: "#FF6347",
    content: <MapPage />,
  },
  {
    id: 3,
    color: "#87CEEB",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const Main = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const controls = useAnimation();

  const handleDragEnd = (info: any) => {
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
    <div
      style={{
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <motion.div
        className="container"
        drag="x"
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
        {pages.map((page) => (
          <div
            key={page.id}
            style={{
              minWidth: "100vw",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: page.color,
              border: "1px solid #ddd",
              position: "relative",
            }}
          >
            <p className="font-mono text-5xl antialiased font-black text-white">
              {page.content}
            </p>
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
