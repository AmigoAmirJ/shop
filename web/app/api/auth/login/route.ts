import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();
    if (!identifier || !password) {
      return NextResponse.json({ message: "Please enter your email and password." }, { status: 400 });
    }

    const response = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok || !data.jwt) {
      return NextResponse.json({ message: data.error?.message ?? "The email or password is incorrect." }, { status: response.status || 401 });
    }

    const result = NextResponse.json({ user: { id: data.user.id, username: data.user.username, email: data.user.email } });
    result.cookies.set("shop_session", data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return result;
  } catch {
    return NextResponse.json({ message: "Could not connect to the account service. Please try again." }, { status: 500 });
  }
}
