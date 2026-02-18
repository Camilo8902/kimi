import { supabase } from '@/lib/supabase';
import type { CartItem } from '@/types';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderCreateInput {
  user_id: string;
  items: CartItem[];
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  payment_method: string;
  subtotal: number;
  tax_amount: number;
  shipping_cost: number;
  discount_amount: number;
  total_amount: number;
  notes?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  company_id?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method?: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  shipping_status: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'returned';
  shipping_address: Record<string, unknown>;
  billing_address?: Record<string, unknown>;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  notes?: string;
  customer_notes?: string;
  tracking_number?: string;
  shipped_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  variant_id?: string;
  product_name: string;
  variant_name?: string;
  sku?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_url?: string;
  created_at: string;
}

/**
 * Generate a unique order number
 */
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

/**
 * Create a new order in Supabase
 */
export async function createOrder(input: OrderCreateInput): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const orderNumber = generateOrderNumber();
    
    // Prepare shipping address as JSONB
    const shippingAddressJson = {
      first_name: input.shipping_address.firstName,
      last_name: input.shipping_address.lastName,
      email: input.shipping_address.email,
      phone: input.shipping_address.phone,
      address_line1: input.shipping_address.address,
      city: input.shipping_address.city,
      state: input.shipping_address.state,
      postal_code: input.shipping_address.postalCode,
      country: input.shipping_address.country,
    };

    // Get the first item's company_id for the order (simplified - in real app might need multi-vendor orders)
    const companyId = input.items[0]?.product?.company_id || null;

    // Create the order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: input.user_id,
        company_id: companyId,
        status: 'pending',
        payment_status: 'pending',
        payment_method: input.payment_method === 'card' ? 'credit_card' : 'cash_on_delivery',
        shipping_status: 'pending',
        shipping_address: shippingAddressJson,
        billing_address: input.billing_address ? {
          first_name: input.billing_address.firstName,
          last_name: input.billing_address.lastName,
          email: input.billing_address.email,
          phone: input.billing_address.phone,
          address_line1: input.billing_address.address,
          city: input.billing_address.city,
          state: input.billing_address.state,
          postal_code: input.billing_address.postalCode,
          country: input.billing_address.country,
        } : shippingAddressJson,
        subtotal: input.subtotal,
        shipping_cost: input.shipping_cost,
        tax_amount: input.tax_amount,
        discount_amount: input.discount_amount,
        total_amount: input.total_amount,
        currency: 'MXN',
        notes: input.notes,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return { success: false, error: orderError.message };
    }

    // Create order items
    const orderItems = input.items.map(item => ({
      order_id: orderData.id,
      product_id: item.product_id,
      variant_id: item.variant_id || null,
      product_name: item.product.name,
      variant_name: item.variant?.name || null,
      sku: item.product.sku || item.variant?.sku || null,
      quantity: item.quantity,
      unit_price: item.variant?.price || item.product.price,
      total_price: (item.variant?.price || item.product.price) * item.quantity,
      image_url: item.product.images?.[0]?.url || item.variant?.image_url || null,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Try to delete the order if items failed
      await supabase.from('orders').delete().eq('id', orderData.id);
      return { success: false, error: itemsError.message };
    }

    // Update product quantities (reduce stock)
    for (const item of input.items) {
      if (item.product_id) {
        // Get current quantity
        const { data: product } = await supabase
          .from('products')
          .select('quantity')
          .eq('id', item.product_id)
          .single();
        
        if (product) {
          const newQuantity = Math.max(0, product.quantity - item.quantity);
          await supabase
            .from('products')
            .update({ quantity: newQuantity })
            .eq('id', item.product_id);
        }
      }
    }

    // Clear user's cart items in database if they exist
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', input.user_id);

    // Fetch the complete order with items
    const { data: completeOrder, error: fetchError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderData.id)
      .single();

    if (fetchError) {
      return { success: true, order: orderData as Order };
    }

    return { success: true, order: completeOrder as Order };
  } catch (error) {
    console.error('Unexpected error creating order:', error);
    return { success: false, error: 'Error inesperado al crear el pedido' };
  }
}

/**
 * Get all orders for a user
 */
export async function getUserOrders(userId: string): Promise<{ success: boolean; orders?: Order[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return { success: false, error: error.message };
    }

    return { success: true, orders: data as Order[] };
  } catch (error) {
    console.error('Unexpected error fetching orders:', error);
    return { success: false, error: 'Error inesperado al obtener los pedidos' };
  }
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId: string, userId: string): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return { success: false, error: error.message };
    }

    return { success: true, order: data as Order };
  } catch (error) {
    console.error('Unexpected error fetching order:', error);
    return { success: false, error: 'Error inesperado al obtener el pedido' };
  }
}

/**
 * Cancel an order
 */
export async function cancelOrder(orderId: string, userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // First check if the order can be cancelled
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('status, order_items(product_id, quantity)')
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      return { success: false, error: 'Pedido no encontrado' };
    }

    if (!['pending', 'processing'].includes(order.status)) {
      return { success: false, error: 'Este pedido no puede ser cancelado' };
    }

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        status: 'cancelled',
        payment_status: 'refunded',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Error cancelling order:', updateError);
      return { success: false, error: updateError.message };
    }

    // Restore product quantities
    for (const item of order.order_items || []) {
      if (item.product_id) {
        const { data: product } = await supabase
          .from('products')
          .select('quantity')
          .eq('id', item.product_id)
          .single();
        
        if (product) {
          await supabase
            .from('products')
            .update({ quantity: product.quantity + item.quantity })
            .eq('id', item.product_id);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error cancelling order:', error);
    return { success: false, error: 'Error inesperado al cancelar el pedido' };
  }
}

/**
 * Get order tracking information
 */
export async function getOrderTracking(orderId: string, userId: string): Promise<{ success: boolean; tracking?: { trackingNumber?: string; status: string; shippedAt?: string; deliveredAt?: string }; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('tracking_number, shipping_status, shipped_at, delivered_at')
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();

    if (error) {
      return { success: false, error: 'Pedido no encontrado' };
    }

    return { 
      success: true, 
      tracking: {
        trackingNumber: data.tracking_number || undefined,
        status: data.shipping_status,
        shippedAt: data.shipped_at || undefined,
        deliveredAt: data.delivered_at || undefined,
      }
    };
  } catch (error) {
    console.error('Unexpected error fetching tracking:', error);
    return { success: false, error: 'Error inesperado al obtener el seguimiento' };
  }
}
