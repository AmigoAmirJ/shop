const URL = process.env.STRAPI_URL!;
const TOKEN = process.env.STRAPI_API_TOKEN;

export async function strapi(path: string, init: RequestInit = {}) {
  const res = await fetch(`${URL}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
      ...init.headers,
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Strapi ${res.status} on ${path}`);
  return res.json();
}