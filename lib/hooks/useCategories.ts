import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories, fetchLandingCategories } from "../services/CategoriesService";
import { Category } from "../types/Category";
import { ApiResponse } from "../types/ApiResponse";
import { fetchProductsByCategory } from "../services/CategoriesService";
import { ProductByCategory } from "../types/ProductByCategory"

export const useAllCategories = (language: string) => {
  return useQuery<ApiResponse<Category[]>>({
    queryKey: ["categories", language],
    queryFn: () => fetchAllCategories(language),
  });
};

export const useLandingCategories = (language: string) => {
  return useQuery<ApiResponse<Category[]>>({
    queryKey: ["landing-categories", language],
    queryFn: () => fetchLandingCategories(language),
  });
};

export const useProductsByCategory = (categoryId: number, lang: string) => {
  return useQuery<ProductByCategory[]>({
    queryKey: ["products-by-category", categoryId, lang],
    queryFn: async () => {
      const response = await fetchProductsByCategory(categoryId, lang);
      return response.data; 
    },
  });
};