import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import axios, { Axios } from "axios";
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
import { ckb } from "date-fns/locale";

const Map = () => {
  const { speciesData = [], typesData = [] } = useFetchData();

  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(speciesData);
  const [selectedIconMarker, setSelectedIconMarker] = useState(null);
  const [buttonFilters, setButtonFilters] = useState(null); //Todo: Pass this in custom map to have a conditional logic
  const [selectedFilter] = useState("None");

  const screenSize = useScreenSize();
  const mapSize = handleMapSize(screenSize);
  const flexStyle = handleFlexStyles(screenSize);

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

  //TODO: MAKE A TOGGLE FUNCTION FOR THE MULTIPLE MARKER / SINGLE MARKER
  //TODO: MODAL TO POPUP THE DATA OF THE CONTENT - MAKE THIS REUSABLE, MAYBE USE THE FRONTEND MAP MODAL
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
    const filteredSpeciesData = filterSpeciesDataByType({
      data: typesData,
      type: data?.type,
    });

    setSelectedIconMarker({
      description: data?.description,
      etymology: data?.etymology,
      icon: data?.icon,
      name: data?.name,
      scientific_name: data?.scientific_name,
      sub_name: data?.sub_name,
      type: filteredSpeciesData[0]?.name,
      _id: data?._id,
      createdAt: data?.createdAt,
    });
  };

  const saveMapHandler = () => {
    //TODO: TRIGGER SAVING OF MARKER DATA
    console.log("TRIGGER SAVE");
  };
  console.log("filteredData", filteredData);
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
                onClick={saveMapHandler}
              >
                Save
              </Button>
            </Box>
            <Stack direction="row">
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
            </Stack>
            <Divider />
            <Box display="flex" justifyContent="center" paddingBottom={10}>
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
                selectedIcon={selectedIconMarker}
                buttonFilters={buttonFilters}
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
    </>
  );
};

export default Map;
