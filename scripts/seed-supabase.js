const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env.local if present
try {
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  envContent.split('\n').forEach(line => {
    const [k, ...v] = line.trim().split('=');
    if (k && v.length) process.env[k] = v.join('=');
  });
} catch {}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vhuipurklcjgjqwsvigk.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodWlwdXJrbGNqZ2pxd3N2aWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMTU3OTYsImV4cCI6MjEwODU5MTc5Nn0.yUvVqFu5_qKPuNNIUw2FTdpwcr1PJgv0FE7Or-kPV58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log(`Connecting to Supabase at: ${supabaseUrl}`);

  const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
  const content = fs.readFileSync(productsFilePath, 'utf8');
  const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\n\]);/);
  if (!match) {
    console.error("Could not find PRODUCTS in src/data/products.ts");
    process.exit(1);
  }

  const products = new Function(`return ${match[1]}`)();

  console.log(`Preparing to seed ${products.length} products into Supabase...`);

  const records = products.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle,
    category: p.category,
    price: p.price,
    original_price: p.originalPrice || null,
    discount_percent: p.discountPercent || null,
    material: p.material,
    purity: p.purity || null,
    rating: p.rating || 4.8,
    reviews_count: p.reviewsCount || 10,
    stock: p.stock || 10,
    is_bestseller: p.isBestseller || false,
    is_new_arrival: p.isNewArrival || false,
    is_featured: p.isFeatured || false,
    occasion: p.occasion || 'Everyday',
    images: p.images || [],
    description: p.description,
    details: p.details || {},
    sizes: p.sizes || [],
    tags: p.tags || [],
  }));

  const { data, error } = await supabase
    .from('products')
    .upsert(records, { onConflict: 'id' });

  if (error) {
    console.error('Error seeding products:', error.message);
    if (error.code === 'PGRST205') {
      console.log('\nTIP: Please run supabase/schema.sql in the Supabase Dashboard SQL Editor first to create the tables!');
    }
    process.exit(1);
  }

  console.log(`Successfully seeded ${records.length} products to Supabase!`);
}

seed();
