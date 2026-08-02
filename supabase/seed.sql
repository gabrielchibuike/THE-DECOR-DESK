-- ============================================================
-- Antigravity Decor — Initial Seed Data for Supabase
-- Run this in your Supabase SQL Editor after running 001_initial_schema.sql
-- ============================================================

-- 1. Ensure Categories
insert into categories (name, slug, description, image_url) values
  ('Living Room Ideas', 'living-room-ideas', 'Inspiration, styling guides, and cozy layouts for your main living area.', '/images/categories/living-room.jpg'),
  ('Bathroom Ideas', 'bathroom-ideas', 'Spa-like updates, smart storage solutions, and stylish vanity setups.', '/images/categories/bathroom.jpg'),
  ('Bedroom Ideas', 'bedroom-ideas', 'Cozy layering tips, lighting design, and restful neutral color palettes.', '/images/categories/bedroom.jpg'),
  ('Laundry Room Ideas', 'laundry-room-ideas', 'Smart organization, beautiful shelving, and functional folding stations.', '/images/categories/laundry-room.jpg'),
  ('Apartment Living Room Ideas', 'apartment-living-room-ideas', 'Small-space layouts, double-duty furniture, and renter-friendly styling.', '/images/categories/apartment-living-room.jpg'),
  ('Apartment Bathroom Ideas', 'apartment-bathroom-ideas', 'Renter-friendly vanity upgrades, space-saving organizers, and styling tips.', '/images/categories/apartment-bathroom.jpg')
on conflict (slug) do nothing;

-- 2. Ensure Products
insert into products (id, name, description, image_url, retailers) values
  (
    '00000000-0000-0000-0000-000000000001',
    'Aesthetic Bouclé Accent Chair',
    'A gorgeous, cozy bouclé chair with solid oak legs. Perfect for creating a warm, organic modern reading nook.',
    '/images/products/boucle-chair.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$249.99"},{"retailerName":"Wayfair","affiliateUrl":"https://www.wayfair.com","price":"$279.00"}]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Solid Oak Double Laundry Hamper',
    'Elevate your laundry room with this beautiful double laundry hamper featuring a removable linen liner and soft-close lid.',
    '/images/products/laundry-hamper.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$129.99"},{"retailerName":"Target","affiliateUrl":"https://www.target.com","price":"$119.50"}]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Arched Thin Brass Vanity Mirror',
    'A premium arched mirror with a thin brass frame. Ideal for adding a touch of elegance to any bathroom or entryway.',
    '/images/products/brass-mirror.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$89.50"}]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Pure French Flax Linen Duvet Cover Set',
    'Breathable, pre-washed linen bedding set in a warm sand tone. Becomes softer with every single wash.',
    '/images/products/linen-bedding.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$159.00"},{"retailerName":"Target","affiliateUrl":"https://www.target.com","price":"$149.00"}]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Handmade Textured Ceramic Vases (Set of 3)',
    'A set of three matte textured ceramic vases in graduating sizes. Perfect for styling built-ins, shelves, or console tables.',
    '/images/products/ceramic-vases.jpg',
    '[{"retailerName":"Amazon","affiliateUrl":"https://www.amazon.com","price":"$34.99"}]'::jsonb
  )
on conflict (id) do nothing;

