export type Product = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  price: number;
  description?: string;
  featured?: boolean;
  cover?: { url: string; alternativeText?: string } | null;
};