import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useScreenSize } from "../../context/MediaContext";
import FloatingButton from "../components/FloatingButton";
import voice from "../../../public/resources/AG-privategarden-intro01.wav";

const LandingPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const screenSize = useScreenSize();
  const screenType = screenSize?.screenSize;
  console.log("screenType", screenType);

  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        setIsPlaying(false);
      }
    };

    playAudio();

    return () => {
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // const height =
  //   screenSize?.screenSize === "md" ||
  //   screenSize?.screenSize === "lg" ||
  //   screenSize?.screenSize === "xl"
  //     ? "unset"
  //     : "90vh";

  const flexBoxes =
    screenType === "xs" || screenType === "sm" || screenType === "md"
      ? "column"
      : "row";

  const infoVariation =
    screenType === "xs" || screenType === "sm" ? "subtitle1" : "h5";

  const textMargin = screenType === "xl" ? 10 : screenType === "lg" ? 5 : 3;

  return (
    <>
      <div
        style={{
          backgroundImage: `url(resources/backgroundMap.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {(screenType === "xl" || screenType === "lg") && (
          <img
            src="/resources/Bougainvillea.png"
            alt="Leaf"
            width={screenType === "xl" ? 600 : screenType === "lg" ? 500 : 600}
            height={screenType === "xl" ? 600 : screenType === "lg" ? 500 : 600}
            style={{
              position: "absolute",
              top: -50,
              right: -110,
              margin: 10,
              zIndex: 1000,
            }}
          />
        )}
        {/* {screenType !== "xs" && screenType !== "sm" && screenType !== "md" && (
          <>
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
        )} */}
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
          {(screenType === "xl" || screenType === "lg") && (
            <Box sx={{ paddingRight: 10 }}>
              <img
                src="/resources/welcome_splash.png"
                alt="Leaf"
                width={400}
                height={400}
              />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: flexBoxes ? "row" : "column",
              marginY: 10,
              width: screenType === "xl" || screenType === "lg" ? "50%" : "90%",
              height: "75%",
              zIndex: 1,
              // backgroundColor: "white",
              position: "relative",
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
                lg={12}
                sx={{
                  width: flexBoxes ? "50%" : "100%",
                  padding: 2,
                  margin: textMargin,
                  boxSizing: "border-box",
                  position: "relative",
                  background: "white",
                }}
              >
                <Box
                  display="flex"
                  flexDirection={flexBoxes ? "row" : "column"}
                  alignItems="center"
                >
                  <img
                    src="/resources/welcome-logo-bg.png"
                    alt="test"
                    style={{ width: "400px", height: "auto" }}
                  />
                </Box>

                <Typography
                  variant={infoVariation}
                  sx={{
                    color: "#647c64",
                    textAlign: "justify",
                    fontSize: { xs: "14px", sm: "16px", md: "20px" },
                    wordBreak: "break-word",
                  }}
                  component="p"
                >
                  Welcome to an Exciting Journey!
                </Typography>

                <Typography
                  variant={infoVariation}
                  sx={{
                    color: "#647c64",
                    my: 2,
                    textAlign: "justify",
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "18px",
                      lg: "16px",
                      xl: "16px",
                    },
                    wordBreak: "break-word",
                  }}
                  component="p"
                >
                  Come and explore my garden, a vibrant and ever-evolving
                  landscape where technology and creativity blossom together!{" "}
                  <br />
                  <br /> As you step into this unique space, discover the
                  breathtaking diversity of trees, crawlers, grass, and shrubs,
                  and a charming selection of colorful and beautiful flowers.{" "}
                  <br />
                  <br />
                  The book features visually stunning photographs and videos
                  that will amuse and entertain.
                  <br />
                  <br /> As you navigate through the different sections of the
                  garden, go ahead and click the icons. Each species has an
                  interesting trivia and backstory you will surely enjoy. <br />
                  <br /> Like the physical garden, this digital space is
                  designed to inspire curiosity and exploration, carefully
                  curated to offer fresh perspectives and spark new insights.
                  <br />
                  <br /> Immerse yourself fully and let your curiosity guide
                  you. Get ready to explore, interact, and discover. Here, ideas
                  grow freely and every corner holds something new and exciting.
                  Click the book icon to learn about featured species and the
                  earth icon to navigate the garden.
                </Typography>
              </Grid>
            </Grid>
            <div
              className="alexa-container"
              onClick={togglePlay}
              style={{
                position: "fixed", // Fixes the position relative to the viewport
                bottom:
                  screenType === "xl"
                    ? "100px"
                    : screenType === "lg"
                    ? "100px"
                    : "20px",
                right:
                  screenType === "xl"
                    ? "250px"
                    : screenType === "lg"
                    ? "60px"
                    : "20px", // 20px from the right of the screen
                zIndex: 1000, // Ensure it's on top of other content
                width: "100px", // Test size for the Alexa container
                height: "100px", // Test size for the Alexa container
              }}
            >
              <div className={`alexa-icon ${isPlaying ? "playing" : ""}`}>
                <audio ref={audioRef} src={voice}></audio>
              </div>
            </div>
          </Box>
          {(screenType === "xs" ||
            screenType === "sm" ||
            screenType === "md") && (
            <Box
              sx={{
                position: "fixed", // Fixed position
                bottom: 0, // Positioned at the bottom
                left: 0, // Positioned at the left
                zIndex: 0, // Ensure it's on top of other elements
                padding: 2, // Optional padding
              }}
            >
              <img
                src="/resources/welcome_splash.png"
                alt="Leaf"
                width={300}
                height={300}
              />
            </Box>
          )}
        </Container>
      </div>

      <FloatingButton />
    </>
  );
};

export default React.memo(LandingPage);
