-- ==============================================================================
-- Her Beauty Wrap - Supabase Database Schema
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/vhuipurklcjgjqwsvigk/sql
-- ==============================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. PRODUCTS TABLE
create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  subtitle text not null,
  category text not null,
  price numeric(10, 2) not null,
  original_price numeric(10, 2),
  discount_percent integer,
  material text not null,
  purity text,
  rating numeric(3, 2) default 4.8,
  reviews_count integer default 12,
  stock integer default 10,
  is_bestseller boolean default false,
  is_new_arrival boolean default false,
  is_featured boolean default false,
  occasion text default 'Everyday',
  images text[] default '{}',
  description text not null,
  details jsonb default '{}'::jsonb,
  sizes text[] default '{}',
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for product lookups
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_occasion on public.products(occasion);

-- 3. CONTACT SUBMISSIONS TABLE
create table if not exists public.contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. NEWSLETTER SUBSCRIBERS TABLE
create table if not exists public.newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. ORDERS TABLE
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,
  customer_name text not null,
  customer_email text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null,
  pincode text not null,
  payment_method text not null,
  subtotal numeric(10, 2) not null,
  discount_amount numeric(10, 2) default 0,
  shipping_fee numeric(10, 2) default 0,
  grand_total numeric(10, 2) not null,
  status text default 'confirmed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. ORDER ITEMS TABLE
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text not null,
  product_name text not null,
  price numeric(10, 2) not null,
  quantity integer default 1 not null,
  selected_size text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.products enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Products: Everyone can read products
drop policy if exists "Allow public read access to products" on public.products;
create policy "Allow public read access to products"
  on public.products for select
  to public
  using (true);

-- Contact Submissions: Public can submit inquiries
drop policy if exists "Allow public insert on contact_submissions" on public.contact_submissions;
create policy "Allow public insert on contact_submissions"
  on public.contact_submissions for insert
  to public
  with check (true);

-- Newsletter: Public can subscribe
drop policy if exists "Allow public insert on newsletter_subscribers" on public.newsletter_subscribers;
create policy "Allow public insert on newsletter_subscribers"
  on public.newsletter_subscribers for insert
  to public
  with check (true);

-- Orders: Public can create orders
drop policy if exists "Allow public insert on orders" on public.orders;
create policy "Allow public insert on orders"
  on public.orders for insert
  to public
  with check (true);

-- Order Items: Public can insert items during checkout
drop policy if exists "Allow public insert on order_items" on public.order_items;
create policy "Allow public insert on order_items"
  on public.order_items for insert
  to public
  with check (true);


