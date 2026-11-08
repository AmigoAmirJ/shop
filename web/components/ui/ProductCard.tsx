"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { mediaUrl } from "@/lib/site";
import { categoryName, formatPrice } from "@/lib/products";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spotlight = useMotionTemplate`
    radial-gradient(300px circle at ${x}px ${y}px, rgba(139,92,246,0.18), transparent 70%)
  `;

  const image = product.cover ?? product.image?.[0] ?? null;
  const imageUrl = mediaUrl(image?.url);
  const category = categoryName(product.category);
  const description =
    product.shortDescription ??
    (typeof product.description === "string" ? product.description : null);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity group-hover:opacity-100"
      />

      <Link href={`/products/${product.slug || product.documentId}`} className="relative block">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alternativeText || product.title}
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
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

        <div className="p-5">
          {category && (
            <p className="text-xs uppercase tracking-widest text-accent">
              {category}
            </p>
          )}

          <h2 className="mt-2 text-xl font-semibold">{product.title}</h2>

          {description && (
            <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted">
              {description}
            </p>
          )}

          <p className="mt-5 border-t border-border pt-4 text-xl font-semibold">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <AddToCartButton productId={product.documentId} />
      </div>
    </motion.article>
  );
}
