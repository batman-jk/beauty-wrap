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

/**
 * Fetch products with fallback to local static PRODUCTS catalog
 */
export async function getCatalogProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return PRODUCTS;
    }

    return data.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      subtitle: p.subtitle,
      category: p.category as Product["category"],
      price: Number(p.price),
      originalPrice: p.original_price ? Number(p.original_price) : Number(p.price),
      discountPercent: p.discount_percent ?? undefined,
      material: p.material,
      purity: p.purity || "",
      rating: Number(p.rating),
      reviewsCount: p.reviews_count,
      stock: p.stock,
      isBestseller: p.is_bestseller,
      isNewArrival: p.is_new_arrival,
      isFeatured: p.is_featured,
      occasion: (p.occasion as Product["occasion"]) || "Everyday",
      images: p.images || [],
      description: p.description,
      details: (p.details as Product["details"]) || {},
      sizes: p.sizes || [],
      tags: p.tags || [],
    }));
  } catch {
    return PRODUCTS;
  }
}
