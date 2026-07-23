export type ProductType = "sweets" | "farsan";

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  unit: string;
  type: ProductType;
  category_id: string | null;
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category | null;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit: string;
  note: string | null;
  status: "new" | "contacted" | "fulfilled" | "cancelled";
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  status: "unread" | "read" | "replied";
  created_at: string;
}
