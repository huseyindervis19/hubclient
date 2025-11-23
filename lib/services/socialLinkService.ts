import api from "../axios";
import { ApiResponse } from "../types/ApiResponse";
import { SocialLink } from "../types/SocialLink";

export const fetchAllSocialLinks = async (): Promise<ApiResponse<SocialLink[]>> => {
  const response = await api.get<ApiResponse<SocialLink[]>>('/social-links');
  return response.data;
};
