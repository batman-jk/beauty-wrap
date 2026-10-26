export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          subtitle: string;
          category: string;
          price: number;
          original_price: number | null;
          discount_percent: number | null;
          material: string;
          purity: string | null;
          rating: number;
          reviews_count: number;
          stock: number;
          is_bestseller: boolean;
          is_new_arrival: boolean;
          is_featured: boolean;
          occasion: string | null;
          images: string[];
          description: string;
          details: Json;
          sizes: string[];
          tags: string[];
          created_at: string;
        };
        Insert: {
          id: string;
          slug: string;
          name: string;
          subtitle: string;
          category: string;
          price: number;
          original_price?: number | null;
          discount_percent?: number | null;
          material: string;
          purity?: string | null;
          rating?: number;
          reviews_count?: number;
          stock?: number;
          is_bestseller?: boolean;
          is_new_arrival?: boolean;
          is_featured?: boolean;
          occasion?: string | null;
          images: string[];
          description: string;
          details?: Json;
          sizes?: string[];
          tags?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          subtitle?: string;
          category?: string;
          price?: number;
          original_price?: number | null;
          discount_percent?: number | null;
          material?: string;
          purity?: string | null;
          rating?: number;
          reviews_count?: number;
          stock?: number;
          is_bestseller?: boolean;
          is_new_arrival?: boolean;
          is_featured?: boolean;
          occasion?: string | null;
          images?: string[];
          description?: string;
          details?: Json;
          sizes?: string[];
          tags?: string[];
          created_at?: string;
        };
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_name: string;
          customer_email: string;
          phone: string;
          address: string;
          city: string;
          state: string;
          pincode: string;
          payment_method: string;
          subtotal: number;
          discount_amount: number;
          shipping_fee: number;
          grand_total: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_name: string;
          customer_email: string;
          phone: string;
          address: string;
          city: string;
          state: string;
          pincode: string;
          payment_method: string;
          subtotal: number;
          discount_amount?: number;
          shipping_fee?: number;
          grand_total: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_name?: string;
          customer_email?: string;
          phone?: string;
          address?: string;
          city?: string;
          state?: string;
          pincode?: string;
          payment_method?: string;
          subtotal?: number;
          discount_amount?: number;
          shipping_fee?: number;
          grand_total?: number;
          status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          price: number;
          quantity: number;
          selected_size: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          price: number;
          quantity: number;
          selected_size?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          price?: number;
          quantity?: number;
          selected_size?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
