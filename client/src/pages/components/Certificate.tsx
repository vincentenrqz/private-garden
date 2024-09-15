import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image-more";
import Confetti from "react-confetti";

// type Props = {
//   openCertificate: boolean;
//   setOpenCertificate: React.Dispatch<React.SetStateAction<boolean>>;
// };

const Certificate = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const certificateRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleDownloadImage = () => {
    const input = certificateRef.current;

    if (!input) {
      return;
    }

    const scale = 3;

    const options = {
      width: input.offsetWidth * scale,
      height: input.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${input.offsetWidth}px`,
        height: `${input.offsetHeight}px`,
      },
      quality: 1,
    };

    domtoimage
      .toPng(input, options)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "certificate.png";
        link.click();

        setModalOpen(false);
      })
      .catch((error) => {
        console.error("Error generating image: ", error);
      });

    localStorage.removeItem("clickCounts");
  };

  return (
    <Modal open={isModalOpen}>
      <>
        <Card
          ref={certificateRef}
          variant="elevation"
          elevation={0}
          sx={{
            height: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "40%" },
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 2,
            margin: 0,
            border: "none",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              paddingX: { xs: 2, sm: 0 },
              marginTop: 2,
              border: "none",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "50%" },
                textAlign: "center",
                border: "none",
              }}
            >
              <TextField
                id="standard-helperText"
                defaultValue="John Doe"
                helperText="NAME OF READER"
                variant="standard"
                fullWidth
                InputProps={{
                  sx: {
                    textAlign: "center",
                    border: "none",
                    borderRadius: 0,
                  },
                  inputProps: {
                    style: {
                      textAlign: "center",
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: {
                    textAlign: "center",
                    width: "100%",
                    border: "none",
                    boxShadow: "none",
                  },
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    border: "none",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "1px solid #647c64", // Custom underline color for unfocused state
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "2px solid #647c64", // Thicker underline on hover
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "2px solid #647c64", // Thicker underline when focused
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: 2,
              maxHeight: { xs: 150, sm: 500 },
              overflow: "hidden",
              border: "none",
            }}
          >
            <img
              src="/resources/lastPage.png"
              alt="Certificate Image"
              style={{
                maxHeight: "100%",
                width: "auto",
                border: "none",
              }}
            />
          </Box>
        </Card>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            color: "white",
            marginBottom: 10,
            mt: { xs: 2, sm: 4 },
          }}
        >
          <Button
            onClick={handleDownloadImage}
            variant="contained"
            sx={{
              backgroundColor: "#647c64 !important",
              "&:hover": {
                backgroundColor: "#647c64 !important",
              },
              paddingY: 1,
              width: { xs: "80%", sm: "auto" },
            }}
          >
            <Typography variant="caption">Download</Typography>
          </Button>
        </Box>
        <Confetti
          width={windowWidth}
          height={windowHeight}
          recycle={false}
          numberOfPieces={500}
        />
      </>
    </Modal>
  );
};

export default Certificate;
