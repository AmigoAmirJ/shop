import { strapi } from "@/lib/strapi";
import type { Product } from "@/types/product";

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await strapi(
      `/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    return res.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedProducts(slug: string): Promise<Product[]> {
  try {
    const res = await strapi(
      `/products?filters[slug][$ne]=${encodeURIComponent(slug)}&populate=*&sort=createdAt:desc&pagination[limit]=3`
    );
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const res = await strapi(`/products?fields[0]=slug&pagination[pageSize]=100`);
    return (res.data ?? []).map((p: { slug: string }) => p.slug);
  } catch {
    return [];
  }
}

export function formatPrice(price: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price));
}

export function categoryName(category: Product["category"]) {
  if (!category) return null;
  return typeof category === "string" ? category : category.name ?? null;
}