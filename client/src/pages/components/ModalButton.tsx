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
import { styled } from "@mui/system";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  title: string;
  children: React.ReactNode;
};

const ScrollableBox = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.action.hover || "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.paper || "#f0f0f0",
  },
}));

const ModalButton = ({ open, setOpen, title, children }: Props) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 500,
          height: "80vh",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 350, sm: 500 },
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
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
        <ScrollableBox>
          <Box sx={{ p: 2 }}>
            <Stack direction="column" spacing={2}>
              {children}
            </Stack>
          </Box>
        </ScrollableBox>
      </Card>
    </Modal>
  );
};

export default ModalButton;
