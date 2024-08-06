import React from "react";
import Header from "../../components/Header/Header";
import { Container, useMediaQuery } from "@mui/material";

const Species = () => {
  const mobile = useMediaQuery("(max-width:800px)");

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <div className="mx-6 py-3">species page</div>
      </Container>
    </>
  );
};

export default Species;
