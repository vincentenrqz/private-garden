import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ConfirmationDelete({
  data,
  open,
  handleClose,
  handleDeleteData,
  closeConfirmationHandler,
}: any) {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Are you sure you want to delete this data?
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            This action cannot be undone. Please confirm if you wish to proceed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationHandler}>Close</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteData(data)}
          >
            Delete
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
