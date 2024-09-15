import { Box, CircularProgress } from "@mui/material";

export default function LandingPageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        marginX: "auto",
        position: "relative",
      }}
    >
      <Box
        sx={{
          maxWidth: "sm",
          marginX: "auto",
        }}
      >
        <img
          src={"/resources/cover-explore.jpg"}
          alt="Welcome Image"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "100vh",

            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    </Box>
  );
}
