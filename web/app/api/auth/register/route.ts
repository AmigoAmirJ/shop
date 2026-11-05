import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    if (!username?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ message: "Please complete all fields." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ message: "Your password must be at least 8 characters." }, { status: 400 });
    }

    const response = await fetch(`${process.env.STRAPI_URL}/api/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim(), email: email.trim(), password }),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok || !data.jwt) {
      return NextResponse.json({ message: data.error?.message ?? "We couldn't create your account." }, { status: response.status || 400 });
    }

    const result = NextResponse.json({ user: { id: data.user.id, username: data.user.username, email: data.user.email } }, { status: 201 });
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
