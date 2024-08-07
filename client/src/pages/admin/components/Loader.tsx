import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = ({ marginTop = 40 }: any) => {
  return (
    <>
      <Box
        sx={{
          marginTop,
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    </>
  );
};

export default Loader;
