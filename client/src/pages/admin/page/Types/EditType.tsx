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

type Props = {
  data: TypesDto;
  openEdit: boolean;
  setOpenEdit: any;
  forceUpdate: any;
};

//TODO: Create a edit modal for reference: Species.tsx
const EditType = ({ data, openEdit, setOpenEdit, forceUpdate }: Props) => {
  const [newTypes, setNewTypes] = useState<TypesDto>(data);
  const [newCustomizeIcon, setNewCustomizeIcon] = useState<IconDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });

  const fileInputRef = useRef(null);
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleNewNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTypes((prevTypes) => ({
      ...prevTypes,
      name: e.target.value,
    }));
  };

  //TODO: setNewCustomizedIcon functionality
  //TODO: Resize functionality

  const handleUpdate = (e: any) => {
    e.preventDefault;
  };

  console.log("newTypes", newTypes);

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
              // onChange={handleIconChange}
            />
            <Stack direction="column" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => triggerFileInput()}
                fullWidth
              >
                Attach Icon
              </Button>
              {newTypes?.icons.length > 0 &&
                newTypes?.icons.map((item) => {
                  const { iconUrl, iconSize } = item;
                  return (
                    <Card
                      key={item?._id}
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
                                // onChange={(e: any) => handleChangeIconWidth(e)}
                                fullWidth
                              />
                              <TextField
                                id="height"
                                label="Height"
                                variant="outlined"
                                size="small"
                                value={iconSize[1]}
                                // onChange={(e: any) => handleChangeIconHeight(e)}
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
                              // onClick={() => handleResize(iconUrl)}
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
