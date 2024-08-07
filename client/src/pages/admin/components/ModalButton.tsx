import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  title: string;
  children: React.ReactNode;
};

const ModalButton = ({ open, setOpen, title, children }: Props) => {
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 500,
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack direction="column" spacing={2}>
              {children}
            </Stack>
          </Box>
        </Card>
      </Modal>
    </div>
  );
};

export default ModalButton;
