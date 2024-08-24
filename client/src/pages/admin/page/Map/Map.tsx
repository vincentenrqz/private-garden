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

const Map = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIconMarker, setSelectedIconMarker] = useState(null);
  const [buttonFilters, setButtonFilters] = useState(null); //Todo: Pass this in custom map to have a conditional logic
  const screenSize = useScreenSize();
  const mapSize = handleMapSize(screenSize);
  const flexStyle = handleFlexStyles(screenSize);

  const { speciesData, typesData } = useFetchData();
  const navigate = useNavigate();

  //TODO: FETCH THE SPECIES DATA. SET THE ICONS STATE TO THE ICONS KEY.
  //TODO: MAKE A TOGGLE FUNCTION FOR THE MULTIPLE MARKER / SINGLE MARKER
  //TODO: MODAL TO POPUP THE DATA OF THE CONTENT - MAKE THIS REUSABLE, MAYBE USE THE FRONTEND MAP MODAL
  console.log("buttonFilters", buttonFilters);
  const handleFilterSpecies = (e: any) => {
    const selectedTypeName = e.target.value;

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

  //Mapped Species Data
  const displaySpecieData =
    filteredData?.length > 0 ? filteredData : speciesData;

  console.log("selectedIconMarker", selectedIconMarker);
  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container maxWidth="xl" sx={{ marginTop: 10 }}>
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <IconButton aria-label="back" onClick={() => navigate("/admin")}>
                <ArrowBackIcon />
              </IconButton>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ marginRight: 4 }}
              >
                Icons
              </Typography>
            </Stack>
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

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ paddingLeft: 3 }}
            >
              Map
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="center" paddingBottom={10}>
              <Stack direction="column">
                {typesData?.map((type) => (
                  <ButtonFilters
                    key={type?._id}
                    typeData={type}
                    speciesData={speciesData}
                    setButtonFilters={setButtonFilters}
                  />
                ))}
              </Stack>
              <CustomMap selectedIcon={selectedIconMarker} forAdmin={true} />
              <Stack direction="column" spacing={1}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ paddingLeft: 3 }}
                >
                  {/* FILTER BY SPECIES BY TYES DATA */}
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Filter by
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Species"
                      // value={age}
                      onChange={handleFilterSpecies}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {typesData?.map((data) => (
                        <MenuItem key={data?._id} value={data?.name}>
                          {data?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* SPECIES LIST */}
                {displaySpecieData?.map((data) => {
                  const isSelected = data._id === selectedIconMarker?._id;
                  console.log("isSelected", isSelected);
                  return (
                    <Stack
                      key={data?._id}
                      direction="column"
                      sx={{ paddingLeft: 3, spacing: 2 }}
                    >
                      <Box
                        key={data?._id}
                        display="flex"
                        alignItems="center"
                        sx={{
                          gap: 2,
                          padding: 0.5,
                          cursor: "pointer",
                          backgroundColor: isSelected
                            ? "#e0e0e0"
                            : "transparent",
                          borderRadius: isSelected ? "8px" : "0",
                          boxShadow: isSelected
                            ? "0 4px 8px rgba(0,0,0,0.2)"
                            : "none",
                          transform: isSelected ? "scale(1.05)" : "none",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                        onClick={() => selectedMarkerData(data)}
                      >
                        <CardMedia
                          component="img"
                          alt={data?.name}
                          src={`${import.meta.env.VITE_API_URL}uploads/${
                            data?.icon?.iconUrl
                          }`}
                          sx={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                          }}
                        />
                        <Typography>{data?.name}</Typography>
                      </Box>
                      <Divider sx={{ mt: 2 }} />
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Map;
