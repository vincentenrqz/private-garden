import { apiService } from "./api.service";

const BASE_URL = "types";
const UPLOAD_URL = "types/resize-icon";

export interface TypesServiceDto {
  name: string;
  sub_name?: string;
  type_id?: string;
  scientific_name?: string;
  etymology?: string;
  description?: string;
}

export const typesService = {
  async createType(types: TypesServiceDto) {
    return apiService.post(BASE_URL, { types });
  },

  async resizeImage(formData: any) {
    return apiService.post(UPLOAD_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
