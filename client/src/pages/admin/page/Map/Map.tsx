import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import L from "leaflet";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CustomMap from "../../../components/CustomMap";
import Loader from "../../../components/Loader";
import { useFetchData } from "../../../../utils/queries";
import { useScreenSize } from "../../../../context/MediaContext";
import {
  filterDataByType,
  filterSpeciesDataByType,
  handleFlexStyles,
  handleMapSize,
} from "../../../../utils";
import ButtonFilters from "./ButtonFilters";
import FilterSpeciesContent from "./FilterSpeciesContent";
import { mapService } from "../../../../services/maps.service";
import ConfirmationSave from "./ConfirmationSave";
import AdminMapModal from "./AdminDrawer";
import Toaster from "../../../components/Toaster";
import { SpeciesDto } from "../../../../types/species.interface";
interface MarkerType {
  position: L.LatLngExpression;
  data: SpeciesDto;
}

const Map = () => {
  const { speciesData, typesData } = useFetchData();

  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(speciesData);
  const [selectedIconMarker, setSelectedIconMarker] = useState(null);
  const [buttonFilters, setButtonFilters] = useState(null); //Todo: Pass this in custom map to have a conditional logic
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

  const screenSize = useScreenSize();
  const mapSize = handleMapSize(screenSize);
  const flexStyle = handleFlexStyles(screenSize);

  const navigate = useNavigate();
  const { fetchMaps } = useFetchData();

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
    if (!selectedIconMarker) return;

    const iconUrl = `${import.meta.env.VITE_API_URL}uploads/${
      selectedIconMarker?.icon?.iconUrl
    }`;

    const newMarker: MarkerType = {
      data: {
        ...selectedIconMarker,
        icon: L.icon({
          iconUrl,
          iconSize: [40, 40],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
          tooltipAnchor: [10, -15],
          shadowUrl: selectedIconMarker?.icon?.shadowUrl,
          shadowSize: [41, 41],
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
        const result: any = await mapService.createMaps(marker);
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
        <Container maxWidth="xl" sx={{ marginTop: 10 }}>
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
              justifyContent="space-between"
              paddingBottom={10}
            >
              <Stack direction="column">
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

              {/* RIGHT CONTENT FILTERED BY: */}
              <FilterSpeciesContent
                handleFilterSpecies={handleFilterSpecies}
                typesData={typesData}
                filteredData={filteredData}
                selectedIconMarker={selectedIconMarker}
                selectedMarkerData={selectedMarkerData}
              />
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
