import { Global } from "@emotion/react";
import {
  Box,
  Button,
  styled,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function MapDrawer({
  toggleDrawer,
  data,
  mobile,
  readMore,
  setReadMore,
  open,
}: any) {
  const drawerBleeding = 56;
  return (
    <React.Fragment>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>Test</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {!mobile ? (
            <Box sx={{ padding: 2, overflowY: "auto" }}>
              {/* <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}
      >
        <button onClick={() => toggleDrawer(false)}>x</button>
      </Box> */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  //   justifyContent: "space-between",
                  //   alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Rubber Tree 'Lemon Lime'
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Ficus elastica variegata
                </Typography>
                <Box
                  component="img"
                  sx={{
                    height: 400,
                    width: 350,
                    maxHeight: { xs: 233, md: 167, lg: 400 },
                    maxWidth: { xs: 350, md: 250 },
                    objectFit: "cover",
                  }}
                  alt="The house from the offer."
                  src="https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8="
                />
                <Box
                  sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    FAMILY NAME: Moraceae
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    ECO CLASS: Exotic
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    NATIVE DISTRIBUTION:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Northern India, Myanmar, Peninsular Malaysia, Sumatra, Java
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    Fun fact:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores voluptates odio corrupti perferendis ipsa deleniti
                    eum provident dolore, molestias quaerat, soluta odit. Vel
                    suscipit tempore enim? Nesciunt ex voluptate dolor!
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box sx={{ padding: 2, overflowY: "auto" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row", // Maintain row layout
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 400,
                    width: 350,
                    maxHeight: { xs: 233, md: 167, lg: 400 },
                    maxWidth: { xs: 350, md: 250 },
                    objectFit: "cover",
                  }}
                  alt="The house from the offer."
                  src="https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8="
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1, // Allow text box to fill remaining space
                    marginLeft: 2, // Add margin for spacing
                  }}
                >
                  <Typography variant="h4">Rubber Tree 'Lemon Lime'</Typography>
                  <Typography variant="h6">Ficus elastica variegata</Typography>
                  <Box
                    sx={{
                      marginTop: 4,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body2" gutterBottom>
                      FAMILY NAME: Moraceae
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      ECO CLASS: Exotic
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body2" gutterBottom>
                      NATIVE DISTRIBUTION:
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Northern India, Myanmar, Peninsular Malaysia, Sumatra,
                      Java
                    </Typography>
                  </Box>
                  {!readMore && (
                    <Button onClick={() => setReadMore(true)}>Read More</Button>
                  )}
                  {readMore && (
                    <Box
                      sx={{
                        marginTop: 2,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="body2" gutterBottom>
                        Fun fact:
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Maiores voluptates odio corrupti perferendis ipsa
                        deleniti eum provident dolore, molestias quaerat, soluta
                        odit. Vel suscipit tempore enim? Nesciunt ex voluptate
                        dolor!
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
          {/* <Skeleton variant="rectangular" height="100%" /> */}
        </StyledBox>
      </SwipeableDrawer>
    </React.Fragment>
  );
}
