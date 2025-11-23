import api from "../axios";
import { ApiResponse } from "../types/ApiResponse";
import { ContactInfo } from "../types/ContactInfo";

export const fetchContactInfo = async (
  lang: string
): Promise<ApiResponse<ContactInfo>> => {
  const response = await api.get<ApiResponse<ContactInfo>>(
    `/contact-info?lang=${lang}`
  );

  return response.data;
};
