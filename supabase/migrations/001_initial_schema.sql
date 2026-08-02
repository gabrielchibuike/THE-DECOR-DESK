-- ============================================================
-- Antigravity Decor — Initial Schema + RLS
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. Categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  created_at timestamptz default now()
);

-- 2. Posts
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category_id uuid references categories(id) on delete set null,
  meta_description text,
  keywords text[],
  hero_image_url text,
  content jsonb not null default '[]',
  status text not null default 'draft',
  featured boolean not null default false,
  published_at timestamptz,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- 3. Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  retailers jsonb not null default '[]',
  click_count int not null default 0,
  created_at timestamptz default now()
);

-- 4. Subscribers
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source_page text,
  created_at timestamptz default now()
);

-- 5. Clicks
create table if not exists clicks (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete set null,
  post_slug text,
  retailer text,
  clicked_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table categories enable row level security;
alter table posts enable row level security;
alter table products enable row level security;
alter table subscribers enable row level security;
alter table clicks enable row level security;

-- Categories: public read, authenticated write
create policy "Public can read categories"
  on categories for select using (true);
create policy "Authenticated can manage categories"
  on categories for all using (auth.role() = 'authenticated');

-- Posts: public can read published only; authenticated manage all
create policy "Public can read published posts"
  on posts for select using (status = 'published');
create policy "Authenticated can manage all posts"
  on posts for all using (auth.role() = 'authenticated');

-- Products: public read, authenticated write
create policy "Public can read products"
  on products for select using (true);
create policy "Authenticated can manage products"
  on products for all using (auth.role() = 'authenticated');

-- Subscribers: no public access
create policy "Authenticated can manage subscribers"
  on subscribers for all using (auth.role() = 'authenticated');

-- Clicks: no public access; service role can insert (for tracking)
create policy "Authenticated can manage clicks"
  on clicks for all using (auth.role() = 'authenticated');

-- Allow anon to insert clicks (for redirect tracking via service key)
-- This is handled via the service role key in API routes, not anon

-- ============================================================
-- Seed: Categories (matches existing categories.ts)
-- ============================================================

insert into categories (name, slug, description, image_url) values
  ('Living Room Ideas', 'living-room-ideas', 'Inspiration, styling guides, and cozy layouts for your main living area.', '/images/categories/living-room.jpg'),
  ('Bathroom Ideas', 'bathroom-ideas', 'Spa-like updates, smart storage solutions, and stylish vanity setups.', '/images/categories/bathroom.jpg'),
  ('Bedroom Ideas', 'bedroom-ideas', 'Cozy layering tips, lighting design, and restful neutral color palettes.', '/images/categories/bedroom.jpg'),
  ('Laundry Room Ideas', 'laundry-room-ideas', 'Smart organization, beautiful shelving, and functional folding stations.', '/images/categories/laundry-room.jpg'),
  ('Apartment Living Room Ideas', 'apartment-living-room-ideas', 'Small-space layouts, double-duty furniture, and renter-friendly styling.', '/images/categories/apartment-living-room.jpg'),
  ('Apartment Bathroom Ideas', 'apartment-bathroom-ideas', 'Renter-friendly vanity upgrades, space-saving organizers, and styling tips.', '/images/categories/apartment-bathroom.jpg')
on conflict (slug) do nothing;

-- ============================================================
-- Seed: Products (matches existing products.ts)
-- ============================================================

insert into products (name, description, image_url, retailers) values
  (
    'Aesthetic Bouclé Accent Chair',
    'A gorgeous, cozy bouclé chair with solid oak legs. Perfect for creating a warm, organic modern reading nook.',
    '/images/products/boucle-chair.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$249.99"},{"retailerName":"Wayfair","affiliateUrl":"https://www.wayfair.com","price":"$279.00"}]'::jsonb
  ),
  (
    'Solid Oak Double Laundry Hamper',
    'Elevate your laundry room with this beautiful double laundry hamper featuring a removable linen liner and soft-close lid.',
    '/images/products/laundry-hamper.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$129.99"},{"retailerName":"Target","affiliateUrl":"https://www.target.com","price":"$119.50"}]'::jsonb
  ),
  (
    'Arched Thin Brass Vanity Mirror',
    'A premium arched mirror with a thin brass frame. Ideal for adding a touch of elegance to any bathroom or entryway.',
    '/images/products/brass-mirror.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$89.50"}]'::jsonb
  ),
  (
    'Pure French Flax Linen Duvet Cover Set',
    'Breathable, pre-washed linen bedding set in a warm sand tone. Becomes softer with every single wash.',
    '/images/products/linen-bedding.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$159.00"},{"retailerName":"Target","affiliateUrl":"https://www.target.com","price":"$149.00"}]'::jsonb
  ),
  (
    'Handmade Textured Ceramic Vases (Set of 3)',
    'A set of three matte textured ceramic vases in graduating sizes. Perfect for styling built-ins, shelves, or console tables.',
    '/images/products/ceramic-vases.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$34.99"}]'::jsonb
  )
on conflict do nothing;
