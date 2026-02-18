export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export type UserRole = 
  | 'super_admin' 
  | 'company_admin' 
  | 'product_manager' 
  | 'inventory_manager' 
  | 'support_agent' 
  | 'marketing_manager' 
  | 'customer';

export interface Company {
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
  website?: string;
  status: CompanyStatus;
  plan: CompanyPlan;
  commission_rate: number;
  rating: number;
  total_sales: number;
  owner_id?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export type CompanyStatus = 'pending' | 'verified' | 'suspended' | 'inactive' | 'rejected';
export type CompanyPlan = 'basic' | 'premium' | 'enterprise';

export interface CompanyMember {
  id: string;
  company_id: string;
  user_id: string;
  role: CompanyRole;
  permissions: string[];
  joined_at: string;
}

export type CompanyRole = 
  | 'owner' 
  | 'admin' 
  | 'manager' 
  | 'staff';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: string;
  gradient_from: string;
  gradient_to: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  product_count: number;
  created_at: string;
}

export interface Product {
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
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  status: ProductStatus;
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
  company?: Company;
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
  attributes?: ProductAttribute[];
}

export type ProductStatus = 'draft' | 'active' | 'out_of_stock' | 'discontinued';

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt?: string;
  position: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  price: number;
  compare_at_price?: number;
  quantity: number;
  options: Record<string, string>;
  image_url?: string;
}

export interface ProductAttribute {
  id: string;
  product_id: string;
  name: string;
  value: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  product: Product;
  variant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  shipping_status: ShippingStatus;
  currency: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  notes?: string;
  customer_notes?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
  customer?: User;
  items?: OrderItem[];
  shipping_address?: Address;
  billing_address?: Address;
  payments?: Payment[];
  shipments?: Shipment[];
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
export type ShippingStatus = 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'returned';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  product_name: string;
  variant_name?: string;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: Product;
}

export interface Address {
  id: string;
  user_id?: string;
  type: 'shipping' | 'billing';
  first_name: string;
  last_name: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  phone?: string;
  is_default: boolean;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transaction_id?: string;
  gateway_response?: Record<string, any>;
  paid_at?: string;
  created_at: string;
}

export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';

export interface Shipment {
  id: string;
  order_id: string;
  carrier: string;
  tracking_number?: string;
  tracking_url?: string;
  status: ShippingStatus;
  shipped_at?: string;
  delivered_at?: string;
  estimated_delivery?: string;
  shipping_cost: number;
  weight?: number;
  dimensions?: string;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  order_id?: string;
  rating: number;
  title?: string;
  content?: string;
  is_verified: boolean;
  is_approved: boolean;
  helpful_count: number;
  images?: string[];
  created_at: string;
  updated_at: string;
  customer?: User;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  min_purchase?: number;
  max_discount?: number;
  usage_limit?: number;
  usage_count: number;
  start_date?: string;
  end_date?: string;
  applies_to: 'all' | 'categories' | 'products';
  category_ids?: string[];
  product_ids?: string[];
  is_active: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  is_read: boolean;
  created_at: string;
}

export type NotificationType = 
  | 'order' 
  | 'payment' 
  | 'shipment' 
  | 'review' 
  | 'product' 
  | 'promotion' 
  | 'system';

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  salesChange: number;
  ordersChange: number;
  customersChange: number;
  productsChange: number;
  recentOrders: Order[];
  topProducts: Product[];
  salesChart: { date: string; amount: number }[];
}

export interface CompanyDashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  pendingOrders: number;
  lowStockProducts: number;
  commissionDue: number;
  salesChange: number;
  ordersChange: number;
  recentOrders: Order[];
  topProducts: Product[];
}
