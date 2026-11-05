"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { mediaUrl } from "@/lib/site";
import type { Media } from "@/types/product";

export default function ProductGallery({
  images,
  title,
}: {
  images: Media[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-[4/3] rounded-card border border-border bg-surface" />;
  }

  const current = images[active];
  const src = mediaUrl(current.url)!;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-surface">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={current.alternativeText ?? title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                i === active
                  ? "border-accent ring-2 ring-accent/40"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={mediaUrl(img.url)!}
                alt={img.alternativeText ?? `${title} ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}