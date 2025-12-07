import { useQuery } from "@tanstack/react-query";
import { AboutUs } from "../types/AboutUs";
import { ApiResponse } from "../types/ApiResponse";
import { fetchAboutUs } from "../services/aboutUsService";

export const useAboutUs = (language: string) => {
  return useQuery<ApiResponse<AboutUs>>({ 
    queryKey: ["aboutUs", language],
    queryFn: () => fetchAboutUs(language),
  });
};
