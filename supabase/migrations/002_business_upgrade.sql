-- ============================================================
-- Antigravity Decor — Business Upgrade Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Update Categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'room';

-- 2. Update Products
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_slug text;

-- 3. Update Posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS post_type text NOT NULL DEFAULT 'editorial';

-- 4. Seed New Categories (Rooms)
INSERT INTO categories (name, slug, description, image_url, type) VALUES
  ('Kitchen Ideas', 'kitchen-ideas', 'Elevate your cooking space with warm wood tones, beautiful hardware, and functional styling.', '/images/categories/kitchen.jpg', 'room'),
  ('Apartment & Small Spaces', 'apartment-and-small-spaces', 'Maximize your square footage with clever layouts and renter-friendly decor.', '/images/categories/apartment-small-spaces.jpg', 'room')
ON CONFLICT (slug) DO UPDATE SET type = 'room';

-- 5. Seed New Categories (Styles)
INSERT INTO categories (name, slug, description, image_url, type) VALUES
  ('French Country', 'french-country', 'Rustic elegance with soft linens, vintage woods, and pastoral charm.', '/images/categories/french-country.jpg', 'style'),
  ('Warm Luxury', 'warm-luxury', 'Elevated neutrals, rich textures, and sophisticated contemporary lines.', '/images/categories/warm-luxury.jpg', 'style'),
  ('Japandi', 'japandi', 'The perfect blend of Scandinavian functionality and Japanese minimalism.', '/images/categories/japandi.jpg', 'style'),
  ('Boho', 'boho', 'Eclectic, textured, and globally-inspired organic design.', '/images/categories/boho.jpg', 'style'),
  ('Grandmillennial', 'grandmillennial', 'A fresh take on traditional design with chintz, scallops, and nostalgia.', '/images/categories/grandmillennial.jpg', 'style'),
  ('Vintage', 'vintage', 'Curated antiques, storied patinas, and timeless character.', '/images/categories/vintage.jpg', 'style')
ON CONFLICT (slug) DO UPDATE SET type = 'style';

-- 6. Update Existing Products with a category_slug
UPDATE products SET category_slug = 'living-room-finds' WHERE name ILIKE '%chair%' OR name ILIKE '%vase%';
UPDATE products SET category_slug = 'laundry-room-finds' WHERE name ILIKE '%hamper%';
UPDATE products SET category_slug = 'bathroom-finds' WHERE name ILIKE '%mirror%';
UPDATE products SET category_slug = 'bedroom-finds' WHERE name ILIKE '%duvet%';
