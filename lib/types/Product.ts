export interface ProductTranslated {
  name: string;
  slug?: string;
  description?: string;
}

export interface ProductLinks {
  self: string;
  edit: string;
  delete: string;
}

export interface Product {
  id: number;
  categoryId: number | null;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;

  mainImage?: string;

  images?: string[];

  translated: ProductTranslated;

  _links: ProductLinks;
}
