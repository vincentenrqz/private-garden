import { motion } from "framer-motion";
import { useEffect } from "react";

const PageEffect = ({ isTransitioning }) => {
  return (
    <>
      {/* Fading overlay effect */}
      {isTransitioning && (
        <motion.div
          className="page-effect-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#647c64",
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
};

export default PageEffect;
