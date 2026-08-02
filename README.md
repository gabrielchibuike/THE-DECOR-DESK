# Home Decor Affiliate Blog & CMS

Antigravity Decor is a modern, high-converting content site and custom CMS built for home decor affiliate marketing and Pinterest traffic conversion.

Features a full database-backed architecture using **Next.js App Router**, **Supabase (Postgres, Auth, Storage)**, **ConvertKit Email Integration**, and a custom block-based **Admin Panel**.

---

## Key Features

- **Database-Backed CMS**: All posts, products, categories, email leads, and affiliate click events live in Supabase Postgres with full Row-Level Security (RLS).
- **Protected Admin Panel (`/admin`)**: Auth-guarded dashboard using Supabase Auth (email/password).
- **Block-Based Post Editor**: Add, reorder, and remove paragraphs, headings (H2/H3), images (with Supabase Storage upload), and inline product blocks.
- **Affiliate Link Redirect System (`/go/[id]`)**: Auto-logs per-product and per-retailer click events to a `clicks` table before 302 redirecting visitors.
- **Email Lead Capture (ConvertKit + Supabase Mirror)**: Captures subscribers via ConvertKit API while mirroring leads locally to the `subscribers` table (with CSV export in `/admin/subscribers`).
- **Analytics Dashboard**: Tracks affiliate link clicks over time, new subscriber growth, top clicked products, and top posts.
- **SEO & Core Web Vitals**: Auto-generated dynamic `sitemap.xml`, `rss.xml`, `robots.txt`, JSON-LD `BlogPosting` and `BreadcrumbList` schemas, Open Graph meta tags, and Google Analytics 4 integration.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components, Server Actions)
- **Styling**: Tailwind CSS v4 (Custom Playfair Display + Inter design tokens)
- **Database & Auth**: Supabase Postgres + `@supabase/ssr`
- **File Storage**: Supabase Storage (`post-images` bucket)
- **Analytics**: Recharts + Google Analytics 4
- **Email**: ConvertKit API v3

---

## Environment Variables Setup

Create a `.env.local` file (or set these in your Vercel project settings):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Public Site URL
NEXT_PUBLIC_SITE_URL=https://antigravitydecor.com

# ConvertKit Email Integration (Optional)
EMAIL_PROVIDER=convertkit
CONVERTKIT_API_KEY=your-convertkit-api-key
CONVERTKIT_FORM_ID=your-convertkit-form-id

# Google Analytics 4 (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## Database Setup (Supabase)

1. Open your **Supabase Dashboard** → **SQL Editor**.
2. Run the migration script in `supabase/migrations/001_initial_schema.sql` to create tables (`posts`, `categories`, `products`, `subscribers`, `clicks`) and set up Row Level Security.
3. Run `supabase/seed.sql` to populate initial categories, products, and 5 complete blog posts.
4. **Create your Admin User**:
   - Go to **Supabase Dashboard** → **Authentication** → **Users**.
   - Click **Add User** → **Create User**.
   - Enter your email and admin password.
5. **Create Storage Bucket for Images**:
   - Go to **Storage** → **New Bucket**.
   - Name: `post-images`
   - Toggle **Public bucket** to ON.

---

## Admin Panel Guide

Access the admin dashboard at **`/admin`** (unauthenticated requests automatically redirect to `/admin/login`).

### Admin Routes:
- `/admin` — High-level dashboard with total counts and recent activity
- `/admin/posts` — View all draft and published posts
- `/admin/posts/new` — Block-based editor for creating new posts
- `/admin/posts/[id]` — Edit existing post
- `/admin/products` — View and manage affiliate products + click counts
- `/admin/products/new` — Add a new affiliate product with multiple retailer links (Amazon, Wayfair, Target, etc.)
- `/admin/categories` — Manage site categories/boards
- `/admin/subscribers` — View email subscribers and click **Export CSV**
- `/admin/analytics` — Interactive charts for 30-day clicks, subscriber growth, and top products

---

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open `http://localhost:3000` to view the site, or `http://localhost:3000/admin` to log into the admin panel.

---

## Deployment to Vercel

1. Push your code to GitHub.
2. Import project into Vercel.
3. Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, etc.) under Project Settings.
4. Click **Deploy**.
