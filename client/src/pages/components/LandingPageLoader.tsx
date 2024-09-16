import { Box, CircularProgress } from "@mui/material";

export default function LandingPageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Stack elements vertically
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={"/resources/cover-explore.jpg"}
          alt="Welcome Image"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "90vh",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={50} sx={{ color: "#647c64" }} />
      </Box>
    </Box>
  );
}
