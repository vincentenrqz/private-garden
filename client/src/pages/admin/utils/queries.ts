import { useState, useEffect } from "react";

const fetchAllData = async () => {
  try {
    const typesResponse = await fetch("http://localhost:3000/types");
    if (!typesResponse.ok) {
      console.error("Error fetching types data");
      throw new Error("Internal Server Error");
    }
    const types = await typesResponse.json();

    const speciesResponse = await fetch("http://localhost:3000/species");
    if (!speciesResponse.ok) {
      console.error("Error fetching species data");
      throw new Error("Internal Server Error");
    }
    const species = await speciesResponse.json();

    return { types, species };
  } catch (error) {
    console.error("Error in fetchAllData:", error);
    return { types: [], species: [] };
  }
};

export const useFetchData = () => {
  const [typesData, setTypesData] = useState<any[]>([]);
  const [speciesData, setSpeciesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { types, species } = await fetchAllData();
        setTypesData(types?.types);
        setSpeciesData(species);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { typesData, speciesData, loading, error };
};
