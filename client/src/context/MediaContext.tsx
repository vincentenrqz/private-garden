import React, { createContext, useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material";

const MediaContext = createContext("xs");

export const useScreenSize = () => useContext(MediaContext);

export const MediaContextProvider = ({ children }: any) => {
  const theme = useTheme();
  const [screenSize, setScreenSize] = useState(() => getScreenSize());

  function getScreenSize() {
    const width = window.innerWidth;

    if (width < theme.breakpoints.values.sm) return "xs";
    if (
      width >= theme.breakpoints.values.sm &&
      width < theme.breakpoints.values.md
    )
      return "sm";
    if (
      width >= theme.breakpoints.values.md &&
      width < theme.breakpoints.values.lg
    )
      return "md";
    if (
      width >= theme.breakpoints.values.lg &&
      width < theme.breakpoints.values.xl
    )
      return "lg";
    return "xl";
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme.breakpoints.values]);

  return (
    <MediaContext.Provider value={screenSize}>{children}</MediaContext.Provider>
  );
};
