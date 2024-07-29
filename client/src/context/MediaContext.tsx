import React, { createContext, useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material";

interface MediaContextValue {
  screenSize: string;
  orientation: string;
}

const MediaContext = createContext<MediaContextValue | undefined>(undefined);

export const useScreenSize = () => useContext(MediaContext);

export const MediaContextProvider = ({ children }: any) => {
  const theme = useTheme();
  const [screenSize, setScreenSize] = useState(() => getScreenSize());
  const [orientation, setOrientation] = useState(() => getOrientation());

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

  function getOrientation() {
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
      setOrientation(getOrientation());
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [theme.breakpoints.values]);

  return (
    <MediaContext.Provider value={{ screenSize, orientation }}>
      {children}
    </MediaContext.Provider>
  );
};
