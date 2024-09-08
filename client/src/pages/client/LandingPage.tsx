import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useScreenSize } from "../../context/MediaContext";
import FloatingButton from "../components/FloatingButton";

function LandingPage() {
  const screenSize = useScreenSize();
  const screenType = screenSize?.screenSize;

  const height =
    screenSize?.screenSize === "md" ||
    screenSize?.screenSize === "lg" ||
    screenSize?.screenSize === "xl"
      ? "unset"
      : "90vh";

  const flexBoxes =
    screenType === "xs" || screenType === "sm" || screenType === "md"
      ? "column"
      : "row";

  const infoVariation =
    screenType === "xs" || screenType === "sm" ? "subtitle1" : "h5";

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {screenType !== "xs" && screenType !== "sm" && screenType !== "md" && (
          <>
            {/* LEFT SIDE */}
            <img
              src="/resources/leaf4.png"
              alt="Leaf"
              width={100}
              height={100}
              style={{
                position: "absolute",
                top: 0,
                left: -20,
                margin: 10,
              }}
            />
            <img
              src="/resources/leaf3.png"
              alt="Leaf"
              width={100}
              height={100}
              style={{
                position: "absolute",
                top: 200,
                left: 30,
                margin: 10,
                transform: "scaleX(-1)",
              }}
            />
            <img
              src="/resources/leaf2.png"
              alt="Leaf"
              width={100}
              height={100}
              style={{
                position: "absolute",
                top: 400,
                left: -30,
                margin: 10,
                transform: "scaleX(-1)",
              }}
            />
            <img
              src="/resources/leaf5.png"
              alt="Leaf"
              width={100}
              height={100}
              style={{
                position: "absolute",
                bottom: 250,
                left: 50,
                margin: 10,
                transform: "scaleX(-1)",
              }}
            />
            <img
              src="/resources/leaf7.png"
              alt="Leaf"
              width={100}
              height={100}
              style={{
                position: "absolute",
                bottom: 50,
                left: 10,
                margin: 10,
                transform: "scaleX(-1)",
              }}
            />

            {/* RIGHT SIDE */}
            <img
              src="/resources/leaf4.png"
              alt="Leaf"
              width={100}
              height={100}
              style={{
                position: "absolute",
                top: 100,
                right: -20,
                margin: 10,
                transform: "scaleX(-1)",
              }}
            />
            <img
              src="/resources/leaf8.png"
              alt="Leaf"
              width={100}
              height={100}
              style={{
                position: "absolute",
                top: 300,
                right: 50,
                margin: 10,
                transform: "scaleX(-1)",
              }}
            />
            <img
              src="/resources/leaf10.png"
              alt="Leaf"
              width={100}
              height={100}
              style={{
                position: "absolute",
                bottom: 300,
                right: -10,
                margin: 10,
                transform: "scaleX(-1)",
              }}
            />
            <img
              src="/resources/leaf2.png"
              alt="Leaf"
              width={100}
              height={100}
              style={{
                position: "absolute",
                bottom: 100,
                right: 60,
                margin: 10,
              }}
            />
          </>
        )}
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            position: "relative",
            margin: 2,
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: flexBoxes ? "row" : "column",
              width: "100%",
              height: "90%",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: flexBoxes ? "row" : "column",
              }}
            >
              <Grid
                item
                xs={12}
                md={12}
                lg={6}
                sx={{
                  width: flexBoxes ? "50%" : "100%",
                  padding: 2,
                  boxSizing: "border-box",
                }}
              >
                <img
                  src="/resources/welcome-logo-bg.png"
                  alt="test"
                  width={500}
                  height={500}
                />
                <Typography
                  variant={infoVariation}
                  sx={{ color: "#647c64", textAlign: "justify" }}
                  component="p"
                >
                  Come and explore my garden, a vibrant and ever-evolving
                  landscape where technology and creativity blossom together !
                </Typography>
                <Typography
                  variant={infoVariation}
                  sx={{ color: "#647c64", my: 2, textAlign: "justify" }}
                  component="p"
                >
                  As you step into this unique space, discover the breathtaking
                  diversity of trees, crawlers, grass and shrubs, and a charming
                  selection of colorful and beautiful flowers.
                </Typography>
                <Typography
                  variant={infoVariation}
                  sx={{ color: "#647c64", textAlign: "justify" }}
                  component="p"
                >
                  The book features visually stunning photographs and videos
                  that will amuse and entertain.
                </Typography>
                <Typography
                  variant={infoVariation}
                  sx={{ color: "#647c64", textAlign: "justify" }}
                  component="p"
                >
                  As you navigate through the different sections of the garden,
                  go ahead and click the icons. each specie has an interesting
                  trivia and back story you will surely enjoy.
                </Typography>
                <Typography
                  variant={infoVariation}
                  sx={{ color: "#647c64", my: 2, textAlign: "justify" }}
                  component="p"
                >
                  Just like the physical garden, this digital space is designed
                  to inspire curiosity and exploration, carefully curated to
                  offer fresh perspectives and spark new insights.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={6}
                sx={{
                  width: flexBoxes ? "50%" : "100%",
                  padding: 2,
                  boxSizing: "border-box",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    maxWidth: "sm",
                    width: "100%",
                  }}
                >
                  <img
                    src={"/resources/cover-explore.jpg"}
                    alt="Welcome Image"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: height,
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>

      <FloatingButton />
    </>
  );
}

export default React.memo(LandingPage);
