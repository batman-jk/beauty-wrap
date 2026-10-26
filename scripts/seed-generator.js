const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const content = fs.readFileSync(productsFilePath, 'utf8');
const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\n\]);/);

if (!match) {
  console.error("Could not find PRODUCTS array");
  process.exit(1);
}

// Evaluate PRODUCTS in sandboxed context
const products = new Function(`return ${match[1]}`)();

let sql = `-- ==============================================================================
-- Her Beauty Wrap - Products Seed Data
-- Run this in your Supabase SQL Editor after running schema.sql:
-- https://supabase.com/dashboard/project/vhuipurklcjgjqwsvigk/sql
-- ==============================================================================

`;

for (const p of products) {
  const images = 'ARRAY[' + p.images.map(img => `'${img.replace(/'/g, "''")}'`).join(',') + ']';
  const sizes = (p.sizes && p.sizes.length > 0)
    ? 'ARRAY[' + p.sizes.map(s => `'${s.replace(/'/g, "''")}'`).join(',') + ']'
    : "ARRAY[]::text[]";
  const tags = (p.tags && p.tags.length > 0)
    ? 'ARRAY[' + p.tags.map(t => `'${t.replace(/'/g, "''")}'`).join(',') + ']'
    : "ARRAY[]::text[]";
  const details = `'${JSON.stringify(p.details || {}).replace(/'/g, "''")}'::jsonb`;
  const desc = `'${(p.description || '').replace(/'/g, "''")}'`;
  const name = `'${(p.name || '').replace(/'/g, "''")}'`;
  const subtitle = `'${(p.subtitle || '').replace(/'/g, "''")}'`;
  const material = `'${(p.material || '').replace(/'/g, "''")}'`;
  const purity = p.purity ? `'${p.purity.replace(/'/g, "''")}'` : 'null';
  const occasion = p.occasion ? `'${p.occasion.replace(/'/g, "''")}'` : 'null';

  sql += `insert into public.products (
  id, slug, name, subtitle, category, price, original_price, discount_percent,
  material, purity, rating, reviews_count, stock, is_bestseller, is_new_arrival,
  is_featured, occasion, images, description, details, sizes, tags
) values (
  '${p.id}', '${p.slug}', ${name}, ${subtitle}, '${p.category}', ${p.price},
  ${p.originalPrice || 'null'}, ${p.discountPercent || 'null'}, ${material}, ${purity},
  ${p.rating || 4.8}, ${p.reviewsCount || 10}, ${p.stock || 10},
  ${p.isBestseller ? true : false}, ${p.isNewArrival ? true : false}, ${p.isFeatured ? true : false},
  ${occasion}, ${images}, ${desc}, ${details}, ${sizes}, ${tags}
)
on conflict (id) do update set
  price = excluded.price,
  original_price = excluded.original_price,
  stock = excluded.stock,
  is_bestseller = excluded.is_bestseller;

`;
}

const seedPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
fs.writeFileSync(seedPath, sql, 'utf8');
console.log(`Generated ${seedPath} with ${products.length} products successfully!`);
