import Hero from "@/components/ui/Hero";
import Features from "@/components/ui/Features";
import CTA from "@/components/ui/CTA";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/effects/Reveal";
import { strapi } from "@/lib/strapi";
import type { Product } from "@/types/product";

async function getFeatured(): Promise<Product[]> {
  try {
    const featured = await strapi(
      "/products?filters[featured][$eq]=true&populate=*&pagination[limit]=3"
    );
    if (featured.data?.length) return featured.data;

    const latest = await strapi(
      "/products?populate=*&sort=createdAt:desc&pagination[limit]=3"
    );
    return latest.data ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const products = await getFeatured();

  return (
    <main>
      <Hero />
      <Features />

      {products.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <Reveal>
            <h2 className="mb-10 text-3xl font-semibold">Featured</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <CTA />
    </main>
  );
}