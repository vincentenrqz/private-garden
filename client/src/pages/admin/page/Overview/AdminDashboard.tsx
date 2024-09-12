import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Grid, useMediaQuery } from "@mui/material";
import MediaCard from "../../../components/MediaCard";

const AdminDashboard = () => {
  const mobile = useMediaQuery("(max-width:800px)");

  return (
    <div className="bg-[#F4F5F7]">
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          height: "calc(100vh - 64px)",
          overflowY: "auto",
        }}
      >
        <Grid container>
          {mobile && (
            <>
              <Grid item xs={12}>
                <Sidebar />
              </Grid>
              <Grid item xs={12}>
                <div className="my-10">
                  <MediaCard />
                </div>
              </Grid>
            </>
          )}
          {!mobile && (
            <>
              <Grid item xs={3}>
                <Sidebar />
              </Grid>
              <Grid item xs={9}>
                <MediaCard />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
