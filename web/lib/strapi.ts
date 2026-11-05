const STRAPI_URL =
  process.env.STRAPI_URL || "http://localhost:1337";

export function mediaUrl(url?: string | null) {
  if (!url) return null;

  if (url.startsWith("http")) return url;

  return `${STRAPI_URL}${url}`;
}

export async function strapi(path: string) {
  const token = process.env.STRAPI_API_TOKEN;

  const response = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Strapi request failed: ${response.status}`
    );
  }

  return response.json();
}