import { strapi } from "@/lib/strapi";

export default async function Home() {
  const { data } = await strapi("/products?populate=*");
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}