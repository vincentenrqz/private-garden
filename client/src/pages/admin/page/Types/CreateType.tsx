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
import ModalButton from "../../components/ModalButton";
import { IconDto, TypesDto } from "../../../../types/types.interface";
import pica from "pica";
import { typesService } from "../../../../services/types.service";

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
  const [iconWidth, setIconWidth] = useState(null);
  const [iconHeight, setIconHeight] = useState(null);

  const fileInputRef = useRef(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const img = new Image();
          img.onload = () => {
            const { width, height } = img;

            setIconWidth(width);
            setIconHeight(height);

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

  const handleChangeIconWidth = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const widthValue = parseInt(e.target.value, 10);
    if (isNaN(widthValue)) {
      return;
    }

    try {
      setIconWidth(widthValue);
    } catch (error) {
      console.error("Failed to fetch and resize image:", error);
    }
  };

  const handleChangeIconHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const heightValue = parseInt(e.target.value, 10);
    if (isNaN(heightValue)) {
      return;
    }

    try {
      setIconHeight(heightValue);
    } catch (error) {
      console.error("Failed to fetch and resize image:", error);
    }
  };

  const handleResize = async (iconUrl: any) => {
    try {
      const response = await fetch(iconUrl);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: blob.type });

      const formData = new FormData();
      formData.append("file", file, "image.png");
      formData.append("width", iconWidth.toString());
      formData.append("height", iconHeight.toString());

      const res: any = await typesService.resizeImage(formData);
      if (res.data) {
        const { resizedImage } = res.data;

        const newIcon: IconDto = {
          iconUrl: `http://localhost:3000${resizedImage}`,
          iconSize: [iconWidth, iconHeight],
          iconAnchor: [],
          popupAnchor: [],
          tooltipAnchor: [],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [],
        };

        setCustomizeIcon((prevIcons) =>
          prevIcons.map((icon) => ({
            ...icon,
            iconUrl: newIcon.iconUrl,
          }))
        );
      }
    } catch (error) {
      console.error("Error resizing the image", error);
    }
  };

  console.log("customizeIcon", customizeIcon);
  const handleSubmit = async () => {};

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
              value={types.name}
              onChange={handleChange}
            />
            {/* <TextField
              id="sub_name"
              label="Sub name"
              variant="outlined"
              size="small"
              fullWidth
              value={types.sub_name || ""}
              onChange={handleChange}
            /> */}
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
              customizeIcon.map((item) => {
                const { iconUrl, iconSize } = item;
                return (
                  <Card
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
                              value={iconWidth}
                              onChange={(e: any) => handleChangeIconWidth(e)}
                              fullWidth
                            />
                            <TextField
                              id="height"
                              label="Height"
                              variant="outlined"
                              size="small"
                              value={iconHeight}
                              onChange={(e: any) => handleChangeIconHeight(e)}
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
                            onClick={() => handleResize(iconUrl)}
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
        </form>
      </ModalButton>
    </>
  );
};

export default CreateType;
