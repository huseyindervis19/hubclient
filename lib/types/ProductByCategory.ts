export interface ProductByCategory {
  id: number;
  categoryId: number | null;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  translated: {
    name: string;
    slug?: string;
    description?: string;
  };
  mainImage?: string;
  _links: {
    self: string;
    edit: string;
    delete: string;
  };
}
