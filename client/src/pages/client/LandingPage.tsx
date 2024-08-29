import React from "react";
import { Box, Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function LandingPage() {
  const mobile = useMediaQuery("(max-width:900px)");

  return (
    <Box component="section" sx={{ py: 5, bgcolor: "white" }}>
      <Container>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={mobile ? "column" : "row"}
        >
          {/* Text Section */}
          <Box
            sx={{
              flexBasis: "50%",
              textAlign: "left",
              mx: "auto",
            }}
          >
            <img
              src="/resources/welcome-logo.png"
              alt="test"
              width={400}
              height={400}
            />
            <Typography
              variant="subtitle1"
              sx={{ color: "#647c64" }}
              component="p"
            >
              Come and explore my garden, a vibrant and ever-evolving landscape
              where technology and creativity blossom together !
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#647c64", my: 2 }}
              component="p"
            >
              As you step into this unique space, discover the breathtaking
              diversity of trees, crawlers, grass and shrubs, and a charming
              selection of colorful and beautiful flowers.
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#647c64" }}
              component="p"
            >
              The book features visually stunning photographs and videos that
              will amuse and entertain.
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#647c64" }}
              component="p"
            >
              As you navigate through the different sections of the garden, go
              ahead and click the icons. each specie has an interesting trivia
              and back story you will surely enjoy.
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#647c64", my: 2 }}
              component="p"
            >
              Just like the physical garden, this digital space is designed to
              inspire curiosity and exploration, carefully curated to offer
              fresh perspectives and spark new insights.
            </Typography>
          </Box>

          {/* Image Section */}
          <Box display="flex" justifyContent="center" mt={mobile ? 5 : 0}>
            <Box
              sx={{
                position: "relative",
                maxWidth: "sm",
                width: "100%",
                height: "100vh",
              }}
            >
              <img
                src={"/resources/cover-explore.jpg"}
                alt="Welcome Image"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: mobile ? "unset" : "90vh",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default React.memo(LandingPage);