-- 3. Seed Posts with Structured Block JSONB Content
insert into posts (
  title, slug, category_id, meta_description, keywords, hero_image_url, content, status, featured, published_at
) select
  '5 Simple Ways to Elevate Your Laundry Room Design',
  'elevate-laundry-room-design',
  c.id,
  'Turn your laundry room into a beautiful, functional space. Explore our top design tips including warm styling, sorting solutions, and smart shelving.',
  array['laundry room ideas', 'laundry room organization', 'utility room decor'],
  '/images/hero-laundry.jpg',
  '[
    {"type":"paragraph","text":"Laundry rooms are often the most overlooked spaces in a home. We treat them as purely functional zones, locking away dirty clothes and noisy appliances behind closed doors. However, with the right styling and a few deliberate design updates, you can transform your laundry area into a serene, organized sanctuary that actually makes chore day feel like a luxury."},
    {"type":"paragraph","text":"If you want to move away from cold utility aesthetics and embrace a warm, organic modern design, here are five simple steps to elevate your space."},
    {"type":"heading","level":2,"text":"1. Prioritize High-Quality Storage and Sorting"},
    {"type":"paragraph","text":"Organizing your space is the first step to high-end design. Instead of keeping cheap plastic baskets in plain sight, invest in sorting hampers crafted from natural materials like wood, wicker, or rattan. A beautiful double hamper allows you to separate darks and lights while keeping visual clutter concealed under a clean lid."},
    {"type":"product_block","productId":"00000000-0000-0000-0000-000000000002"},
    {"type":"heading","level":2,"text":"2. Introduce Warm Oak Cabinetry and Shelving"},
    {"type":"paragraph","text":"Replace generic wire shelving with rich floating shelves made from white oak or walnut. This instantly anchors the room and introduces a warm, tactile wood element. Use the shelves to display neat stacks of folded towels, glass jars filled with wool dryer balls, and ceramic decorative objects to soften the environment."},
    {"type":"heading","level":2,"text":"3. Style Built-Ins with Ceramic Objects"},
    {"type":"paragraph","text":"A premium space always balances utility with decoration. Add small styling details on your countertops or floating shelves to make the room feel integrated with the rest of your home. Group matte, textured ceramic vases in odd numbers to bring in organic curves and shapes."},
    {"type":"product_block","productId":"00000000-0000-0000-0000-000000000005"},
    {"type":"heading","level":2,"text":"4. Install a Space-Saving Wall Drying Rack"},
    {"type":"paragraph","text":"If you have a small laundry room, hanging racks can take up valuable floor space. Install a wall-mounted accordion drying rack that folds completely flat when not in use. Opt for an oak or custom black metal finish that coordinates with your cabinet hardware for a custom, built-in appearance."},
    {"type":"heading","level":2,"text":"5. Upgrade Utility Essentials"},
    {"type":"paragraph","text":"Finally, decant your detergent, baking soda, and scent boosters into matching glass canisters with wooden scoop spoons. Swapping out commercial, brightly colored packaging for matching jars instantly creates a calm, spa-like shelf view that feels curated rather than messy."}
  ]'::jsonb,
  'published',
  true,
  '2026-07-28T00:00:00Z'
from categories c where c.slug = 'laundry-room-ideas'
on conflict (slug) do nothing;

insert into posts (
  title, slug, category_id, meta_description, keywords, hero_image_url, content, status, featured, published_at
) select
  'How to Style a Cozy Neutral Living Room',
  'cozy-neutral-living-room',
  c.id,
  'Discover the key design secrets to styling a warm, inviting, and layered neutral living room without it feeling boring or flat.',
  array['living room ideas', 'neutral decor', 'organic modern'],
  '/images/hero-living.jpg',
  '[
    {"type":"paragraph","text":"Designing a neutral living room is often misunderstood as simply using beige paint and white furniture. In reality, creating a compelling neutral palette requires a masterclass in texture, subtle tonal contrast, and organic material layering. Without these elements, a monochromatic room risks feeling cold, flat, or unfinished."},
    {"type":"paragraph","text":"Here is how we curate a tactile, deeply comfortable living room using natural materials, strategic lighting, and cozy statement seating."},
    {"type":"heading","level":2,"text":"1. Start with Tactile Seating"},
    {"type":"paragraph","text":"The anchor of any warm living room is its seating. To create warmth without relying on loud colors, embrace textured fabrics like bouclé, thick linen weaves, or plush velvet. A curved bouclé accent chair introduces soft lines and touchable texture that instantly elevates the cozy factor."},
    {"type":"product_block","productId":"00000000-0000-0000-0000-000000000001"},
    {"type":"heading","level":2,"text":"2. Layer Tonal Rugs and Textiles"},
    {"type":"paragraph","text":"Floor coverings are essential for grounding a neutral room. Consider layering a low-pile wool area rug over a larger jute or sisal rug to build depth underfoot. Complement this with throw pillows in varying weaves—combining smooth linen with ribbed knit or embroidered wool."},
    {"type":"heading","level":2,"text":"3. Mix Wood Tones and Matte Ceramics"},
    {"type":"paragraph","text":"Ground all the soft textiles with hard, natural accents. Reclaimed wood coffee tables, natural stone coasters, and handcrafted ceramic vessels provide natural weight and character. When grouping decor, pair smooth glazed pottery with raw matte ceramics for subtle visual harmony."},
    {"type":"product_block","productId":"00000000-0000-0000-0000-000000000005"}
  ]'::jsonb,
  'published',
  false,
  '2026-07-29T00:00:00Z'
from categories c where c.slug = 'living-room-ideas'
on conflict (slug) do nothing;

