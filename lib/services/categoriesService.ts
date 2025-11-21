import api from "../axios";
import { Category } from "../types/Category";
import { ApiResponse } from "../types/ApiResponse";
import { ProductByCategory } from "../types/ProductByCategory";

export const fetchAllCategories = async (lang: string): Promise<ApiResponse<Category[]>> => {
  const response = await api.get<ApiResponse<Category[]>>(`/categories?lang=${lang}`);
  return response.data;
};

export const fetchLandingCategories = async (lang: string): Promise<ApiResponse<Category[]>> => {
  const response = await api.get<ApiResponse<Category[]>>(`/categories/landing?lang=${lang}`);
  return response.data;
};

export const fetchProductsByCategory = async (categoryId: number, lang: string) => {
  const response = await api.get<{ data: ProductByCategory[] }>(
    `/categories/${categoryId}/products?lang=${lang}`
  );
  return response.data;
};