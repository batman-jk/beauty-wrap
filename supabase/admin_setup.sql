-- ==============================================================================
-- Her Beauty Wrap - Admin & Products Database Upgrade
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/vhuipurklcjgjqwsvigk/sql
-- ==============================================================================

-- 1. Ensure UUID Extension is available
create extension if not exists "uuid-ossp";

-- 2. Create or Update PRODUCTS Table
create table if not exists public.products (
  id text primary key default ('hbw-' || substring(uuid_generate_v4()::text, 1, 8)),
  slug text unique not null,
  name text not null,
  subtitle text default '',
  category text not null,
  price numeric(10, 2) not null,
  discount_price numeric(10, 2),
  original_price numeric(10, 2),
  discount_percent integer,
  material text default '18K Gold Vermeil',
  purity text default '',
  rating numeric(3, 2) default 4.8,
  reviews_count integer default 12,
  stock integer default 10,
  in_stock boolean default true,
  is_published boolean default true,
  is_bestseller boolean default false,
  is_new_arrival boolean default false,
  is_featured boolean default false,
  occasion text default 'Everyday',
  images text[] default '{}',
  description text not null default '',
  details jsonb default '{}'::jsonb,
  sizes text[] default '{}',
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- In case table already existed, add missing columns safely
alter table public.products add column if not exists discount_price numeric(10, 2);
alter table public.products add column if not exists in_stock boolean default true;
alter table public.products add column if not exists is_published boolean default true;
alter table public.products add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());

-- Update any null flags to sensible defaults
update public.products set in_stock = true where in_stock is null;
update public.products set is_published = true where is_published is null;
update public.products set updated_at = now() where updated_at is null;

-- Indexes for lightning fast queries
create index if not exists idx_products_published on public.products(is_published);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category);

-- 3. Row Level Security (RLS) on PRODUCTS Table
alter table public.products enable row level security;

-- Drop existing policies to prevent conflicts
drop policy if exists "Allow public read access to products" on public.products;
drop policy if exists "Public view published products" on public.products;
drop policy if exists "Admin full access products" on public.products;
drop policy if exists "Admin full access to products" on public.products;

-- Public Policy: Only published products can be viewed by anyone/anon
create policy "Public view published products"
  on public.products for select
  to public
  using (is_published = true);

-- Admin Policy: Authenticated admin has complete access (view drafts, insert, update, delete)
create policy "Admin full access to products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

-- 4. Supabase Storage: product-images bucket
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- Storage RLS Policies
drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects for select
  to public
  using (bucket_id = 'product-images');

drop policy if exists "Admin can upload product images" on storage.objects;
create policy "Admin can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Admin can update product images" on storage.objects;
create policy "Admin can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Admin can delete product images" on storage.objects;
create policy "Admin can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