insert into posts (
  title, slug, category_id, meta_description, keywords, hero_image_url, content, status, featured, published_at
) select
  'Spa-Like Bathroom Upgrades on a Budget',
  'spa-like-bathroom-upgrades',
  c.id,
  'Transform your bathroom into a luxury home spa with these simple, high-impact decor updates and brass hardware accents.',
  array['bathroom ideas', 'spa bathroom', 'bathroom vanity'],
  '/images/hero-bathroom.jpg',
  '[
    {"type":"paragraph","text":"You don’t need a full renovation budget to make your everyday bathroom feel like a 5-star boutique wellness retreat. With a few intentional hardware swaps, architectural mirrors, and luxurious organic textiles, you can turn a basic vanity area into a calming sanctuary."},
    {"type":"heading","level":2,"text":"1. Anchor the Space with an Arched Brass Mirror"},
    {"type":"paragraph","text":"Standard builder-grade flat mirrors instantly cheapen a bathroom. Replacing a plain mirror with an arched brass or dark bronzed frame adds architectural shape, height, and reflective light."},
    {"type":"product_block","productId":"00000000-0000-0000-0000-000000000003"},
    {"type":"heading","level":2,"text":"2. Swap Builders Hardware for Brushed Metal"},
    {"type":"paragraph","text":"Update your cabinet pulls, towel hooks, and faucet fixtures to matching brushed brass or matte black finishes. Consistent metal finishes bind the room together into a cohesive designer look."}
  ]'::jsonb,
  'published',
  false,
  '2026-07-30T00:00:00Z'
from categories c where c.slug = 'bathroom-ideas'
on conflict (slug) do nothing;

insert into posts (
  title, slug, category_id, meta_description, keywords, hero_image_url, content, status, featured, published_at
) select
  'Create a Restful Bedroom Retreat with Linen Bedding',
  'restful-bedroom-linen-bedding',
  c.id,
  'Learn how to layer pure French flax linen bedding with ambient warm lighting to turn your bedroom into a peaceful sanctuary.',
  array['bedroom ideas', 'linen bedding', 'cozy bedroom'],
  '/images/hero-bedroom.jpg',
  '[
    {"type":"paragraph","text":"Your bedroom should be the quietest, most peaceful zone in your home. Creating a restful retreat comes down to two primary elements: breathable natural bedding materials and warm, layered lighting."},
    {"type":"heading","level":2,"text":"1. Invest in Pure French Flax Linen"},
    {"type":"paragraph","text":"Linen bedding regulates body temperature year-round while offering an effortlessly crumpled, relaxed look that feels luxurious without being overly formal."},
    {"type":"product_block","productId":"00000000-0000-0000-0000-000000000004"},
    {"type":"heading","level":2,"text":"2. Embrace Warm 2700K Lighting"},
    {"type":"paragraph","text":"Ditch harsh white overhead lights. Use warm linen drum shade sconces or ceramic bedside lamps fitted with 2700K warm LED bulbs to promote melatonin production before sleep."}
  ]'::jsonb,
  'published',
  false,
  '2026-07-30T00:00:00Z'
from categories c where c.slug = 'bedroom-ideas'
on conflict (slug) do nothing;

insert into posts (
  title, slug, category_id, meta_description, keywords, hero_image_url, content, status, featured, published_at
) select
  'Small Apartment Living Room Layout Hacks',
  'small-apartment-living-room-hacks',
  c.id,
  'Maximize square footage and style in a small apartment living room with floating furniture, leggy silhouettes, and vertical storage.',
  array['apartment living room ideas', 'small space decor', 'renter friendly'],
  '/images/hero-apartment-living.jpg',
  '[
    {"type":"paragraph","text":"Living in a small apartment doesn’t mean sacrificing high-end interior styling. The key to small space design is choosing furniture silhouettes that allow light to pass through and utilizing vertical wall space effectively."},
    {"type":"heading","level":2,"text":"1. Choose Furniture on Raised Legs"},
    {"type":"paragraph","text":"Heavy block sofas and bulky credenzas trap sightlines, making a small room feel crowded. Select sofas and accent chairs raised on slender tapered legs to expose more floor area."},
    {"type":"product_block","productId":"00000000-0000-0000-0000-000000000001"}
  ]'::jsonb,
  'published',
  false,
  '2026-07-31T00:00:00Z'
from categories c where c.slug = 'apartment-living-room-ideas'
on conflict (slug) do nothing;
