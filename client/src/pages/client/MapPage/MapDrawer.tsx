import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function MapDrawer({
  toggleDrawer,
  data,
  mobile,
  readMore,
  setReadMore,
}: any) {
  return (
    <React.Fragment>
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
              sx={{ marginTop: 4, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="body2" gutterBottom>
                FAMILY NAME: Moraceae
              </Typography>
              <Typography variant="body2" gutterBottom>
                ECO CLASS: Exotic
              </Typography>
            </Box>
            <Box
              sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="body2" gutterBottom>
                NATIVE DISTRIBUTION:
              </Typography>
              <Typography variant="body2" gutterBottom>
                Northern India, Myanmar, Peninsular Malaysia, Sumatra, Java
              </Typography>
            </Box>
            <Box
              sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="body2" gutterBottom>
                Fun fact:
              </Typography>
              <Typography variant="body2" gutterBottom>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores voluptates odio corrupti perferendis ipsa deleniti eum
                provident dolore, molestias quaerat, soluta odit. Vel suscipit
                tempore enim? Nesciunt ex voluptate dolor!
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
                sx={{ marginTop: 4, display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2" gutterBottom>
                  FAMILY NAME: Moraceae
                </Typography>
                <Typography variant="body2" gutterBottom>
                  ECO CLASS: Exotic
                </Typography>
              </Box>
              <Box
                sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2" gutterBottom>
                  NATIVE DISTRIBUTION:
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Northern India, Myanmar, Peninsular Malaysia, Sumatra, Java
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores voluptates odio corrupti perferendis ipsa deleniti
                    eum provident dolore, molestias quaerat, soluta odit. Vel
                    suscipit tempore enim? Nesciunt ex voluptate dolor!
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
}
