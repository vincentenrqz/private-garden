import React from "react";
import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import { SpeciesDto } from "../../../types/species.interface";

type Props = {
  data: SpeciesDto;
  openMenu: boolean;
  anchorEl: any;
  handleClick: (e: any, data: SpeciesDto) => void;
  handleClose: () => void;
  handleDelete: (id: any) => void;
  handleEdit: (id: string | undefined) => void;
};

const CustomMenuList = ({
  data,
  openMenu,
  anchorEl,
  handleClick,
  handleClose,
  handleDelete,
  handleEdit,
}: Props) => {
  return (
    <>
      <IconButton
        id="fade-button"
        aria-controls={openMenu ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={(e) => handleClick(e, data)}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "none",
            border: "1px solid rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        {/* <MenuItem onClick={() => handleEdit(data?._id)}>
          <Stack direction="row" spacing={1} alignItems="center">
            <RemoveRedEyeIcon fontSize="small" color="info" />
            <Typography variant="body2">View</Typography>
          </Stack>
        </MenuItem> */}
        <MenuItem onClick={() => handleEdit(data?._id)}>
          <Stack direction="row" spacing={1} alignItems="center">
            <EditIcon fontSize="small" color="primary" />
            <Typography variant="body2">Edit</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handleDelete(data?._id)}>
          <Stack direction="row" spacing={1} alignItems="center">
            <RemoveCircleIcon fontSize="small" color="error" />
            <Typography variant="body2">Delete</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CustomMenuList;
