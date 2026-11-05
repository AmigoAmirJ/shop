export type Media = {
  id?: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

// Strapi "Rich text (Blocks)" returns a tree of these nodes
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
  slug: string;
  price: number;
  shortDescription?: string | null;
  description?: string | RichNode[] | null;
  featured?: boolean;
  cover?: Media | null;
  gallery?: Media[] | null;
  category?: string | { name?: string } | null;
};