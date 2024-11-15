import { apiService } from "./api.service";

const BASE_URL = "species";

export interface SpeciesDto {
  name: string;
  sub_name?: string;
  type_id?: string;
  scientific_name?: string;
  etymology?: string;
  description?: string;
  page_index?: number;
}

export const speciesService = {
  async createSpecies(data: SpeciesDto) {
    return apiService.post(BASE_URL, { data });
  },

  async getSpecies() {
    return apiService.get(BASE_URL);
  },

  async deleteSpecies(id: string) {
    return apiService.delete(`${BASE_URL}/${id}`);
  },

  async updateSpecies(id: any, data: SpeciesDto) {
    return apiService.put(`${BASE_URL}/${id}`, { data });
  },

  async getOneSpecies(id: string) {
    return apiService.get(`${BASE_URL}/${id}`);
  },
};
