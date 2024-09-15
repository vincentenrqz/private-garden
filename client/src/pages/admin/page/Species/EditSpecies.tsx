import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ModalButton from "../../../components/ModalButton";
import SubmitButton from "../../../components/SubmitButton";
import Toaster from "../../../components/Toaster";
import { SpeciesDto } from "../../../../types/species.interface";
import { speciesService } from "../../../../services/species.service";
import { useFetchData } from "../../../../utils/queries";
import { typesService } from "../../../../services/types.service";

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
  const [selectedType, setSelectedType] = useState(null);
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });
  const [icons, setIcons] = useState(null);
  const [isLoadingAttach, setIsLoadingAttach] = useState(false);
  const [showAdditionalFields, setShowAddtionalFields] = useState(true);
  const { typesData } = useFetchData();

  useEffect(() => {
    if (typesData && typesData.length > 0) {
      const filterIcons = typesData.find(
        (item) => item._id === species?.type
      )?.icons;

      setIcons(filterIcons);
    }
  }, [typesData]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

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
      [name]: value,
    }));

    const filterIcons = typesData.filter((item) => item._id === value)[0]
      ?.icons;
    setIcons(filterIcons);
  };

  const handleSelectIcon = (data: any) => {
    setForm((prev) => ({
      ...prev,
      icon: data,
    }));
    setSelectedType(data?.iconUrl);
  };

  const handleAttachments = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setIsLoadingAttach(true);
      const formData = new FormData();
      formData.append("imageType", file);

      try {
        const response = await typesService.fileUpload(formData);
        if (response.status === 200) {
          const { Location } = response.data.data;
          setForm((prev) => ({
            ...prev,
            attachments: Location,
          }));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoadingAttach(false);
      }
    }
  };

  const toggleAddtionalField = () => {
    setShowAddtionalFields(!showAdditionalFields);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

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
                name="type"
                select
                label="Type"
                helperText="Please select a type"
                size="small"
                fullWidth
                defaultValue={species?.type || ""}
                onChange={handleTypes}
              >
                {typesData.map((item, index) => {
                  const { _id, name } = item;

                  return (
                    <MenuItem key={index} value={_id}>
                      {name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 2,
                }}
              >
                {icons &&
                  icons.map((item: any, index: number) => {
                    const { iconUrl, iconSize } = item;
                    const findSelectedType = selectedType === iconUrl;
                    const defaultIconValue = species?.icon?.iconUrl === iconUrl;
                    const icon = selectedType
                      ? findSelectedType
                      : defaultIconValue;
                    return (
                      <CardContent
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%", // Full width of grid cell
                          height: 100,
                          overflow: "hidden",
                          position: "relative",
                          transition: "all 0.3s ease",
                          backgroundColor: icon ? "#e0e0e0" : "transparent",
                          borderRadius: icon ? "8px" : "0",
                          boxShadow: icon
                            ? "0 4px 8px rgba(0,0,0,0.2)"
                            : "none",
                          transform: icon ? "scale(1.05)" : "none",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            transform: "scale(1.05)",
                          },
                        }}
                        onClick={() => handleSelectIcon(item)}
                      >
                        <CardMedia
                          component="img"
                          alt=""
                          src={iconUrl}
                          sx={{
                            width: iconSize[0],
                            height: iconSize[1],
                            objectFit: "cover",
                          }}
                        />
                      </CardContent>
                    );
                  })}
              </Box>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Additional Info
              </Typography>
              <TextField
                id="info"
                label="Addtional info"
                multiline
                rows={4}
                fullWidth
                size="small"
                defaultValue={species?.info || ""}
                onChange={handleChange}
              />
            </Stack>
            <Stack direction="column" spacing={2}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Video URL
              </Typography>
              <TextField
                id="video"
                label="Video URL"
                variant="outlined"
                size="small"
                fullWidth
                defaultValue={species?.video || ""}
                onChange={handleChange}
              />
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
                id="cultural_maintenance"
                label="Cultural Maintenance"
                multiline
                rows={4}
                fullWidth
                size="small"
                defaultValue={species?.cultural_maintenance || ""}
                onChange={handleChange}
              />
              <TextField
                id="fun_fact"
                label="Fun fact"
                multiline
                rows={4}
                fullWidth
                size="small"
                defaultValue={species?.fun_fact || ""}
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
              <Button
                variant="outlined"
                fullWidth
                onClick={handleButtonClick}
                disabled={isLoadingAttach}
                startIcon={
                  isLoadingAttach ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {isLoadingAttach ? "Please wait..." : "Attach Image"}
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleAttachments}
              />

              {form.attachments !== "" && (
                <img src={form?.attachments} alt="" height={100} width={100} />
              )}
            </Stack>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showAdditionalFields}
                    onChange={toggleAddtionalField}
                  />
                }
                label="Enable addtional fields"
              />
            </FormGroup>
            {showAdditionalFields && (
              <Stack direction="column" spacing={2}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Additional Info
                </Typography>
                <TextField
                  id="family_name"
                  label="Family name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.family_name || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="eco_class"
                  label="Eco class"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.eco_class || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="type_of_plant_growth"
                  label="Typo of plant growth"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.type_of_plant_growth || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="native_distribution"
                  label="Native distribution"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.native_distribution || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="native_habitat"
                  label="Native habitat"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.native_habitat || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="preferred_climate_zone"
                  label="Preferred climate zone"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.preferred_climate_zone || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="growth_form"
                  label="Growth form"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.growth_form || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="trunk"
                  label="Trunk"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.trunk || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="foliage"
                  label="Foliage"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.foliage || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="flower"
                  label="Flower"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.flower || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="fruit"
                  label="Fruit"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.fruit || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="plant_rootzone_tolerance"
                  label="Plant rootzone tolerance"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.plant_rootzone_tolerance || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="light_preference"
                  label="Light preference"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.light_preference || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="water_preference"
                  label="Water preference"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.water_preference || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="pollination"
                  label="Pollination"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.pollination || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="propagation"
                  label="Propagation"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.propagation || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="ethnobotanical_uses"
                  label="Ethnobotanical uses"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.ethnobotanical_uses || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="landscape_uses"
                  label="Landscape uses"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.landscape_uses || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="thematic_landscaping"
                  label="Thematic landscaping"
                  variant="outlined"
                  size="small"
                  fullWidth
                  defaultValue={species?.thematic_landscaping || ""}
                  onChange={handleChange}
                />
              </Stack>
            )}
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
