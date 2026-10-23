import ProductCard from "@/components/ui/ProductCard";
import { strapi } from "@/lib/strapi";
import type { Product } from "@/types/product";

export const metadata = { title: "Products" };

export default async function Products() {
  let products: Product[] = [];
  try {
    const res = await strapi("/products?populate=*");
    products = res.data ?? [];
  } catch {}

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-32">
      <h1 className="mb-10 text-3xl font-semibold">Products</h1>
      {products.length === 0 ? (
        <p className="text-muted">No products yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}