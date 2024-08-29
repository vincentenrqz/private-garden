import { apiService } from "./api.service";
import { TypesDto } from "../types/types.interface";

const BASE_URL = "types";
const UPLOAD_URL = "types/resize-icon";
const UPLOAD_IMAGE = "types/upload-icons";
const S3_URL = "types/file_upload";

export const typesService = {
  async fileUpload(formData: any) {
    return apiService.post(S3_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async createType(data: any) {
    return apiService.post(BASE_URL, data);
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
