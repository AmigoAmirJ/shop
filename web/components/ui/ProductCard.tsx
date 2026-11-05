import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = mediaUrl(product.image?.[0]?.url);

  const price = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(Number(product.price));

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-2 hover:border-accent/50">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.image?.[0]?.alternativeText || product.title}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            No Image
          </div>
        )}

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}

        {product.featured && (
          <span className="absolute bottom-4 right-4 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white">
            FEATURED
          </span>
        )}
      </div>

      <div className="p-6">
        {product.category && (
          <p className="text-xs uppercase tracking-widest text-accent">
            {product.category}
          </p>
        )}

        <h2 className="mt-3 text-xl font-semibold">{product.title}</h2>

        {product.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted">
            {product.description}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
          <span className="text-xs text-muted">Price</span>
          <span className="text-xl font-semibold">{price}</span>
        </div>

        <AddToCartButton productId={product.documentId} />
      </div>
    </article>
  );
}
