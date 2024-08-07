import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, Stack, TextField } from "@mui/material";
import ModalButton from "../../components/ModalButton";
import { speciesService } from "../../../../services/species.service";
import { SpeciesDto } from "../../../../types/species.interface";
import Toaster from "../../components/Toaster";
import SubmitButton from "../../components/SubmitButton";

type Props = {
  handleOpen: () => void;
  open: boolean;
  setOpen: any;
  forceUpdate: any;
};

const CreateSpecies = ({ handleOpen, open, setOpen, forceUpdate }: Props) => {
  const [species, setSpecies] = useState<SpeciesDto>({
    name: "",
    type_id: "",
    scientific_name: "",
    etymology: "",
    description: "",
  });
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setSpecies((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleTypes = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSpecies((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result: any = await speciesService.createSpecies(species);
      const { message, status } = result.data;

      setOpen(false);

      setMessage({
        message,
        status,
        open: true,
      });

      setSpecies({
        name: "",
        type_id: "",
        scientific_name: "",
        etymology: "",
        description: "",
      });

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
      <Button onClick={handleOpen} variant="contained">
        Create Species
      </Button>
      <ModalButton
        key="create"
        open={open}
        setOpen={setOpen}
        title="Create Species"
      >
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={1}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Species Name
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                value={species.name}
                onChange={handleChange}
              />
              <TextField
                id="sub_name"
                label="Sub name"
                variant="outlined"
                size="small"
                fullWidth
                value={species.sub_name || ""}
                onChange={handleChange}
              />
            </Stack>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
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
                value={species.type_id || ""}
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
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
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
                value={species.scientific_name || ""}
                onChange={handleChange}
              />
              <TextField
                id="etymology"
                label="Etymology"
                multiline
                rows={4}
                fullWidth
                size="small"
                value={species.etymology || ""}
                onChange={handleChange}
              />
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                size="small"
                value={species.description || ""}
                onChange={handleChange}
              />
            </Stack>
            <Stack direction="column" spacing={2} sx={{ marginY: "5px" }}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
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
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <SubmitButton isLoading={isLoading} onClick={handleSubmit}>
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

export default CreateSpecies;
