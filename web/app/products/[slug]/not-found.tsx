import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold">Product not found</h1>
      <p className="mt-3 text-muted">It may have been removed or the link is wrong.</p>
      <Link
        href="/products"
        className="mt-8 rounded-full bg-white px-7 py-3 font-medium text-black transition hover:scale-105"
      >
        Back to products
      </Link>
    </main>
  );
}