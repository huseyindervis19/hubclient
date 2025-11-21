import api from "../axios";
import { Product } from "../types/Product";
import { ApiResponse } from "../types/ApiResponse";

// ----------------- Fetch all products by language -----------------
export const fetchAllProductsByLanguage = async (
  lang: string
): Promise<ApiResponse<Product[]>> => {
  const response = await api.get<ApiResponse<Product[]>>(`/products?lang=${lang}`);
  return response.data;
};

// ----------------- Fetch products for landing page -----------------
export const fetchLandingProducts = async (
  lang: string
): Promise<ApiResponse<Product[]>> => {
  const response = await api.get<ApiResponse<Product[]>>(`/products/landing?lang=${lang}`);
  return response.data;
};

// ----------------- Fetch single product by id + language -----------------
export const fetchProductById = async (
  id: number,
  lang: string
): Promise<ApiResponse<Product>> => {
  const response = await api.get<ApiResponse<Product>>(`/products/${id}?lang=${lang}`);
  return response.data;
};