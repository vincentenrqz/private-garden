import { Box, Button, CircularProgress } from "@mui/material";
import { useFetchData } from "../../utils/queries";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClickSound } from "../../utils";

export default function LandingPageLoader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useFetchData();
  const [redirect, setRedirect] = useState(() => {
    return localStorage.getItem("redirect") === "true";
  });

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate]);

  const showButton = !loading && location.pathname === "/";
  const showLoader = loading;

  const handleGetStartedClick = () => {
    ClickSound();
    setRedirect(true);
    localStorage.setItem("redirect", "true");
  };

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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showLoader && <CircularProgress size={50} sx={{ color: "#647c64" }} />}
        {showButton && (
          <Button
            variant="contained"
            onClick={handleGetStartedClick}
            sx={{
              backgroundColor: "#647c64 !important",
              "&:hover": {
                backgroundColor: "#647c64 !important",
              },
            }}
          >
            Get Started
          </Button>
        )}
      </Box>
    </Box>
  );
}
