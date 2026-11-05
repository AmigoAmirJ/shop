import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductCard from "@/components/ui/ProductCard";
import RichContent from "@/components/ui/RichContent";
import Reveal from "@/components/effects/Reveal";
import {
  categoryName,
  formatPrice,
  getAllSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { mediaUrl } from "@/lib/site";
import type { Media } from "@/types/product";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const image = mediaUrl(product.cover?.url);
  return {
    title: product.title,
    description: product.shortDescription ?? undefined,
    openGraph: { title: product.title, images: image ? [image] : [] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(slug);

  const images: Media[] = [];
  const seen = new Set<string>();
  for (const img of [product.cover, ...(product.gallery ?? [])]) {
    if (img?.url && !seen.has(img.url)) {
      seen.add(img.url);
      images.push(img);
    }
  }

  const category = categoryName(product.category);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-28">
      <Link href="/products" className="text-sm text-muted transition-colors hover:text-text">
        ← All products
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ProductGallery images={images} title={product.title} />
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          {category && (
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs text-muted">
              {category}
            </span>
          )}

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-3 text-2xl text-text">{formatPrice(product.price)}</p>

          <button
            type="button"
            className="mt-8 w-full rounded-full bg-white px-7 py-3.5 font-medium text-black transition hover:scale-[1.02]"
          >
            Buy now
          </button>

          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>✓ Instant digital delivery</li>
            <li>✓ Secure checkout</li>
            <li>✓ Download from your account</li>
          </ul>

          <div className="mt-10 border-t border-border pt-8">
            <RichContent content={product.description} />
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <h2 className="mb-8 text-2xl font-semibold">You might also like</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}