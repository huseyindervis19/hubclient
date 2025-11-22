import { useQuery } from "@tanstack/react-query";
import { fetchHomeSlider } from "../services/homeSliderService";
import { HomeSlider } from "../types/HomeSlider";
import { ApiResponse } from "../types/ApiResponse";

export const useHomeSlider = (language: string) => {
  const query = useQuery<ApiResponse<HomeSlider[]>>({
    queryKey: ["homeSlider", language],
    queryFn: () => fetchHomeSlider(language),
  });

  return {
    homeSlider: query.data?.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
};
