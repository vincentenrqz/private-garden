import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Grid, useMediaQuery } from "@mui/material";
import MediaCard from "./MediaCard";

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
                <MediaCard />
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
                <MediaCard />
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default AdminDashboard;
