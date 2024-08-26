import { useState, useEffect } from "react";
import { speciesService } from "../services/species.service";
import { typesService } from "../services/types.service";
import { TypesDto } from "../types/types.interface";
import { SpeciesDto } from "../types/species.interface";
import { mapService } from "../services/maps.service";

export const useFetchData = () => {
  const [typesData, setTypesData] = useState<TypesDto[]>([]);
  const [speciesData, setSpeciesData] = useState<SpeciesDto[]>([]);
  const [mapsData, setMapsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });

  //Fetch species data
  const fetchSpecies = async () => {
    try {
      const response = await speciesService.getSpecies();

      if (response && response.data) {
        const { data } = response;
        setSpeciesData(data);
      } else {
        setSpeciesData([]);
      }
    } catch (error: any) {
      if (error) {
        const { message, status } = error?.response?.data;
        setMessage({
          message,
          status,
          open: true,
        });
        console.error("Error fetching species", error);
      }
    }
  };

  //fetch types data
  const fetchTypes = async () => {
    try {
      const response = await typesService.getType();

      if (response && response.data) {
        const { data } = response;
        setTypesData(data?.types);
      } else {
        setTypesData([]);
      }
    } catch (error: any) {
      if (error) {
        const { message, status } = error?.response?.data;
        setMessage({
          message,
          status,
          open: true,
        });
        console.error("Error fetching types", error);
      }
    }
  };

  //fetch maps data
  const fetchMaps = async () => {
    try {
      const response = await mapService.getMaps();
      if (response && response.data) {
        const { data } = response;
        setMapsData(data);
      } else {
        setMapsData([]);
      }
    } catch (error) {
      if (error) {
        const { message, status } = error?.response?.data;
        setMessage({ message, status, open: true });
        console.log("Error fetching maps", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchSpecies(), fetchTypes(), fetchMaps()]);
      } catch (error: any) {
        setMessage({
          message: "An error occurred while fetching data.",
          status: false,
          open: true,
        });

        console.error("Error fetching species", error);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    typesData,
    speciesData,
    mapsData,
    loading,
    message,
    fetchSpecies,
    fetchTypes,
    fetchMaps,
  };
};
