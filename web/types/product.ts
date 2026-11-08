export type Media = {
  id?: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export type ProductImage = Media;

export type RichNode = {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  level?: number;
  format?: string;
  children?: RichNode[];
};

export type Product = {
  id: number;
  documentId: string;
  title: string;
  slug?: string;
  price: number | string;
  shortDescription?: string | null;
  description?: string | RichNode[] | null;
  featured?: boolean;
  badge?: string | null;
  cover?: Media | null;
  gallery?: Media[] | null;
  image?: ProductImage[] | null;
  category?: string | { name?: string } | null;
};
