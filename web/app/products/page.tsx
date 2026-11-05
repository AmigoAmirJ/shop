import ProductCard from "@/components/ui/ProductCard";
import { strapi } from "@/lib/strapi";
import type { Product } from "@/types/product";

export const metadata = {
  title: "Products | Digital Store",
  description: "Explore our latest digital products.",
};

export const revalidate = 60;

export default async function ProductsPage() {
  let products: Product[] = [];
  let error = false;

  try {
    const response = await strapi(
      "/products?populate[image]=true&sort=createdAt:desc&pagination[pageSize]=50"
    );

    products = response.data ?? [];
  } catch (err) {
    console.error("Products API Error:", err);
    error = true;
  }

  return (
    <main className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">

        <header className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            Our Collection / 2026
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Featured Products
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
            Discover modern technology, premium devices,
            and carefully selected digital products.
          </p>
        </header>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 p-10 text-center">
            <h2 className="text-xl font-semibold">
              Unable to load products
            </h2>

            <p className="mt-3 text-sm text-muted">
              Please check your Strapi connection.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-12 text-center">
            <h2 className="text-xl font-semibold">
              No products available
            </h2>

            <p className="mt-3 text-sm text-muted">
              Add your first product through the Strapi dashboard.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-7 text-sm text-muted">
              {products.length} products available
            </p>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.documentId}
                  product={product}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}