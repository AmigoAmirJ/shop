"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { mediaUrl } from "@/lib/site";
import type { Product } from "@/types/product";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${x}px ${y}px, rgba(139,92,246,0.18), transparent 70%)`;

  const src = mediaUrl(product.cover?.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      className="group relative overflow-hidden rounded-card border border-border bg-surface"
    >
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <Link href={`/products/${product.slug}`} className="relative block">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
          {src && (
            <Image
              src={src}
              alt={product.cover?.alternativeText ?? product.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-5">
          <h3 className="font-medium">{product.title}</h3>
          <p className="mt-1 text-muted">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}