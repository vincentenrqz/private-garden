import React, { useState } from "react";
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import ModalButton from "../../components/ModalButton";
import SubmitButton from "../../components/SubmitButton";
import Toaster from "../../components/Toaster";
import { SpeciesDto } from "../../../../types/species.interface";
import { speciesService } from "../../../../services/species.service";

type Props = {
  species: SpeciesDto;
  openEdit: boolean;
  setOpenEdit: any;
  forceUpdate: any;
};

const EditSpecies = ({
  species,
  openEdit,
  setOpenEdit,
  forceUpdate,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<SpeciesDto>(species);

  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleTypes = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result: any = await speciesService.updateSpecies(
        species?._id,
        form
      );

      const { message, status } = result.data;

      setOpenEdit(false);

      setMessage({
        message,
        status,
        open: true,
      });

      setForm(species);

      forceUpdate();
    } catch (error: any) {
      const { message, status } = error?.response?.data;
      setMessage({
        message,
        status,
        open: true,
      });
      console.error("Error creating species:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                defaultValue={species?.name || ""}
                onChange={handleChange}
              />
              <TextField
                id="sub_name"
                label="Sub name"
                variant="outlined"
                size="small"
                fullWidth
                defaultValue={species?.sub_name || ""}
                onChange={handleChange}
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
                defaultValue={species?.type_id || ""}
                onChange={handleTypes}
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
                defaultValue={species?.scientific_name || ""}
                onChange={handleChange}
              />
              <TextField
                id="etymology"
                label="Etymology"
                multiline
                rows={4}
                fullWidth
                size="small"
                defaultValue={species?.etymology || ""}
                onChange={handleChange}
              />
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                size="small"
                defaultValue={species?.description || ""}
                onChange={handleChange}
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

export default EditSpecies;
