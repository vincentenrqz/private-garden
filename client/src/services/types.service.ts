import { apiService } from "./api.service";
import { TypesDto } from "../types/types.interface";

const BASE_URL = "types";
const UPLOAD_URL = "types/resize-icon";

export const typesService = {
  async createType(types: TypesDto) {
    return apiService.post(BASE_URL, { types });
  },

  async getType() {
    return apiService.get(BASE_URL);
  },

  async deleteType(id: string) {
    return apiService.delete(`${BASE_URL}/${id}`);
  },

  async resizeImage(formData: any) {
    return apiService.post(UPLOAD_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
