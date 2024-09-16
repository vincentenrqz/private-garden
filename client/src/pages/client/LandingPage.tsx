import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useScreenSize } from "../../context/MediaContext";
import FloatingButton from "../components/FloatingButton";
import voice from "../../../public/resources/voice_over.mp3";

function LandingPage() {
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

  const textMargin = screenType === "xl" ? 10 : screenType === "lg" ? 20 : 2;

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
                lg={12}
                sx={{
                  width: flexBoxes ? "50%" : "100%",
                  padding: 2,
                  margin: textMargin,
                  boxSizing: "border-box",
                }}
              >
                <Box display="flex">
                  <img
                    src="/resources/welcome-logo-bg.png"
                    alt="test"
                    width={500}
                    height={500}
                  />
                  <div className="alexa-container" onClick={togglePlay}>
                    <div className={`alexa-icon ${isPlaying ? "playing" : ""}`}>
                      {/* Audio element */}
                      <audio ref={audioRef} src={voice}></audio>
                    </div>
                  </div>
                </Box>
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
            </Grid>
          </Box>
        </Container>
      </div>

      <FloatingButton />
    </>
  );
}

export default React.memo(LandingPage);
