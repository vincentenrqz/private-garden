import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
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
import { typesService } from "../../../../services/types.service";

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
    cultural_maintenance: "",
    fun_fact: "",
    description: "",
    attachments: "",
    video: "",
    info: "",
    family_name: "",
    eco_class: "",
    type_of_plant_growth: "",
    native_distribution: "",
    native_habitat: "",
    preferred_climate_zone: "",
    growth_form: "",
    trunk: "",
    foliage: "",
    flower: "",
    fruit: "",
    plant_rootzone_tolerance: "",
    light_preference: "",
    water_preference: "",
    pollination: "",
    propagation: "",
    ethnobotanical_uses: "",
    landscape_uses: "",
    thematic_landscaping: "",
  });
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });
  const [types, setTypes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isLoadingAttach, setIsLoadingAttach] = useState(false);
  const [showAdditionalFields, setShowAddtionalFields] = useState(false);
  const [error, setError] = useState(false);

  const { typesData } = useFetchData();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

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

    if (!value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSelectType = (data: any) => {
    setSpecies((prev) => ({
      ...prev,
      icon: data,
    }));
    setSelectedIcon(data?.iconUrl);
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
          setSpecies((prev) => ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!species.type) {
        setError(true);
        return;
      }

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
        cultural_maintenance: "",
        fun_fact: "",
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

  const toggleAddtionalField = () => {
    setShowAddtionalFields(!showAdditionalFields);
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
            <Stack direction="column" spacing={2}>
              <TextField
                name="type"
                select
                label="Type"
                helperText="Please select a type"
                size="small"
                fullWidth
                value={species.type || ""}
                onChange={handleTypes}
                error={error}
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
                value={species.video}
                onChange={handleChange}
              />
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
                id="cultural_maintenance"
                label="Cultural Maintenance"
                multiline
                rows={4}
                fullWidth
                size="small"
                value={species.cultural_maintenance || ""}
                onChange={handleChange}
              />
              <TextField
                id="fun_fact"
                label="Fun fact"
                multiline
                rows={4}
                fullWidth
                size="small"
                value={species.fun_fact || ""}
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

              {species.attachments !== "" && (
                <img
                  src={species.attachments}
                  alt=""
                  height={100}
                  width={100}
                />
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
                  value={species.family_name}
                  onChange={handleChange}
                />
                <TextField
                  id="eco_class"
                  label="Eco class"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.eco_class}
                  onChange={handleChange}
                />
                <TextField
                  id="type_of_plant_growth"
                  label="Typo of plant growth"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.type_of_plant_growth}
                  onChange={handleChange}
                />
                <TextField
                  id="native_distribution"
                  label="Native distribution"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.native_distribution}
                  onChange={handleChange}
                />
                <TextField
                  id="native_habitat"
                  label="Native habitat"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.native_habitat}
                  onChange={handleChange}
                />
                <TextField
                  id="preferred_climate_zone"
                  label="Preferred climate zone"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.preferred_climate_zone}
                  onChange={handleChange}
                />
                <TextField
                  id="growth_form"
                  label="Growth form"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.growth_form}
                  onChange={handleChange}
                />
                <TextField
                  id="trunk"
                  label="Trunk"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.trunk}
                  onChange={handleChange}
                />
                <TextField
                  id="foliage"
                  label="Foliage"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.foliage}
                  onChange={handleChange}
                />
                <TextField
                  id="flower"
                  label="Flower"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.flower}
                  onChange={handleChange}
                />
                <TextField
                  id="fruit"
                  label="Fruit"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.fruit}
                  onChange={handleChange}
                />
                <TextField
                  id="plant_rootzone_tolerance"
                  label="Plant rootzone tolerance"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.plant_rootzone_tolerance}
                  onChange={handleChange}
                />
                <TextField
                  id="light_preference"
                  label="Light preference"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.light_preference}
                  onChange={handleChange}
                />
                <TextField
                  id="water_preference"
                  label="Water preference"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.water_preference}
                  onChange={handleChange}
                />
                <TextField
                  id="pollination"
                  label="Pollination"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.pollination}
                  onChange={handleChange}
                />
                <TextField
                  id="propagation"
                  label="Propagation"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.propagation}
                  onChange={handleChange}
                />
                <TextField
                  id="ethnobotanical_uses"
                  label="Ethnobotanical uses"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.ethnobotanical_uses}
                  onChange={handleChange}
                />
                <TextField
                  id="landscape_uses"
                  label="Landscape uses"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.landscape_uses}
                  onChange={handleChange}
                />
                <TextField
                  id="thematic_landscaping"
                  label="Thematic landscaping"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={species.thematic_landscaping}
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
