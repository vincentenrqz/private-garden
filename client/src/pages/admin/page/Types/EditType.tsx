import React, { useRef, useState } from "react";
import { IconDto, TypesDto } from "../../../../types/types.interface";
import ModalButton from "../../components/ModalButton";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SubmitButton from "../../components/SubmitButton";
import Toaster from "../../components/Toaster";
import { typesService } from "../../../../services/types.service";

type Props = {
  data: TypesDto;
  openEdit: boolean;
  setOpenEdit: any;
  forceUpdate: any;
};

//TODO: Create a edit modal for reference: Species.tsx
const EditType = ({ data, openEdit, setOpenEdit, forceUpdate }: Props) => {
  const [newTypes, setNewTypes] = useState<TypesDto>(data);
  const [newCustomizeIcon, setNewCustomizeIcon] = useState<IconDto[]>(
    data?.icons
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });

  const fileInputRef = useRef(null);

  const handleNewNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTypes((prevTypes) => ({
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

            setNewCustomizeIcon((prevIcons) => [...prevIcons, newIcon]);

            //set the newly attached icon
            setNewTypes((prevTypes) => ({
              ...prevTypes,
              icons: [...newCustomizeIcon, newIcon],
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

    setNewCustomizeIcon((prevIcons) => {
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

    setNewCustomizeIcon((prevIcons) => {
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
        const resizedIconIndex = newCustomizeIcon.findIndex(
          (icon) => icon.iconUrl === iconUrl
        );

        if (resizedIconIndex !== -1) {
          const { resizedImage } = res.data;

          setNewCustomizeIcon((prevIcons) =>
            prevIcons.map((icon, index) =>
              index === resizedIconIndex
                ? {
                    ...icon,
                    iconUrl: `http://localhost:3000${resizedImage}`,
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

          //set newly resized icon
          setNewTypes((prevTypes) => ({
            ...prevTypes,
            icons: newCustomizeIcon,
          }));
        }
      }
    } catch (error) {
      console.error("Error resizing the image", error);
    }
  };

  //TODO: SHOULD AUTOMATICALLY FETCH THE UPDATED DATA IN ADDING ATTACH ICON
  //TODO: CUSTOM ICONS IS REMOVED AFTER REFRESHING PAGE.
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (!newTypes?.name || !newTypes?.icons) {
      console.error("Please provide a name and icons for the types data");
      setIsLoading(false);
      return;
    }

    try {
      const result = await typesService.updateType(newTypes?._id, newTypes);
      const { message, status, name, icons } = result.data;

      setOpenEdit(false);
      setMessage({
        message,
        status,
        open: true,
      });

      setNewTypes({
        name,
        icons,
      });
      setNewCustomizeIcon(icons);
      forceUpdate();
    } catch (error) {
      const { message, status } = error?.response?.data;
      setOpenEdit(false);
      setMessage({ message, status, open: true });
    }
  };

  return (
    <>
      <ModalButton
        key="update"
        open={openEdit}
        setOpen={setOpenEdit}
        title="Edit Types"
      >
        <form onSubmit={handleUpdate}>
          <Stack direction="column" spacing={1}>
            <Typography gutterBottom variant="subtitle1" component="div">
              Type
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                size="small"
                defaultValue={newTypes?.name}
                onChange={(e) => handleNewNameChange(e)}
                fullWidth
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
              {newCustomizeIcon.length > 0 &&
                newCustomizeIcon.map((item, index) => {
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
                                value={iconSize[0]}
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
                                value={iconSize[1]}
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
                        </CardContent>
                      </Box>
                    </Card>
                  );
                })}
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
