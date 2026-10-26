import { supabase } from "./client";
import { PRODUCTS, type Product } from "@/data/products";

export interface ContactInquiryInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface OrderInput {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    selectedSize?: string;
    imageUrl?: string;
  }>;
}

export interface AdminProductInput {
  name: string;
  description: string;
  price: number;
  discount_price?: number | null;
  category: string;
  material?: string;
  images: string[];
  in_stock: boolean;
  is_published: boolean;
  subtitle?: string;
}

/**
 * Save contact / bespoke styling consultation inquiry to Supabase
 */
export async function submitContactInquiry(inquiry: ContactInquiryInput) {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        name: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject,
        message: inquiry.message,
      })
      .select()
      .single();

    if (error) {
      console.warn("Supabase contact submission notice:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    console.warn("Contact submission caught error:", message);
    return { success: false, error: message };
  }
}

/**
 * Save newsletter subscriber to Supabase
 */
export async function subscribeNewsletter(email: string) {
  try {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase() })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return { success: true, isExisting: true };
      }
      console.warn("Supabase newsletter subscribe notice:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    return { success: false, error: message };
  }
}

/**
 * Save order and order line items to Supabase
 */
export async function recordOrder(order: OrderInput) {
  try {
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: order.orderNumber,
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        phone: order.phone,
        address: order.address,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        payment_method: order.paymentMethod,
        subtotal: order.subtotal,
        discount_amount: order.discountAmount,
        shipping_fee: order.shippingFee,
        grand_total: order.grandTotal,
        status: "confirmed",
      })
      .select()
      .single();

    if (orderError) {
      console.warn("Supabase order record notice:", orderError.message);
      return { success: false, error: orderError.message };
    }

    if (order.items && order.items.length > 0 && orderData?.id) {
      const orderItemsToInsert = order.items.map((item) => ({
        order_id: orderData.id,
        product_id: item.productId,
        product_name: item.productName,
        price: item.price,
        quantity: item.quantity,
        selected_size: item.selectedSize || null,
        image_url: item.imageUrl || null,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsToInsert);

      if (itemsError) {
        console.warn("Supabase order items notice:", itemsError.message);
      }
    }

    return { success: true, data: orderData };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

function mapRowToProduct(p: any): Product {
  const price = Number(p.price);
  const discountPrice = p.discount_price ? Number(p.discount_price) : undefined;
  const originalPrice = p.original_price ? Number(p.original_price) : (discountPrice ? price : price);
  const effectivePrice = discountPrice ? discountPrice : price;
  
  // Calculate discount percent
  let discountPercent = p.discount_percent ?? undefined;
  if (!discountPercent && discountPrice && discountPrice < price) {
    discountPercent = Math.round(((price - discountPrice) / price) * 100);
  }

  const inStock = p.in_stock !== false;
  const isPublished = p.is_published !== false;

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle || p.description?.slice(0, 75) || "",
    category: p.category as Product["category"],
    price: effectivePrice,
    originalPrice: discountPrice ? price : originalPrice,
    discountPrice,
    discountPercent,
    material: p.material || "18K Gold Vermeil",
    purity: p.purity || "",
    rating: Number(p.rating || 4.8),
    reviewsCount: p.reviews_count || 12,
    stock: inStock ? (p.stock || 10) : 0,
    inStock,
    isPublished,
    isBestseller: Boolean(p.is_bestseller),
    isNewArrival: Boolean(p.is_new_arrival),
    isFeatured: Boolean(p.is_featured),
    occasion: (p.occasion as Product["occasion"]) || "Everyday",
    images: Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"],
    description: p.description || "",
    details: (p.details as Product["details"]) || {},
    sizes: p.sizes || [],
    tags: p.tags || [],
  };
}

/**
 * Fetch published products for public store visitors.
 * Falls back to static PRODUCTS if Supabase has no data or table is not ready.
 */
export async function getPublishedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return PRODUCTS;
    }

    return data.map(mapRowToProduct);
  } catch {
    return PRODUCTS;
  }
}

/**
 * Legacy alias
 */
export const getCatalogProducts = getPublishedProducts;

/**
 * Fetch single product by slug from Supabase, with static fallback
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (data && !error) {
      return mapRowToProduct(data);
    }
  } catch (err) {
    console.warn("Notice checking product by slug:", err);
  }

  const staticMatch = PRODUCTS.find((p) => p.slug === slug);
  return staticMatch || null;
}

/**
 * ADMIN: Fetch all products (including drafts and unpublished)
 */
export async function getAllProductsAdmin(): Promise<any[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin products:", error.message);
    throw new Error(error.message);
  }

  return data || [];
}

/**
 * Helper to generate a URL-safe unique slug
 */
export function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${base || "product"}-${randomSuffix}`;
}

/**
 * ADMIN: Create new product
 */
export async function createProduct(input: AdminProductInput) {
  const slug = generateSlug(input.name);
  const id = `hbw-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;

  const { data, error } = await supabase
    .from("products")
    .insert({
      id,
      slug,
      name: input.name.trim(),
      subtitle: input.subtitle?.trim() || input.description.slice(0, 80),
      description: input.description.trim(),
      price: Number(input.price),
      discount_price: input.discount_price ? Number(input.discount_price) : null,
      original_price: input.discount_price ? Number(input.price) : null,
      category: input.category,
      material: input.material?.trim() || "18K Gold Vermeil",
      images: input.images,
      in_stock: input.in_stock,
      is_published: input.is_published,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * ADMIN: Update existing product
 */
export async function updateProduct(id: string, input: Partial<AdminProductInput>) {
  const updatePayload: any = {
    updated_at: new Date().toISOString(),
  };

  if (input.name !== undefined) updatePayload.name = input.name.trim();
  if (input.description !== undefined) updatePayload.description = input.description.trim();
  if (input.subtitle !== undefined) updatePayload.subtitle = input.subtitle.trim();
  if (input.price !== undefined) updatePayload.price = Number(input.price);
  if (input.discount_price !== undefined) {
    updatePayload.discount_price = input.discount_price ? Number(input.discount_price) : null;
    if (input.price !== undefined) {
      updatePayload.original_price = input.discount_price ? Number(input.price) : null;
    }
  }
  if (input.category !== undefined) updatePayload.category = input.category;
  if (input.material !== undefined) updatePayload.material = input.material.trim();
  if (input.images !== undefined) updatePayload.images = input.images;
  if (input.in_stock !== undefined) updatePayload.in_stock = input.in_stock;
  if (input.is_published !== undefined) updatePayload.is_published = input.is_published;

  const { data, error } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * ADMIN: Delete product
 */
export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return true;
}

/**
 * ADMIN: Quick toggle stock status
 */
export async function toggleProductStock(id: string, inStock: boolean) {
  const { data, error } = await supabase
    .from("products")
    .update({ in_stock: inStock, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * ADMIN: Quick toggle publish status
 */
export async function toggleProductPublish(id: string, isPublished: boolean) {
  const { data, error } = await supabase
    .from("products")
    .update({ is_published: isPublished, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
