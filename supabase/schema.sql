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
