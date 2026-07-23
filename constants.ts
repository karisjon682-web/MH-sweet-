export const SHOP = {
  name: "M H Sweet",
  tagline: "Quality of Dreams",
  phone: "+91 9925134060",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919925134060",
  about:
    "M H Sweet crafts authentic Indian sweets and crispy farsan made with premium ingredients, traditional recipes and pure love. From festivals to family celebrations, we make every moment sweeter.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mhsweets.vercel.app",
  locations: [
    {
      label: "Shop 1",
      address: "Opp. Jain Derasar, Main Bazar, Nakhtrana",
      mapEmbed:
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_SHOP1 ??
        "https://www.google.com/maps?q=Jain+Derasar+Main+Bazar+Nakhtrana&output=embed",
    },
    {
      label: "Shop 2",
      address: "Nilkanth Plaza, Shop No. 8, Nakhtrana-Lakhpat Highway, Nakhtrana",
      mapEmbed:
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_SHOP2 ??
        "https://www.google.com/maps?q=Nilkanth+Plaza+Nakhtrana+Lakhpat+Highway&output=embed",
    },
  ],
};

export function waLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SHOP.whatsapp}?text=${encoded}`;
}
