# M H Sweet — "Quality of Dreams"

A production-ready, full-stack website for **M H Sweet**, Nakhtrana — built with Next.js 15 (App Router), TypeScript, Tailwind CSS and Supabase.

## ✨ Features

- Responsive, mobile-first storefront with light/dark mode
- Home, Products (Sweets & Farsan), Product Detail, Contact pages
- Live search + category/type filtering
- Quick-order form that saves to the database **and** opens WhatsApp with a pre-filled order message
- Floating WhatsApp button site-wide
- Google Maps embeds for both shop locations
- Contact form saved to Supabase
- Full admin dashboard: secure login, product CRUD with image upload, category manager, order inbox, message inbox
- SEO: metadata, Open Graph image, sitemap.xml, robots.txt
- Row Level Security on every table — public can read products/categories and submit orders/messages; only authenticated admins can write

## 🧱 Tech Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Supabase (Postgres, Auth, Storage) · Vercel

## 📁 Folder Structure

```
mh-sweets/
├─ middleware.ts                  # Protects /admin routes, refreshes Supabase session
├─ supabase/schema.sql            # Full DB schema + RLS policies + seed data (run once)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx               # Root layout, fonts, SEO metadata
│  │  ├─ page.tsx                 # Home page
│  │  ├─ globals.css              # Design tokens & Tailwind layers
│  │  ├─ sitemap.ts / robots.ts   # SEO
│  │  ├─ icon.tsx / opengraph-image.tsx
│  │  ├─ products/
│  │  │  ├─ page.tsx              # Menu with search & filters
│  │  │  └─ [slug]/page.tsx       # Product detail + quick order
│  │  ├─ contact/page.tsx         # Maps + contact form
│  │  └─ admin/
│  │     ├─ login/page.tsx
│  │     └─ (protected)/
│  │        ├─ layout.tsx         # Sidebar shell
│  │        ├─ dashboard/page.tsx
│  │        ├─ products/ (list, new, [id]/edit)
│  │        ├─ categories/page.tsx
│  │        ├─ orders/page.tsx
│  │        └─ messages/page.tsx
│  ├─ components/
│  │  ├─ layout/ (Navbar, Footer, ThemeToggle, ThemeProvider)
│  │  ├─ products/ (ProductCard, ProductGrid, SearchFilter, ProductForm, QuickOrderForm)
│  │  ├─ admin/ (AdminSidebar, StatsCard, DeleteButton, StatusSelect, CategoryManager)
│  │  ├─ WhatsAppButton.tsx / GoogleMap.tsx / ContactForm.tsx
│  └─ lib/
│     ├─ supabase/ (client.ts, server.ts, middleware.ts)
│     ├─ types.ts / constants.ts / utils.ts
```

> **Why no `/api` routes?** All admin writes go straight through the Supabase JS client from Server/Client Components, protected by Postgres Row Level Security. This is the recommended Supabase + Next.js pattern — fewer moving parts, same security guarantees as a hand-rolled API layer.

## 🚀 Setup

### 1. Create a Supabase project
Go to [supabase.com](https://supabase.com) → **New Project**.

### 2. Run the database schema
Open **SQL Editor** in your Supabase dashboard, paste the entire contents of `supabase/schema.sql`, and run it. This creates all tables, RLS policies, the `product-images` storage bucket, and seeds it with the full current menu (70+ items across 8 categories).

### 3. Create your admin login
In Supabase: **Authentication → Users → Add user** — create yourself an email + password. This is the account you'll use to sign in at `/admin/login`. (Any authenticated user is treated as an admin — this is a single-owner shop, so no extra roles table is needed.)

### 4. Configure environment variables
```bash
cp .env.example .env.local
```
Fill in from **Project Settings → API**:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919925134060
```
The two `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_*` variables already default to working embeds for both Nakhtrana shop addresses — override them with your own [Google Maps embed links](https://www.google.com/maps) any time (Share → Embed a map → copy the `src` URL).

### 5. Install & run
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`. Sign in to the admin at `http://localhost:3000/admin/login`.

## ☁️ Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add the same environment variables from `.env.local` in **Project Settings → Environment Variables** (set `NEXT_PUBLIC_SITE_URL` to your production domain).
4. Deploy. Vercel auto-detects Next.js — no extra config needed.
5. Back in Supabase → **Authentication → URL Configuration**, add your Vercel domain to the allowed Redirect URLs / Site URL.

## 🖼️ Managing Products & Images

- **Add product**: Admin → Products → Add Product → upload an image (stored in the public `product-images` Supabase Storage bucket), set price/unit/category, save.
- **Edit/Delete**: from the Products table.
- **Categories**: Admin → Categories — add new ones (e.g. "Diwali Specials") anytime; they instantly appear as filters on the public menu.
- **Orders & Messages**: every quick-order and contact form submission lands in Admin → Orders / Messages with a status you can update (new → contacted → fulfilled).

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| Maroon | `#7A1E2B` | Primary brand color, headers |
| Marigold | `#E8A33D` | Accent, CTAs, festive highlights |
| Ivory | `#FBF3E7` | Light background |
| Leaf | `#3D6B4A` | Farsan/WhatsApp accents |
| Display font | Rozha One | Headings |
| Body font | Inter | UI text |

## 📌 Notes

- Prices are stored in ₹ per unit (Kg/Pkt/etc.) exactly as provided in your current price list.
- All 8 categories and the full sweets + farsan menu are pre-seeded — no manual data entry needed to launch.
- The quick-order form does **not** process payments — it captures the order request and hands off to WhatsApp for confirmation, matching how the shop currently takes orders.
