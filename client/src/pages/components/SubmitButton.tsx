import React from "react";
import { Button, CircularProgress } from "@mui/material";

type LoadingButtonProps = {
  isLoading: boolean;
  onClick: any;
  children: React.ReactNode;
};

const SubmitButton = ({ isLoading, onClick, children }: LoadingButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={isLoading}
      startIcon={
        isLoading ? <CircularProgress size={20} color="inherit" /> : null
      }
    >
      {isLoading ? "Submitting" : children}
    </Button>
  );
};

export default SubmitButton;
