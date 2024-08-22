import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardContent,
  CardMedia,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import ModalButton from "../../../components/ModalButton";
import { speciesService } from "../../../../services/species.service";
import { SpeciesDto } from "../../../../types/species.interface";
import Toaster from "../../../components/Toaster";
import SubmitButton from "../../../components/SubmitButton";
import { useFetchData } from "../../../../utils/queries";
import { IconDto } from "../../../../types/types.interface";

type Props = {
  handleOpen: () => void;
  open: boolean;
  setOpen: any;
  forceUpdate: any;
};

const CreateSpecies = ({ handleOpen, open, setOpen, forceUpdate }: Props) => {
  const [species, setSpecies] = useState<SpeciesDto>({
    name: "",
    icon: IconDto,
    type: null,
    scientific_name: "",
    etymology: "",
    description: "",
  });
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });
  const [types, setTypes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const { typesData } = useFetchData();

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
    const { value } = e.target;
    setSpecies((prev) => ({
      ...prev,
      type: value,
    }));
    setTypes(typesData.find((item) => item._id === value)?.icons);
  };

  const handleSelectType = (data: any) => {
    setSpecies((prev) => ({
      ...prev,
      icon: data,
    }));
    setSelectedIcon(data?.iconUrl);
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
        type: "",
        icon: null,
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
        key="create-species"
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
                name="type"
                select
                label="Type"
                helperText="Please select a type"
                size="small"
                fullWidth
                value={species.type || ""}
                onChange={handleTypes}
              >
                {typesData.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={1}>
              {types &&
                types.map((item: any, index: number) => {
                  const { iconUrl, iconSize } = item;
                  const findSelect = selectedIcon === iconUrl;
                  return (
                    <CardContent
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 80,
                        height: 80,
                        overflow: "hidden",
                        position: "relative",
                        transition: "all 0.3s ease",
                        backgroundColor: findSelect ? "#e0e0e0" : "transparent",
                        borderRadius: findSelect ? "8px" : "0",
                        boxShadow: findSelect
                          ? "0 4px 8px rgba(0,0,0,0.2)"
                          : "none",
                        transform: findSelect ? "scale(1.05)" : "none",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={() => handleSelectType(item)}
                    >
                      <CardMedia
                        component="img"
                        alt=""
                        src={`${
                          import.meta.env.VITE_API_URL
                        }uploads/${iconUrl}`}
                        sx={{
                          width: iconSize[0],
                          height: iconSize[1],
                          objectFit: "cover",
                        }}
                      />
                    </CardContent>
                  );
                })}
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
