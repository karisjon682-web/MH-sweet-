import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { SHOP } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("slug, updated_at");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SHOP.siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SHOP.siteUrl}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SHOP.siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap =
    products?.map((p) => ({
      url: `${SHOP.siteUrl}/products/${p.slug}`,
      lastModified: p.updated_at,
      changeFrequency: "weekly",
      priority: 0.7,
    })) ?? [];

  return [...staticRoutes, ...productRoutes];
}
