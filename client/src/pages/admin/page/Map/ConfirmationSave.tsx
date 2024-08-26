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

export default function ConfirmationSave({
  data,
  open,
  handleClose,
  handleSave,
}: any) {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Save Map Data
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
            Are you sure you want to save maps data?
          </Typography>
          <List sx={{ padding: 0 }}>
            {data?.map((d) => (
              <ListItem
                key={d?.name}
                disableGutters
                sx={{
                  alignItems: "center",
                  padding: "4px 0",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "20px",
                    marginTop: "5px",
                  }}
                >
                  <FiberManualRecord
                    fontSize="small"
                    sx={{
                      fontSize: "8px",
                      color: "primary.main",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="span">
                      {d?.name}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Type: {d?.type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Position: {d?.position?.lat} - {d?.position?.lng}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
