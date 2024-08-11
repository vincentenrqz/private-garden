import { useState, useEffect } from "react";
import { speciesService } from "../../../services/species.service";
import { typesService } from "../../../services/types.service";
import { TypesDto } from "../../../types/types.interface";
import { SpeciesDto } from "../../../types/species.interface";

export const useFetchData = () => {
  const [typesData, setTypesData] = useState<TypesDto[]>([]);
  const [speciesData, setSpeciesData] = useState<SpeciesDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState({
    message: "",
    status: false,
    open: false,
  });

  //Fetch species data
  const fetchSpecies = async () => {
    const response = await speciesService.getSpecies();
    const { data } = response;
    setSpeciesData(data);
  };

  //fetch types data
  const fetchTypes = async () => {
    const response = await typesService.getType();
    const { data } = response;
    setTypesData(data?.types);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchSpecies();
        fetchTypes();
      } catch (error: any) {
        const { message, status } = error?.response?.data;
        setMessage({
          message,
          status,
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

  return { typesData, speciesData, loading, message, fetchSpecies, fetchTypes };
};
