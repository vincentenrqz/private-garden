import { apiService } from "./api.service";

const BASE_URL = "maps";

//TODO: PASS IN A TYPES FOR SPECIFIC FOR MAPS DATA
export const mapService = {
  async createMaps(data: any) {
    return apiService.post(BASE_URL, data);
  },

  async getMaps() {
    return apiService.get(BASE_URL);
  },

  async getOneMap(id: any) {
    return apiService.get(`${BASE_URL}/${id}`);
  },

  async updateMaps(id: any, data: any) {
    return apiService.put(`${BASE_URL}/${id}`, { data });
  },

  async deleteMaps(id: any) {
    return apiService.delete(`${BASE_URL}/${id}`);
  },
};
