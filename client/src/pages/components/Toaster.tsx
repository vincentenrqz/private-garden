import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";

type Props = {
  message: string;
  status: boolean;
  open: boolean;
};

const Toaster = ({ status, message, open }: Props) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpen(false);
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={status === true ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        <AlertTitle>{status === true ? "Success" : "Error"}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
