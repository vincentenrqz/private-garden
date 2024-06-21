import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Box, Grid, useMediaQuery } from "@mui/material";
import MediaControlCard from "../../TestFile";

const AdminDashboard = () => {
  const mobile = useMediaQuery("(max-width:800px)");

  return (
    <>
      <Header />
      <Grid container>
        {mobile && (
          <>
            <Grid item xs={12}>
              <Sidebar />
            </Grid>
            <Grid item xs={12}>
              <div className="my-10 mr-6">
                <Box id="overview">
                  <MediaControlCard />
                </Box>

                <Box id="species">
                  <MediaControlCard />
                </Box>

                <Box id="maps">
                  <MediaControlCard />
                </Box>

                <Box id="settings">
                  <MediaControlCard />
                </Box>
              </div>
            </Grid>
          </>
        )}
        {!mobile && (
          <>
            <Grid item xs={4}>
              <Sidebar />
            </Grid>
            <Grid item xs={8}>
              <div className="my-10 mr-6">
                <Box id="overview">
                  <MediaControlCard />
                </Box>

                <Box id="species">
                  <MediaControlCard />
                </Box>

                <Box id="maps">
                  <MediaControlCard />
                </Box>

                <Box id="settings">
                  <MediaControlCard />
                </Box>
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default AdminDashboard;
