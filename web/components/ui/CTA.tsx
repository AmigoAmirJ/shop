import Link from "next/link";
import Reveal from "@/components/effects/Reveal";

export default function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 text-center">
      <Reveal>
        <h2 className="text-3xl font-semibold sm:text-5xl">Ready to start?</h2>
        <p className="mt-4 text-muted">A short line that pushes toward the main action.</p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-full bg-white px-7 py-3 font-medium text-black transition hover:scale-105"
        >
          Browse products
        </Link>
      </Reveal>
    </section>
  );
}