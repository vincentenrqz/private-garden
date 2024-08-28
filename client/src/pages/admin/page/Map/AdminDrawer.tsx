import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CardMedia } from "@mui/material";
import { mapService } from "../../../../services/maps.service";
import { useFetchData } from "../../../../utils/queries";
import ConfirmationDelete from "./ConfirmationDelete";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminMapModal({
  data,
  setMessage,
  openModal,
  setOpenModal,
  handleCloseModal,
}: {
  data: any;
  setMessage: any;
  openModal: boolean;
  setOpenModal: any;
  handleCloseModal: () => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const { fetchMaps } = useFetchData();

  const openConfirmationHandler = () => setOpenConfirmation(true);
  const closeConfirmationHandler = () => setOpenConfirmation(false);

  const handleDeleteData = async (data: any) => {
    setLoading(true);
    try {
      const result: any = await mapService.deleteMaps(data?._id);
      const { message, status } = result.data;
      setMessage({
        message,
        status,
        open: true,
      });
      fetchMaps();
    } catch (error) {
      const { message, status } = error?.response?.data;
      setMessage({
        message,
        status,
        open: true,
      });
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
            <strong>Name:</strong> {data?.name || ""}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            <strong>Type:</strong> {data?.type}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Scientific Name:</strong> {data?.scientific_name}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Etymology:</strong> {data?.etymology}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Description:</strong> {data?.description}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Position:</strong> Lat: {data?.position?.lat}, Lang:{" "}
            {data?.position?.lng}
          </Typography>
          <CardMedia
            component="img"
            alt=""
            src={`${data?.icon?.options?.iconUrl}`}
            sx={{
              width: data?.icon?.options?.iconSize[0],
              height: data?.icon?.options?.iconSize[1],
              objectFit: "cover",
              mt: 1,
            }}
          />
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => openConfirmationHandler()}
              sx={{ ml: 1 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      {openConfirmation && (
        <ConfirmationDelete
          data={data}
          open={openConfirmation}
          handleClose={handleCloseModal}
          handleDeleteData={handleDeleteData}
          setOpenConfirmation={setOpenConfirmation}
          closeConfirmationHandler={closeConfirmationHandler}
        />
      )}
    </>
  );
}
