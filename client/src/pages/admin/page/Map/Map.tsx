import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import L from "leaflet";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CustomMap from "../../../components/CustomMap";
import Loader from "../../../components/Loader";
import { useFetchData } from "../../../../utils/queries";
import { filterDataByType, filterSpeciesDataByType } from "../../../../utils";
import ButtonFilters from "../../../components/ButtonFilters";
import FilterSpeciesContent from "./FilterSpeciesContent";
import { mapService } from "../../../../services/maps.service";
import ConfirmationSave from "./ConfirmationSave";
import AdminMapModal from "./AdminDrawer";
import Toaster from "../../../components/Toaster";
import { SpeciesDto } from "../../../../types/species.interface";

interface MarkerType {
  species: SpeciesDto;
  position: L.LatLngExpression;
}

const Map = () => {
  const { speciesData, typesData, fetchMaps } = useFetchData();

  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(speciesData);
  const [selectedIconMarker, setSelectedIconMarker] = useState(null);
  const [buttonFilters, setButtonFilters] = useState(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });
  const [selectedFilter] = useState("None");
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  //Selected Data for the admin modal
  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedFilter === "None") {
      setFilteredData(speciesData);
    } else {
      const filtered = speciesData.filter(
        (specie) => specie.type === selectedFilter
      );
      setFilteredData(filtered);
    }
  }, [selectedFilter, speciesData]);

  const handleClickOpenDialog = () => {
    setOpenSaveDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenSaveDialog(false);
  };

  //TODO: MAKE A TOGGLE FUNCTION FOR THE MULTIPLE MARKER / SINGLE MARKER
  const handleFilterSpecies = (e: any) => {
    const selectedTypeName = e.target.value;

    if (selectedTypeName === "None") {
      setFilteredData(speciesData);
    } else {
      const filteredType = typesData.find(
        (type) => type.name === selectedTypeName
      );

      if (filteredType) {
        const filteredSpeciesData = filterDataByType({
          items: speciesData,
          id: filteredType?._id,
        });

        setFilteredData(filteredSpeciesData);
      } else {
        console.warn("No matching type found:", selectedTypeName);
        setFilteredData([]);
      }
    }
  };

  const selectedMarkerData = (data) => {
    if (selectedIconMarker?._id === data._id) {
      setSelectedIconMarker(null); // Deselect if the same item is clicked again
    } else {
      const filteredSpeciesData = filterSpeciesDataByType({
        data: typesData,
        type: data?.type,
      });
      const iconData = typesData?.find((type) => type?._id === data?.type);

      const newData = {
        ...data,
        icon: iconData?.icons[0],
        type: filteredSpeciesData[0]?.name,
      };

      setSelectedIconMarker(newData);
    }
  };

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (!selectedIconMarker || !selectedIconMarker?.icon) return;

    const newMarker: MarkerType = {
      species: {
        ...selectedIconMarker,
        icon: L.icon({
          ...selectedIconMarker?.icon,
        }),
      },
      position: e.latlng,
    };

    setMarkers([...markers, newMarker]);
  };

  const saveMapHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      for (const marker of markers) {
        const mapObj = {
          species: marker?.species?._id,
          position: marker?.position,
        };

        const result: any = await mapService.createMaps(mapObj);
        const { message, status } = result.data;
        setMessage({
          message,
          status,
          open: true,
        });
      }
      fetchMaps();
      setMarkers([]);
    } catch (error) {
      const { message, status } = error?.response?.data;
      setMessage({
        message,
        status,
        open: true,
      });
      console.error("Error creating species:", error);
    } finally {
      setIsLoading(false);
      setOpenSaveDialog(false);
    }
  };

  const openDrawerHandler = (data: any) => {
    setSelectedData(data);
    setOpenModal(true);
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            marginTop: 5,
            marginBottom: 10,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Stack direction="column" spacing={4}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <IconButton
                  aria-label="back"
                  onClick={() => navigate("/admin")}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ marginRight: 4 }}
                >
                  Maps
                </Typography>
              </Stack>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpenDialog}
                disabled={markers?.length <= 0}
              >
                Save
              </Button>
            </Box>
            {/* <Stack direction="row">
              <FormGroup sx={{ paddingLeft: 4 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={
                    <Typography variant="body2">
                      Enable multiple marker
                    </Typography>
                  }
                />
              </FormGroup>
            </Stack> */}
            <Divider />
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              paddingBottom={10}
              sx={{
                gap: { xs: 2, sm: 4 },
              }}
            >
              <Stack direction={{ xs: "row", sm: "column" }}>
                {typesData?.map((type) => (
                  <ButtonFilters
                    key={type?._id}
                    typeData={type}
                    speciesData={speciesData}
                    buttonFilters={buttonFilters}
                    setButtonFilters={setButtonFilters}
                  />
                ))}
              </Stack>

              {/* MAP */}
              <CustomMap
                buttonFilters={buttonFilters}
                handleMapClick={handleMapClick}
                markers={markers}
                openDrawerHandler={openDrawerHandler}
                forAdmin={true}
              />

              <Box>
                {/* RIGHT CONTENT FILTERED BY: */}
                <FilterSpeciesContent
                  handleFilterSpecies={handleFilterSpecies}
                  typesData={typesData}
                  filteredData={filteredData}
                  selectedIconMarker={selectedIconMarker}
                  selectedMarkerData={selectedMarkerData}
                />
              </Box>
            </Box>
          </Stack>
        </Container>
      )}
      {openModal && (
        <AdminMapModal
          data={selectedData}
          setMessage={setMessage}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
      {message.open && (
        <Toaster
          open={message.open}
          status={message.status}
          message={message.message}
        />
      )}
      {openSaveDialog && (
        <ConfirmationSave
          data={markers}
          open={open}
          handleClose={handleCloseDialog}
          handleSave={saveMapHandler}
        />
      )}
    </>
  );
};

export default Map;
