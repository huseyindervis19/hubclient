import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProductsByLanguage,
  fetchLandingProducts,
  fetchProductById,
} from "../services/productService";
import { Product } from "../types/Product";
import { ApiResponse } from "../types/ApiResponse";

export const useAllProducts = (lang: string) => {
  return useQuery<ApiResponse<Product[]>>({
    queryKey: ["all-products", lang],
    queryFn: () => fetchAllProductsByLanguage(lang),
  });
};

export const useLandingProducts = (lang: string) => {
  return useQuery<ApiResponse<Product[]>>({
    queryKey: ["landing-products", lang],
    queryFn: () => fetchLandingProducts(lang),
  });
};

export const useProductById = (id: number, lang: string) => {
  return useQuery<ApiResponse<Product>>({
    queryKey: ["product", id, lang],
    queryFn: () => fetchProductById(id, lang),
    enabled: !!id && !!lang, 
  });
};
