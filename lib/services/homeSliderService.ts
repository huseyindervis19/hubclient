import api from "../axios";
import { ApiResponse } from "../types/ApiResponse";
import { HomeSlider } from "../types/HomeSlider";

export const fetchHomeSlider = async (lang: string): Promise<ApiResponse<HomeSlider[]>> => {
  const response = await api.get<ApiResponse<HomeSlider[]>>(`/home-slider?lang=${lang}`);
  return response.data;
};
