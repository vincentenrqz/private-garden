import { apiService } from "./api.service";
import { TypesDto } from "../types/types.interface";

const BASE_URL = "types";
const UPLOAD_URL = "types/resize-icon";
const UPLOAD_IMAGE = "types/upload-icons";

export const typesService = {
  async createType(data: TypesDto) {
    console.log("data", data);
    return apiService.post(BASE_URL, { data });
  },

  async getType() {
    return apiService.get(BASE_URL);
  },

  async updateType(id: any, data: TypesDto) {
    return apiService.put(`${BASE_URL}/${id}`, { data });
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

  async uploadImage(file: any) {
    return apiService.post(UPLOAD_IMAGE, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
