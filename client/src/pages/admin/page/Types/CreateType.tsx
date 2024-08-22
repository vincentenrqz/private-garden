import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ModalButton from "../../../components/ModalButton";
import { IconDto, TypesDto } from "../../../../types/types.interface";
import { typesService } from "../../../../services/types.service";
import SubmitButton from "../../../components/SubmitButton";
import Toaster from "../../../components/Toaster";

type Props = {
  handleOpen: () => void;
  open: boolean;
  setOpen: any;
  forceUpdate: any;
};

const CreateType = ({ handleOpen, open, setOpen, forceUpdate }: Props) => {
  const [types, setTypes] = useState<TypesDto>({
    name: "",
    icons: [],
  });
  const [customizeIcon, setCustomizeIcon] = useState<IconDto[]>([]);
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTypes((prevTypes) => ({
      ...prevTypes,
      name: e.target.value,
    }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const img = new Image();
          img.onload = () => {
            const { width, height } = img;

            const newIcon: IconDto = {
              iconUrl: URL.createObjectURL(file),
              iconSize: [width, height],
              iconAnchor: [],
              popupAnchor: [],
              tooltipAnchor: [],
              shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
              shadowSize: [],
            };

            setCustomizeIcon((prevIcons) => [...prevIcons, newIcon]);

            setTypes((prevTypes) => ({
              ...prevTypes,
              icons: [...customizeIcon, newIcon],
            }));
          };
          img.src = reader.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleChangeIconWidth = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newWidth = parseInt(e.target.value, 10);
    if (isNaN(newWidth)) {
      return;
    }

    setCustomizeIcon((prevIcons) => {
      const updatedIcons = [...prevIcons]; // Copy the array
      updatedIcons[index].iconSize[0] = newWidth; // Update width
      return updatedIcons;
    });
  };

  const handleChangeIconHeight = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newHeight = parseInt(e.target.value, 10);
    if (isNaN(newHeight)) {
      return;
    }

    setCustomizeIcon((prevIcons) => {
      const updatedIcons = [...prevIcons];
      updatedIcons[index].iconSize[1] = newHeight;
      return updatedIcons;
    });
  };

  const handleResize = async ({ iconUrl, width, height }: any) => {
    try {
      const response = await fetch(iconUrl);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: blob.type });

      const formData = new FormData();
      formData.append("file", file, "image.png");
      formData.append("width", width.toString());
      formData.append("height", height.toString());

      const res: any = await typesService.resizeImage(formData);
      if (res.data) {
        const resizedIconIndex = customizeIcon.findIndex(
          (icon) => icon.iconUrl === iconUrl
        );

        if (resizedIconIndex !== -1) {
          const { resizedImage } = res.data;

          setCustomizeIcon((prevIcons) =>
            prevIcons.map((icon, index) =>
              index === resizedIconIndex
                ? {
                    ...icon,
                    iconUrl: `${
                      import.meta.env.VITE_API_URL
                    }uploads/${resizedImage}`,
                    iconSize: [width, height],
                    iconAnchor: [],
                    popupAnchor: [],
                    tooltipAnchor: [],
                    shadowUrl:
                      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                    shadowSize: [],
                  }
                : icon
            )
          );

          setTypes((prevTypes) => ({
            ...prevTypes,
            icons: customizeIcon,
          }));
        }
      }
    } catch (error) {
      console.error("Error resizing the image", error);
    }
  };

  const processIcons = async (icons: any[]) => {
    return Promise.all(
      icons.map(async (icon, index) => {
        const fileName = `icon-${index}.png`;

        const res = await fetch(icon.iconUrl);
        const blob = await res.blob();
        const file = new File([blob], fileName, { type: blob.type });

        const formData = new FormData();
        formData.append("image", file);

        const response = await typesService.uploadImage(formData);

        if (response) {
          const { data } = response;

          return {
            ...icon,
            iconUrl: data.filename,
          };
        }
      })
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, icons } = types;
    const processingIcons = await processIcons(icons);

    const updatedTypes = {
      name,
      icons: processingIcons,
    };
    try {
      const result: any = await typesService.createType(updatedTypes);
      const { message, status } = result.data;

      setOpen(false);
      setMessage({
        message,
        status,
        open: true,
      });

      setTypes({
        name: "",
        icons: [],
      });
      setCustomizeIcon([]);

      forceUpdate();
    } catch (error) {
      const { message, status } = error?.response?.data;
      setMessage({
        message,
        status,
        open: true,
      });
      console.error("Error creating types data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Create Type
      </Button>
      <ModalButton
        key="create-type"
        open={open}
        setOpen={setOpen}
        title="Create Type"
      >
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={1} mb={2}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Type
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
              value={types.name || ""}
              onChange={handleNameChange}
            />
          </Stack>
          <Stack direction="column" spacing={1} my={2}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Icons
            </Typography>
          </Stack>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none", width: "100%" }}
            ref={fileInputRef}
            onChange={handleIconChange}
          />
          <Stack direction="column" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => triggerFileInput()}
              fullWidth
            >
              Attach Icon
            </Button>
            {customizeIcon.length > 0 &&
              customizeIcon.map((item, index) => {
                const { iconUrl, iconSize } = item;
                return (
                  <Card
                    key={index}
                    sx={{
                      maxWidth: "100%",
                      display: "column",
                      marginBottom: 2,
                    }}
                  >
                    <Box display="flex">
                      <CardContent sx={{ width: 300 }}>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          mb={2}
                        >
                          Customize icon dimension
                        </Typography>
                        <Stack spacing={2} direction="row">
                          <Stack
                            direction="column"
                            spacing={2}
                            alignItems="center"
                          >
                            <TextField
                              id="width"
                              label="Width"
                              variant="outlined"
                              size="small"
                              value={iconSize[0] || ""} //Current width
                              onChange={(e: any) =>
                                handleChangeIconWidth(index, e)
                              }
                              fullWidth
                            />
                            <TextField
                              id="height"
                              label="Height"
                              variant="outlined"
                              size="small"
                              value={iconSize[1] || ""} //Current height
                              onChange={(e: any) =>
                                handleChangeIconHeight(index, e)
                              }
                              fullWidth
                            />
                          </Stack>
                        </Stack>
                        <Stack
                          spacing={2}
                          direction="row"
                          justifyContent="flex-end"
                          mt={2}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              handleResize({
                                iconUrl,
                                width: iconSize[0],
                                height: iconSize[1],
                              })
                            }
                          >
                            Resize
                          </Button>
                        </Stack>
                      </CardContent>

                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 200,
                          height: 200,
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          image={`${iconUrl}`}
                          sx={{
                            width: "100%",
                            height: "auto",
                            objectFit: "none",
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Remove
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                );
              })}
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

export default CreateType;
