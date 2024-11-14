import { Box, Button, CircularProgress } from "@mui/material";
import { useFetchData } from "../../utils/queries";
import { useLocation } from "react-router-dom";
import { ClickSound } from "../../utils";
import { useScreenSize } from "../../context/MediaContext";

export default function LandingPageLoader({ setRedirect }) {
  const location = useLocation();
  const { loading } = useFetchData();
  const screenSize = useScreenSize();

  const showButton = !loading && location.pathname === "/";
  const showLoader = loading;

  const handleGetStartedClick = () => {
    ClickSound();
    setRedirect(true);
  };

  console.log("screenSize", screenSize);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
          position: "relative",
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

        {showLoader && (
          <CircularProgress
            size={50}
            sx={{ color: "#647c64" }}
            className="absolute"
            style={{
              position: "absolute",
              bottom:
                screenSize?.screenSize === "xs"
                  ? 150
                  : screenSize?.screenSize === "sm"
                  ? 250
                  : screenSize?.screenSize === "md"
                  ? 250
                  : 200,
              right: 120,
              backgroundColor: "#647c64 !important",
            }}
          />
        )}
        {showButton && (
          <Button
            variant="contained"
            onClick={handleGetStartedClick}
            sx={{
              position: "absolute",
              bottom:
                screenSize?.screenSize === "xs"
                  ? 150
                  : screenSize?.screenSize === "sm"
                  ? 250
                  : screenSize?.screenSize === "md"
                  ? 250
                  : 200,
              right: 35,
              backgroundColor: "#647c64 !important",
              "&:hover": {
                backgroundColor: "#647c64 !important",
              },
            }}
          >
            Start your Journey
          </Button>
        )}
      </Box>

      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>
    </Box>
  );
}
