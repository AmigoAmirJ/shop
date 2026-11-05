import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const STRAPI = process.env.STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

async function getUser() {
  const token = (await cookies()).get("shop_session")?.value;
  if (!token) return null;

  const response = await fetch(`${STRAPI}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) return null;
  return response.json();
}

async function strapiRequest(path: string, options: RequestInit = {}) {
  return fetch(`${STRAPI}/api${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });
}

export async function GET() {
  try {
    if (!API_TOKEN) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = new URLSearchParams();
    params.set("populate", "product");
    params.set("filters[user][id][$eq]", String(user.id));
    params.set("pagination[pageSize]", "100");

    const response = await strapiRequest(`/cart-items?${params.toString()}`);
    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "Could not load cart" }, { status: response.status });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("CART API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!API_TOKEN) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();
    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const params = new URLSearchParams();
    params.set("filters[user][id][$eq]", String(user.id));
    params.set("filters[product][documentId][$eq]", productId);

    const existingResponse = await strapiRequest(`/cart-items?${params.toString()}`);
    const existingResult = await existingResponse.json();

    if (!existingResponse.ok) {
      console.error("STRAPI CART ERROR:", existingResponse.status, existingResult);
      return NextResponse.json({
        error: "Could not check cart",
        details: existingResult,
        status: existingResponse.status
      }, { status: 500 });
    }

    const existing = existingResult.data?.[0];

    if (existing) {
      const updateResponse = await strapiRequest(`/cart-items/${existing.documentId}`, {
        method: "PUT",
        body: JSON.stringify({
          data: { quantity: existing.quantity + 1 },
        }),
      });

      if (!updateResponse.ok) {
        return NextResponse.json({ error: "Could not update cart" }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: "Quantity updated" });
    }

    const createResponse = await strapiRequest("/cart-items", {
      method: "POST",
      body: JSON.stringify({
        data: {
          quantity: 1,
          product: { connect: [productId] },
          user: user.id,
        },
      }),
    });

    if (!createResponse.ok) {
      const error = await createResponse.json();
      console.error("Cart create error:", error);
      return NextResponse.json({ error: "Could not add product" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Product added" });
  } catch (error) {
    console.error("CART API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}





export async function PATCH(request: NextRequest) {
  try {
    if (!API_TOKEN) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cartItemId, quantity } = await request.json();

    if (
      typeof cartItemId !== "string" ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const params = new URLSearchParams();
    params.set("filters[documentId][$eq]", cartItemId);
    params.set("filters[user][id][$eq]", String(user.id));

    const findResponse = await strapiRequest(`/cart-items?${params.toString()}`);
    const findResult = await findResponse.json();

    if (!findResponse.ok) {
      return NextResponse.json({ error: "Could not find cart item" }, { status: 500 });
    }

    const item = findResult.data?.[0];

    if (!item) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    const updateResponse = await strapiRequest(`/cart-items/${item.documentId}`, {
      method: "PUT",
      body: JSON.stringify({ data: { quantity } }),
    });

    if (!updateResponse.ok) {
      return NextResponse.json({ error: "Could not update quantity" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CART PATCH ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    if (!API_TOKEN) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cartItemId } = await request.json();

    if (typeof cartItemId !== "string") {
      return NextResponse.json({ error: "Invalid cart item" }, { status: 400 });
    }

    const params = new URLSearchParams();
    params.set("filters[documentId][$eq]", cartItemId);
    params.set("filters[user][id][$eq]", String(user.id));

    const findResponse = await strapiRequest(`/cart-items?${params.toString()}`);
    const findResult = await findResponse.json();

    if (!findResponse.ok) {
      return NextResponse.json({ error: "Could not find cart item" }, { status: 500 });
    }

    const item = findResult.data?.[0];

    if (!item) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    const deleteResponse = await strapiRequest(`/cart-items/${item.documentId}`, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      return NextResponse.json({ error: "Could not remove product" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CART DELETE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