-- ==============================================================================
-- Her Beauty Wrap - Products Seed Data
-- Run this in your Supabase SQL Editor after running schema.sql:
-- https://supabase.com/dashboard/project/vhuipurklcjgjqwsvigk/sql
-- ==============================================================================

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-01', 'celestial-solstice-layered-pendant', 'Celestial Solstice Layered Pendant', 'Triple-strand layered collar with hammered coin and sunburst charm', 'Necklaces', 3499,
  4299, 19, '18K Gold Vermeil', '18K Gold over 925 Sterling Silver',
  4.9, 142, 14,
  true, false, true,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop'], 'Bathed in the warm aura of golden hour, the Celestial Solstice pendant combines delicate fine chains with artisanal brushed textures. Designed to sit effortlessly against collarbones, capturing the gentle gleam of sunlight.', '{"dimensions":"Chain lengths: 16\", 18\", 20\" with 2\" extender","weight":"8.4 grams","plating":"2.5 Micron 18 Karat Yellow Gold","closure":"Secure lobster clasp with logo tag"}'::jsonb, ARRAY['Adjustable 16" - 20"'], ARRAY['Layered','Gold','Necklace','Bestseller']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-02', 'aurelia-baroque-pearl-drop-earrings', 'Aurelia Baroque Pearl Drops', 'Organic freshwater baroque pearls hand-set in sculptured molten bronze', 'Earrings', 2899,
  3499, 17, 'Freshwater Pearls', 'Natural Cultured Pearl & 18K Gold Finish',
  4.8, 89, 9,
  true, false, true,
  'Cocktail & Party', ARRAY['https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop'], 'Each Aurelia drop features unique, organic baroque freshwater pearls selected for their iridescent luster and fluid curves. Finished with hand-cast bronze huggies that feel weightless all night.', '{"dimensions":"Drop length: 42mm, Pearl size: ~14mm","weight":"5.2 grams per earring","plating":"Hypoallergenic 18K Gold coat","gemstone":"Grade AAA Natural Baroque Pearl","closure":"Comfort click-latch hoop"}'::jsonb, ARRAY['One Size'], ARRAY['Pearls','Earrings','Cocktail','Handmade']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-03', 'solaris-hammered-dome-signet-ring', 'Solaris Hammered Dome Ring', 'Bold statement dome ring with satin brushed finish and pavé moissanite line', 'Rings', 2199,
  2799, 21, '18K Gold Vermeil', 'Solid 925 Silver with Thick Gold Vermeil',
  4.9, 112, 18,
  true, false, false,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop'], 'A testament to subtle power and tactile allure. The Solaris ring sits softly contoured on the finger, radiating a mellow sunlit glow that elevates both structured blazers and slip dresses.', '{"dimensions":"Band width: 4mm tapering to 11mm dome","weight":"6.8 grams","plating":"2.5 Micron 18K Yellow Gold","gemstone":"Micro-pavé Lab Moissanite accents"}'::jsonb, ARRAY['US 6','US 7','US 8','US 9'], ARRAY['Ring','Statement','Gold','Dome']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-04', 'elysian-twined-cuff-bracelet', 'Elysian Twined Rope Cuff', 'Intertwined twisted cable cuff with polished ball finials', 'Bracelets', 2699,
  3299, 18, '22K Gold Dipped Brass', '22K Gold Plated Artisan Brass',
  4.7, 65, 12,
  false, true, false,
  'Workwear', ARRAY['https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'], 'Inspired by ancient Mediterranean filigree, this architectural cuff balances structure and comfort. Bendable core allows a bespoke contour around your wrist.', '{"dimensions":"Interior diameter: 60mm (Flexible fit)","weight":"14.2 grams","plating":"Anti-tarnish protective lacquer coat","closure":"Open cuff style"}'::jsonb, ARRAY['Adjustable Fit'], ARRAY['Cuff','Bracelet','Sculptural','Gold']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-05', 'noor-kundan-polki-heritage-bridal-set', 'Noor Royal Kundan Polki Choker Set', 'Intricate uncut Polki choker, matching chandelier earrings & maangtikka', 'Bridal Sets', 12499,
  15999, 22, '22K Gold Dipped Brass', 'Handcrafted Jadau Kundan with Meenakari backing',
  5, 78, 5,
  true, false, true,
  'Bridal & Wedding', ARRAY['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'], 'The pinnacle of royal craftsmanship. Featuring hand-set uncut stones with pastel green fluorite drops and reversible rose-gold enameled reverse. Created for the unforgettable bride.', '{"dimensions":"Choker width: 4.5cm, Earring length: 7.5cm","weight":"118 grams total set","plating":"22K Gold Antique Micron Finish","gemstone":"Polki Glass Stones, Cultured Seed Pearls, Emerald Beads","closure":"Adjustable silk dori cord"}'::jsonb, ARRAY['Full Bridal Set (Choker + Earrings + Maangtikka)'], ARRAY['Bridal','Wedding','Polki','Luxury','Royal']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-06', 'seraphina-herringbone-liquid-chain', 'Seraphina Liquid Gold Herringbone', 'Silky flat weave chain that moves like molten bronze against the skin', 'Necklaces', 2499,
  2999, 17, '18K Gold Vermeil', 'Thick 18K Gold over Italian 925 Silver',
  4.9, 198, 25,
  true, false, false,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop'], 'Our signature chain and an essential foundation piece. Crafted with mirror-polished interlocking flat links that lie impeccably flat, reflecting light with continuous fluidity.', '{"dimensions":"Width: 3.5mm, Length: 16\" + 2\" extension","weight":"9.1 grams","plating":"Heavy 18K Gold Vermeil","closure":"Custom lobster clasp"}'::jsonb, ARRAY['16" + 2" Extension','18" + 2" Extension'], ARRAY['Herringbone','Necklace','Liquid Gold','Everyday']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-07', 'zephyr-delicate-beaded-anklet', 'Zephyr Golden Bead & Pearl Anklet', 'Dainty dual-strand anklet with micro gold flutes and freshwater seed pearls', 'Anklets', 1899,
  2299, 17, 'Freshwater Pearls', '925 Sterling Silver base with 18K Yellow Gold Dip',
  4.8, 54, 16,
  false, true, false,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'], 'A sensual touch of luxury for sun-drenched steps. Subtle seed pearls shimmer alongside diamond-cut gold beads, chiming with quiet elegance as you move.', '{"dimensions":"Length: 9\" with 1.5\" extender","weight":"3.4 grams","plating":"E-coated waterproof anti-tarnish finish","closure":"Spring ring with safety tag"}'::jsonb, ARRAY['Standard 9" - 10.5"'], ARRAY['Anklet','Pearls','Dainty','Boho Luxe']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-08', 'padma-heritage-kadas-pair', 'Padma Sculpted Lotus Kadas (Set of 2)', 'Pair of openable temple-carved bangles with lotus motif and ruby cabochons', 'Bangles', 5499,
  6999, 21, '22K Gold Dipped Brass', 'Antique 22K Micro Gold Plating',
  4.9, 92, 8,
  false, false, true,
  'Festive', ARRAY['https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'], 'Honoring traditional Indian temple artistry with modern ergonomic wearability. Detailed with blooming lotus relief work and synthetic pink tourmalines with a screw-hinged clasp.', '{"dimensions":"Inner diameter: 2.4 / 2.6 / 2.8 options","weight":"48 grams (pair)","plating":"Matte Antique 22K Gold","closure":"Side pin screw hinge"}'::jsonb, ARRAY['Size 2.4 (Small)','Size 2.6 (Medium)','Size 2.8 (Large)'], ARRAY['Bangles','Kadas','Festive','Lotus','Antique']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-09', 'velvet-keepsake-trousseau-gift-box', 'The Grand Muse Velvet Keepsake Box', 'Curated gift set with Solstice necklace, baroque drops & jewelry travel pouch', 'Gifting', 6499,
  8299, 22, '18K Gold Vermeil', '18K Gold Vermeil & Natural Baroque Pearls',
  5, 46, 11,
  false, false, true,
  'Bridal & Wedding', ARRAY['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'], 'The ultimate expression of thoughtful luxury. Packaged in a plush fawn-velvet lined keepsake trunk with golden brass hardware, wax seal certificate, and custom handwritten note.', '{"dimensions":"Box: 18cm x 14cm x 8cm","weight":"420 grams total packaging","plating":"18K Gold Vermeil Pieces","closure":"Brass latch lock"}'::jsonb, ARRAY['Signature Curated Box'], ARRAY['Gift Box','Set','Gifting','Luxury']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-10', 'lumina-solitaire-bezel-tennis-bracelet', 'Lumina Diamond Tennis Bracelet', 'Continuously articulated bezel-set round cut lab moissanites in rose gold', 'Bracelets', 4899,
  5999, 18, 'Lab Diamond & Moissanite', 'Solid 925 Silver bathed in 18K Rose Gold',
  4.9, 104, 15,
  true, false, false,
  'Cocktail & Party', ARRAY['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop'], 'An understated, modern reinterpretation of the iconic tennis bracelet. Bezel cups secure brilliant VVS-grade lab moissanite gems, offering incredible fire and everyday wearability.', '{"dimensions":"Length: 7\" (includes 0.5\" removable link)","weight":"11.2 grams","plating":"18K Rose Gold triple coat","gemstone":"2.5mm VVS Lab Moissanites (4.2 Ctw)","closure":"Double-safety hidden box clasp"}'::jsonb, ARRAY['6.5 Inch','7.0 Inch','7.5 Inch'], ARRAY['Tennis Bracelet','Moissanite','Rose Gold','Sparkle']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-11', 'isla-sculpted-molten-studs', 'Isla Molten Nugget Studs', 'Organic liquid molten gold drops with subtle textural facets', 'Earrings', 1699,
  2099, 19, '18K Gold Vermeil', '925 Sterling Silver, 18K Heavy Plating',
  4.8, 88, 30,
  false, true, false,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'], 'Subtle, understated elegance. The Isla studs take the organic texture of molten gold and freeze it in time, creating a rich glow that flatters any complexion.', '{"dimensions":"Diameter: 12mm x 9mm irregular","weight":"2.8 grams per pair","plating":"18K Yellow Gold Satin Glow","closure":"Hypoallergenic push butterfly backs"}'::jsonb, ARRAY['One Size'], ARRAY['Studs','Earrings','Minimalist','Everyday']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-12', 'calla-intertwined-eternity-band', 'Calla Intertwined Eternity Ring', 'Dual intertwined ribbons of warm bronze gold and pavé crystal sparkle', 'Rings', 1999,
  2499, 20, 'Lab Diamond & Moissanite', '18K Gold over 925 Sterling Silver',
  4.7, 73, 22,
  false, false, false,
  'Cocktail & Party', ARRAY['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop'], 'Symbolizing perpetual connection and balance. Two undulating ribbons weave smoothly together to form a comfort-fit band that shines from every angle.', '{"dimensions":"Band height: 5mm","weight":"3.9 grams","plating":"18K Warm Champagne Gold","gemstone":"Precision micro-pavé stones"}'::jsonb, ARRAY['US 5','US 6','US 7','US 8'], ARRAY['Ring','Eternity','Pave','Gold']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-13', 'zahra-chandbali-pearl-earrings', 'Zahra Filigree Crescent Chandbalis', 'Regal moon crescent earrings with seed pearl fringes and emerald drops', 'Earrings', 4299,
  5199, 17, '22K Gold Dipped Brass', 'Traditional Jodhpur Filigree with 22K Gold Tone',
  4.9, 61, 10,
  false, false, true,
  'Festive', ARRAY['https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'], 'Evoking timeless Mughal romanticism. The Zahra Chandbalis frame the face with delicate cascading pearl droplets and hand-pierced crescent filigree.', '{"dimensions":"Length: 6.5cm, Width: 4.2cm","weight":"16 grams per pair","plating":"Antique Micron Gold Dip","gemstone":"Hydro emerald drops and cultured rice pearls","closure":"Post with silicone disc support"}'::jsonb, ARRAY['One Size'], ARRAY['Chandbali','Earrings','Festive','Pearls']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-14', 'marina-paperclip-chain-choker', 'Marina Bold Paperclip Link Choker', 'Elongated rectangular links polished to a high mirror sheen with toggle bar', 'Necklaces', 2999,
  3699, 19, '18K Gold Vermeil', '18K Gold Vermeil on Sterling Silver',
  4.8, 115, 19,
  false, true, false,
  'Workwear', ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop'], 'Clean, geometric, and effortless. Wear it solo as an edgy centerpiece or clip charms onto its substantial links for a personalized talisman necklace.', '{"dimensions":"Link dimensions: 14mm x 5mm, Length: 17\"","weight":"15.4 grams","plating":"18K Yellow Gold Heavy Coat","closure":"Sculpted T-bar front toggle"}'::jsonb, ARRAY['16 Inch','18 Inch'], ARRAY['Paperclip','Choker','Modern','Necklace']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-15', 'amara-stacked-micro-pave-ring', 'Amara Triple Stack Starlight Ring', 'Trio of graduated gold bands conjoined with floating bezel diamond accents', 'Rings', 2399,
  2999, 20, 'Lab Diamond & Moissanite', '18K Gold over 925 Sterling Silver',
  4.8, 77, 17,
  false, false, false,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop'], 'The illusion of a meticulously curated ring stack in one effortlessly comfortable piece. Three slender wires connect underneath for all-day seamless wear.', '{"dimensions":"Total width: 7mm","weight":"4.5 grams","plating":"18K Warm Bronze Gold","gemstone":"Lab created diamond stimulants"}'::jsonb, ARRAY['US 6','US 7','US 8'], ARRAY['Stack','Ring','Minimal','Gold']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-16', 'siya-evil-eye-charm-anklet', 'Siya Mother-of-Pearl Evil Eye Anklet', 'Protective talisman with hand-carved mother of pearl and turquoise bead', 'Anklets', 1599,
  1999, 20, '925 Sterling Silver', '925 Solid Silver with 18K Yellow Gold Finish',
  4.9, 83, 21,
  false, false, false,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop'], 'An ancient amulet reimagined with modern grace. Carved natural mother of pearl shell ward off negative energy while complementing summer sandals and barefoot beach strolls.', '{"dimensions":"Length: 9.5\" with 1.5\" extender","weight":"2.9 grams","gemstone":"Natural Mother of Pearl & Turquoise","closure":"Lobster claw"}'::jsonb, ARRAY['Adjustable 9.5" - 11"'], ARRAY['Anklet','Evil Eye','Protection','Boho']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-17', 'dharani-matte-gold-broad-cuff-bangle', 'Dharani Brushed Sun-Goddess Broad Cuff', 'Wide architectural wrist cuff with organic hammered ridges and warm bronze hue', 'Bangles', 3899,
  4799, 19, '22K Gold Dipped Brass', '22K Gold Dipped Artisan Brass',
  4.8, 52, 13,
  false, false, false,
  'Festive', ARRAY['https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop'], 'A commanding statement piece that catches and diffuses light softly. Pairs exceptionally well with linen dresses, tailored pant-suits, and silk sarees.', '{"dimensions":"Width: 32mm, Diameter: 62mm (Adjustable open back)","weight":"28 grams","plating":"Hand-brushed 22K Gold Matte Finish","closure":"Slip-on cuff"}'::jsonb, ARRAY['M/L Flexible Cuff'], ARRAY['Bangle','Cuff','Sculptural','Statement']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-18', 'meera-emerald-teardrop-bridal-necklace', 'Meera Emerald Teardrop Bridal Collet', 'Cascading pear-cut emerald doublet stones surrounded by champagne polki florets', 'Bridal Sets', 8999,
  11499, 22, '22K Gold Dipped Brass', 'Heritage Kundan with Hand-enameled reverse',
  5, 63, 7,
  false, false, true,
  'Bridal & Wedding', ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'], 'Designed for the modern royal bride. Emerald green stones replicate the depth of rare Colombian emeralds, complemented by pearl cluster drops.', '{"dimensions":"Necklace width: 3.5cm, Drop length: 5cm","weight":"86 grams","plating":"22K Gold Antique Polish","closure":"Hand-braided golden zari thread"}'::jsonb, ARRAY['Includes Necklace & Statement Earrings'], ARRAY['Bridal','Emerald','Wedding','Kundan']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-19', 'rosa-rose-gold-vermeil-chubby-hoops', 'Rosa Sculpted Chubby Huggie Hoops', 'Tubular hollow-cast teardrop huggie hoops in radiant rose gold', 'Earrings', 2299,
  2899, 21, 'Rose Gold Plated', 'Solid 925 Silver with 18K Rose Gold Plating',
  4.9, 137, 24,
  true, false, false,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'], 'Our bestselling everyday hoop. Ultra-lightweight hollow construction means zero earlobe drag, while the rose bronze hue imparts warmth to every outfit.', '{"dimensions":"Diameter: 22mm, Thickness: 6mm","weight":"3.6 grams per hoop","plating":"18K Rose Gold electroplated","closure":"Seamless snap latch"}'::jsonb, ARRAY['One Size'], ARRAY['Hoops','Earrings','Rose Gold','Bestseller']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-20', 'artemis-moonstone-halo-ring', 'Artemis Rainbow Moonstone Halo Ring', 'Iridescent oval cabochon rainbow moonstone nestled in a crown of pavé gems', 'Rings', 2599,
  3199, 19, '925 Sterling Silver', '925 Sterling Silver with Rhodium & 18K Gold Plated accents',
  4.8, 59, 14,
  false, false, false,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop'], 'Capturing ethereal moonlit blue flashes. The natural rainbow moonstone is revered as a stone of inner intuition and feminine grace.', '{"dimensions":"Center stone: 8mm x 6mm oval","weight":"4.1 grams","gemstone":"Natural Sri Lankan Rainbow Moonstone"}'::jsonb, ARRAY['US 6','US 7','US 8'], ARRAY['Moonstone','Ring','Gemstone','Ethereal']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-21', 'talia-snake-bone-double-chain-bracelet', 'Talia Sleek Snake Bone Link Bracelet', 'Double rounded snake chain with centered bezel crystal slide charm', 'Bracelets', 2199,
  2699, 19, '18K Gold Vermeil', '18K Gold over 925 Sterling Silver',
  4.7, 44, 18,
  false, false, false,
  'Workwear', ARRAY['https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop'], 'Glides against the skin with effortless, mirror-like gloss. Ideal for stacking with wristwatches or paired alone with tailored cuffs.', '{"dimensions":"Length: 6.5\" + 1.5\" extender","weight":"7.2 grams","plating":"18K Champagne Gold Vermeil","closure":"Lobster clasp with branded tag"}'::jsonb, ARRAY['Standard 6.5" - 8"'], ARRAY['Snake Chain','Bracelet','Minimalist','Gold']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-22', 'florence-keshi-pearl-collar-necklace', 'Florence Keshi Pearl Choker Collar', 'Organic lustrous Japanese keshi pearls with molten bronze gold spacers', 'Necklaces', 3999,
  4999, 20, 'Freshwater Pearls', 'Natural Keshi Pearls & 18K Solid Gold Beads',
  4.9, 71, 8,
  false, false, true,
  'Cocktail & Party', ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'], 'No two keshi pearls are identical. Their organic, petal-like shapes catch candlelight with unmatched warmth, creating an unforgettable statement for evenings.', '{"dimensions":"Length: 15\" with 3\" extension chain","weight":"18.5 grams","gemstone":"Natural High-Luster Keshi Pearls","closure":"18K Gold vermeil spring clasp"}'::jsonb, ARRAY['15" + 3" Extender'], ARRAY['Pearls','Keshi','Collar','Necklace']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-23', 'eternal-radiance-anniversary-gift-set', 'Eternal Radiance Keepsake Trio', 'Curated gift set featuring matching solitaire necklace, earrings, and eternity band', 'Gifting', 5999,
  7799, 23, 'Lab Diamond & Moissanite', '18K Gold Vermeil with VVS Lab Moissanites',
  5, 38, 9,
  false, false, true,
  'Bridal & Wedding', ARRAY['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'], 'The complete romantic gift. Arrives nestled in our signature fawn-velvet presentation box with embossed golden ribbon and custom luxury jewelry care kit.', '{"dimensions":"Necklace 16-18\", Earrings 6mm studs, Ring size adjustable","weight":"16.8 grams (total jewelry)","plating":"18K Yellow Gold Vermeil"}'::jsonb, ARRAY['Trio Presentation Set'], ARRAY['Gift','Set','Moissanite','Anniversary']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-24', 'sahara-hammered-coin-anklet', 'Sahara Sunburst Hammered Coin Anklet', 'Dainty shimmering link chain with dangling miniature disc charms', 'Anklets', 1799,
  2199, 18, '18K Gold Vermeil', '925 Sterling Silver with 18K Gold Dip',
  4.8, 47, 20,
  false, false, false,
  'Everyday', ARRAY['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'], 'Seven miniature coins chime with quiet rhythm with every step. Each coin is gently hammered by hand to reflect flickering light like gold dust.', '{"dimensions":"Length: 9.0\" + 1.5\" extender","weight":"3.8 grams","plating":"Water-resistant 18K Gold Plating","closure":"Lobster clasp with stamped tag"}'::jsonb, ARRAY['Standard 9.0" - 10.5"'], ARRAY['Anklet','Coin','Boho Luxe','Summer']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  'hbw-25', 'aanya-classic-fluted-bangle-pair', 'Aanya Fluted Royal Bangles (Pair)', 'Sculpted ridges with delicate millgrain edges and soft satin luster', 'Bangles', 3699,
  4499, 18, '22K Gold Dipped Brass', '22K Micron Gold Plated Brass',
  4.9, 84, 15,
  false, false, false,
  'Festive', ARRAY['https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'], 'Versatile and radiant, the Aanya bangles can be worn stacked with a watch or flanking glass bangles during festive celebrations.', '{"dimensions":"Width: 8mm each, Size 2.6 standard","weight":"32 grams per pair","plating":"Anti-tarnish 22K Gold Finish","closure":"Slip-on smooth contour"}'::jsonb, ARRAY['Size 2.4','Size 2.6','Size 2.8'], ARRAY['Bangles','Festive','Gold','Royal']
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

