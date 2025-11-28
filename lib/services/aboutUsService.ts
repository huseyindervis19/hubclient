import api from "../axios";
import { AboutUs } from "../types/AboutUs";
import { ApiResponse } from "../types/ApiResponse";

export const fetchAboutUs = async (lang: string): Promise<ApiResponse<AboutUs>> => {
  const response = await api.get<ApiResponse<AboutUs>>(`/about-us?lang=${lang}`);
  return response.data;
};