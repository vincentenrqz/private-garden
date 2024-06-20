import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MediaControlCard from "../Overview/TestFile";
import { Grid } from "@mui/material";
import UserSettings from "./UserSettings";

const Settings = () => {
  return (
    <>
      <Header />
      <div className="mx-6 my-10 mr-6">
        <UserSettings />
      </div>
    </>
  );
};

export default Settings;
