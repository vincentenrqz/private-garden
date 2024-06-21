import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MediaControlCard from "../../TestFile";
import { Grid, useMediaQuery } from "@mui/material";
import UserSettings from "./UserSettings";

const Settings = () => {
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
                <MediaControlCard />
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
                <MediaControlCard />
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Settings;
