export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          avatar_url?: string;
          role: string;
          phone?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string;
          last_name?: string;
          avatar_url?: string;
          role?: string;
          phone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Record<string, unknown>;
      };
      companies: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description?: string;
          logo_url?: string;
          banner_url?: string;
          email: string;
          phone?: string;
          address?: string;
          city?: string;
          country?: string;
          tax_id?: string;
          status: string;
          plan: string;
          commission_rate: number;
          verified_at?: string;
          stripe_connect_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string;
          logo_url?: string;
          banner_url?: string;
          email: string;
          phone?: string;
          address?: string;
          city?: string;
          country?: string;
          tax_id?: string;
          status?: string;
          plan?: string;
          commission_rate?: number;
          verified_at?: string;
          stripe_connect_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          logo_url?: string;
          banner_url?: string;
          email?: string;
          phone?: string;
          address?: string;
          city?: string;
          country?: string;
          tax_id?: string;
          status?: string;
          plan?: string;
          commission_rate?: number;
          verified_at?: string;
          stripe_connect_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          company_id: string;
          category_id: string;
          name: string;
          slug: string;
          description: string;
          short_description?: string;
          sku: string;
          price: number;
          compare_at_price?: number;
          cost_price?: number;
          quantity: number;
          min_quantity: number;
          weight?: number;
          dimensions?: Record<string, number>;
          status: string;
          featured: boolean;
          tags: string[];
          meta_title?: string;
          meta_description?: string;
          rating_average: number;
          rating_count: number;
          sales_count: number;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          category_id: string;
          name: string;
          slug: string;
          description: string;
          short_description?: string;
          sku: string;
          price: number;
          compare_at_price?: number;
          cost_price?: number;
          quantity?: number;
          min_quantity?: number;
          weight?: number;
          dimensions?: Record<string, number>;
          status?: string;
          featured?: boolean;
          tags?: string[];
          meta_title?: string;
          meta_description?: string;
          rating_average?: number;
          rating_count?: number;
          sales_count?: number;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          category_id?: string;
          name?: string;
          slug?: string;
          description?: string;
          short_description?: string;
          sku?: string;
          price?: number;
          compare_at_price?: number;
          cost_price?: number;
          quantity?: number;
          min_quantity?: number;
          weight?: number;
          dimensions?: Record<string, number>;
          status?: string;
          featured?: boolean;
          tags?: string[];
          meta_title?: string;
          meta_description?: string;
          rating_average?: number;
          rating_count?: number;
          sales_count?: number;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string;
          company_id?: string;
          status: string;
          payment_status: string;
          payment_method?: string;
          shipping_status: string;
          currency: string;
          subtotal: number;
          shipping_cost: number;
          tax_amount: number;
          discount_amount: number;
          total_amount: number;
          shipping_address?: Record<string, unknown>;
          billing_address?: Record<string, unknown>;
          notes?: string;
          customer_notes?: string;
          internal_notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id: string;
          company_id?: string;
          status?: string;
          payment_status?: string;
          payment_method?: string;
          shipping_status?: string;
          currency?: string;
          subtotal: number;
          shipping_cost?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount: number;
          shipping_address?: Record<string, unknown>;
          billing_address?: Record<string, unknown>;
          notes?: string;
          customer_notes?: string;
          internal_notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string;
          company_id?: string;
          status?: string;
          payment_status?: string;
          payment_method?: string;
          shipping_status?: string;
          currency?: string;
          subtotal?: number;
          shipping_cost?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount?: number;
          shipping_address?: Record<string, unknown>;
          billing_address?: Record<string, unknown>;
          notes?: string;
          customer_notes?: string;
          internal_notes?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          order_id?: string;
          rating: number;
          title?: string;
          content?: string;
          is_verified_purchase: boolean;
          is_approved: boolean;
          helpful_count: number;
          images: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          order_id?: string;
          rating: number;
          title?: string;
          content?: string;
          is_verified_purchase?: boolean;
          is_approved?: boolean;
          helpful_count?: number;
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          order_id?: string;
          rating?: number;
          title?: string;
          content?: string;
          is_verified_purchase?: boolean;
          is_approved?: boolean;
          helpful_count?: number;
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          old_data?: Record<string, unknown>;
          new_data?: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          old_data?: Record<string, unknown>;
          new_data?: Record<string, unknown>;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          entity_type?: string;
          entity_id?: string;
          old_data?: Record<string, unknown>;
          new_data?: Record<string, unknown>;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          order_id: string;
          user_id: string;
          amount: number;
          currency: string;
          status: string;
          payment_method: string;
          stripe_payment_intent_id: string | null;
          stripe_charge_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          user_id: string;
          amount: number;
          currency?: string;
          status?: string;
          payment_method?: string;
          stripe_payment_intent_id?: string | null;
          stripe_charge_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          user_id?: string;
          amount?: number;
          currency?: string;
          status?: string;
          payment_method?: string;
          stripe_payment_intent_id?: string | null;
          stripe_charge_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      update_company_status: {
        Args: {
          company_id: string;
          new_status: string;
        };
        Returns: void;
      };
      update_company_commission: {
        Args: {
          company_id: string;
          new_commission_rate: number;
        };
        Returns: void;
      };
      update_user_role: {
        Args: {
          user_id: string;
          new_role: string;
        };
        Returns: void;
      };
      update_user_status: {
        Args: {
          user_id: string;
          new_status: string;
        };
        Returns: void;
      };
    };
    Enums: {
      user_role: 'super_admin' | 'company_admin' | 'product_manager' | 'inventory_manager' | 'support_agent' | 'marketing_manager' | 'customer';
      company_status: 'pending' | 'verified' | 'suspended' | 'inactive';
      company_plan: 'basic' | 'premium' | 'enterprise';
      product_status: 'draft' | 'active' | 'out_of_stock' | 'discontinued';
      order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
      payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
      shipping_status: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'returned';
    };
  };
}
