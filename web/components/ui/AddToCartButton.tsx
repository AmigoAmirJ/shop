"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function addToCart() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (response.status === 401) {
        router.push("/login?next=/cart");
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Something went wrong");
        return;
      }

      setMessage("Added to cart ✓");
      router.refresh();
    } catch {
      setMessage("Connection error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5">
      <button
        onClick={addToCart}
        disabled={loading}
        className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50"
      >
        {loading ? "ADDING..." : "ADD TO CART"}
      </button>
      {message && (
        <p className="mt-2 text-center text-xs text-muted">{message}</p>
      )}
    </div>
  );
}
