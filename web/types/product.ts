export type ProductImage = {
  id: number;
  url: string;
  alternativeText?: string | null;
};

export type Product = {
  id: number;
  documentId: string;
  title: string;
  description?: string | null;
  category?: string | null;
  price: number | string;
  image?: ProductImage[] | null;
  featured?: boolean;
  badge?: string | null;
};