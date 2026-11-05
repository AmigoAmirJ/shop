"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: number;
  documentId: string;
  quantity: number;
  product: {
    documentId: string;
    title: string;
    price: number;
  };
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(price);

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  async function loadCart() {
    try {
      setError("");

      const response = await fetch("/api/cart", {
        cache: "no-store",
      });

      if (response.status === 401) {
        window.location.href = "/login?next=/cart";
        return;
      }

      if (!response.ok) {
        throw new Error("Could not load your cart.");
      }

      const data = await response.json();
      setItems(data);
    } catch {
      setError("Something went wrong while loading your cart.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function updateQuantity(item: CartItem, quantity: number) {
    if (quantity < 1) {
      return removeItem(item.documentId);
    }

    setUpdating(item.documentId);

    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItemId: item.documentId,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      await loadCart();
    } catch {
      setError("Could not update product quantity.");
    } finally {
      setUpdating(null);
    }
  }

  async function removeItem(cartItemId: string) {
    setUpdating(cartItemId);

    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId }),
      });

      if (!response.ok) {
        throw new Error("Remove failed");
      }

      await loadCart();
    } catch {
      setError("Could not remove this product.");
    } finally {
      setUpdating(null);
    }
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  if (loading) {
    return (
      <main className="min-h-[75vh] px-6 pt-40 text-center">
        <p className="text-sm text-muted">Loading your cart...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[75vh] max-w-6xl px-6 pb-24 pt-32">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">
          Your shopping bag
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Shopping Cart</h1>
        <p className="mt-3 text-sm text-muted">
          {items.length} {items.length === 1 ? "product" : "products"} in your cart
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <section className="rounded-2xl border border-border bg-surface/40 px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-3 text-sm text-muted">
            Discover something you love.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-105"
          >
            EXPLORE PRODUCTS
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <section className="space-y-4">
            {items.map((item) => (
              <article
                key={item.documentId}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-surface/40 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.product.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {formatPrice(Number(item.product.price))}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <div className="flex items-center gap-4 rounded-full border border-border px-3 py-2">
                    <button
                      disabled={updating === item.documentId}
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                      className="px-1 text-lg transition hover:text-accent disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span className="min-w-4 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      disabled={updating === item.documentId || item.quantity >= 99}
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      className="px-1 text-lg transition hover:text-accent disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    disabled={updating === item.documentId}
                    onClick={() => removeItem(item.documentId)}
                    className="text-xs text-red-400 transition hover:text-red-300 disabled:opacity-40"
                  >
                    REMOVE
                  </button>
                </div>

                <p className="font-semibold sm:min-w-28 sm:text-right">
                  {formatPrice(Number(item.product.price) * item.quantity)}
                </p>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-2xl border border-border bg-surface/50 p-7">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="mt-7 flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="mt-5 flex justify-between border-t border-border pt-5">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-semibold">
                {formatPrice(total)}
              </span>
            </div>

            <button
              disabled
              className="mt-8 w-full rounded-full bg-white px-5 py-4 text-sm font-semibold text-black opacity-50"
            >
              CHECKOUT — COMING SOON
            </button>

            <Link
              href="/products"
              className="mt-5 block text-center text-xs text-muted transition hover:text-white"
            >
              CONTINUE SHOPPING
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
