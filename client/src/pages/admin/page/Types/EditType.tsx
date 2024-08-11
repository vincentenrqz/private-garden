import React, { useState } from "react";
import { TypesDto } from "../../../../types/types.interface";
import ModalButton from "../../components/ModalButton";
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SubmitButton from "../../components/SubmitButton";
import Toaster from "../../components/Toaster";

type Props = {
  species: TypesDto;
  openEdit: boolean;
  setOpenEdit: any;
  forceUpdate: any;
};

//TODO: Create a edit modal for reference: Species.tsx
const EditType = ({ species, openEdit, setOpenEdit, forceUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<TypesDto>(species);

  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });

  const handleUpdate = () => {};

  return (
    <>
      <ModalButton
        key="update"
        open={openEdit}
        setOpen={setOpenEdit}
        title="Edit Species"
      >
        <form onSubmit={handleUpdate}>
          <Stack direction="column" spacing={1}>
            <Typography gutterBottom variant="subtitle1" component="div">
              Species Name
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                value={species?.name || ""}
              />
              <TextField
                id="sub_name"
                label="Sub name"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Stack>
            <Typography gutterBottom variant="subtitle1" component="div">
              Type
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                name="type_id"
                select
                label="Type"
                helperText="Please select a type"
                size="small"
                fullWidth
              >
                <MenuItem key="1" value={1}>
                  Tree
                </MenuItem>
                <MenuItem key="2" value={2}>
                  Palm
                </MenuItem>
                <MenuItem key="3" value={3}>
                  Shrubs
                </MenuItem>
              </TextField>
            </Stack>
            <Typography gutterBottom variant="subtitle1" component="div">
              Information{" "}
              <Typography
                variant="caption"
                component="span"
                sx={{ color: "gray" }}
              >
                (optional)
              </Typography>
            </Typography>
            <Stack direction="column" spacing={2}>
              <TextField
                id="scientific_name"
                label="Scientific name"
                multiline
                rows={4}
                fullWidth
                size="small"
              />
              <TextField
                id="etymology"
                label="Etymology"
                multiline
                rows={4}
                fullWidth
                size="small"
              />
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                size="small"
              />
            </Stack>
            <Stack direction="column" spacing={2} sx={{ marginY: "5px" }}>
              <Typography gutterBottom variant="subtitle1" component="div">
                Attachments
              </Typography>
              <Button variant="outlined" fullWidth>
                Attach images
              </Button>
            </Stack>
            <Stack
              direction="row"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: 5,
              }}
              spacing={2}
            >
              <Button variant="outlined" onClick={() => setOpenEdit(false)}>
                Cancel
              </Button>
              <SubmitButton isLoading={isLoading} onClick={handleUpdate}>
                Submit
              </SubmitButton>
            </Stack>
          </Stack>
        </form>
      </ModalButton>
      {message.open && (
        <Toaster
          open={message.open}
          status={message.status}
          message={message.message}
        />
      )}
    </>
  );
};

export default EditType;
