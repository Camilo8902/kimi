/**
 * Payment Service - Stripe Integration
 * Handles all payment-related operations
 */

import { supabase } from '@/lib/supabase';

// Stripe payment intent response
export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

// Payment method types
export type PaymentMethodType = 'card' | 'oxxo' | 'spei';

// Payment status
export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'canceled'
  | 'refunded';

// Payment record from database
export interface PaymentRecord {
  id: string;
  order_id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method: PaymentMethodType;
  stripe_payment_intent_id: string | null;
  stripe_charge_id: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Create a payment intent for an order
 * This would typically call a Supabase Edge Function that communicates with Stripe
 */
export async function createPaymentIntent(
  orderId: string,
  amount: number,
  currency: string = 'mxn'
): Promise<PaymentIntentResponse> {
  try {
    // In production, this would call a Supabase Edge Function
    // that creates a Stripe PaymentIntent with the correct amount
    
    // For now, we'll simulate the response
    // In production: const { data, error } = await supabase.functions.invoke('create-payment-intent', { body: { orderId, amount, currency } });
    
    // Simulated response for development
    const mockClientSecret = `pi_${Math.random().toString(36).substring(2, 15)}_secret_${Math.random().toString(36).substring(2, 15)}`;
    const mockPaymentIntentId = `pi_${Math.random().toString(36).substring(2, 15)}`;
    
    // Create a payment record in the database
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      await supabase
        .from('payments')
        .insert({
          order_id: orderId,
          user_id: user.id,
          amount: amount,
          currency: currency,
          status: 'pending',
          payment_method: 'card',
          stripe_payment_intent_id: mockPaymentIntentId,
        } as any);
    }
    
    return {
      clientSecret: mockClientSecret,
      paymentIntentId: mockPaymentIntentId,
      amount: amount,
      currency: currency,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('No se pudo procesar el pago. Inténtalo de nuevo.');
  }
}

/**
 * Confirm a payment after successful Stripe confirmation
 */
export async function confirmPayment(
  paymentIntentId: string,
  orderId: string
): Promise<{ success: boolean; payment?: PaymentRecord }> {
  try {
    // In production, this would verify the payment with Stripe
    // and update the database accordingly
    
    // @ts-ignore
    const { data, error } = await supabase
      .from('payments')
      .update({
        status: 'succeeded',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_payment_intent_id', paymentIntentId)
      .select()
      .single();
    
    if (error) {
      console.error('Error confirming payment:', error);
      return { success: false };
    }
    
    // Update the order status
    // @ts-ignore
    await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'processing',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);
    
    return { success: true, payment: data };
  } catch (error) {
    console.error('Error confirming payment:', error);
    return { success: false };
  }
}

/**
 * Handle failed payment
 */
export async function handleFailedPayment(
  paymentIntentId: string,
  orderId: string
): Promise<void> {
  try {
    // @ts-ignore
    await supabase
      .from('payments')
      .update({
        status: 'failed',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_payment_intent_id', paymentIntentId);
    
    // @ts-ignore
    await supabase
      .from('orders')
      .update({
        payment_status: 'failed',
        status: 'pending_payment',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

/**
 * Process a refund
 */
export async function processRefund(
  orderId: string,
  amount?: number,
  _reason?: string
): Promise<{ success: boolean; refundId?: string }> {
  try {
    // Get the payment for this order
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId)
      .eq('status', 'succeeded')
      .single();
    
    if (paymentError || !payment) {
      throw new Error('No se encontró el pago para este pedido');
    }
    
    // In production, this would call Stripe API to process refund
    // const refund = await stripe.refunds.create({
    //   payment_intent: payment.stripe_payment_intent_id,
    //   amount: amount ? Math.round(amount * 100) : undefined,
    //   reason: 'requested_by_customer',
    // });
    
    // Update payment status
    // @ts-ignore
    await supabase
      .from('payments')
      .update({
        status: amount && amount < (payment as any).amount ? 'partially_refunded' : 'refunded',
        updated_at: new Date().toISOString(),
      })
      .eq('id', (payment as any).id);
    
    // Update order status
    // @ts-ignore
    await supabase
      .from('orders')
      .update({
        payment_status: amount && amount < (payment as any).amount ? 'partially_refunded' : 'refunded',
        status: 'refunded',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);
    
    return { success: true, refundId: `re_${Math.random().toString(36).substring(2, 15)}` };
  } catch (error) {
    console.error('Error processing refund:', error);
    throw error;
  }
}

/**
 * Get payment history for a user
 */
export async function getUserPaymentHistory(userId: string): Promise<PaymentRecord[]> {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        orders (
          id,
          order_number,
          total
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }
}

/**
 * Get payment details for an order
 */
export async function getPaymentByOrderId(orderId: string): Promise<PaymentRecord | null> {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId)
      .single();
    
    if (error) {
      console.error('Error fetching payment:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    return null;
  }
}

/**
 * Calculate platform fee and seller payout
 */
export function calculateFees(
  totalAmount: number,
  commissionRate: number = 0.10 // 10% default commission
): {
  platformFee: number;
  sellerPayout: number;
  processingFee: number;
} {
  // Stripe processing fee (Mexico): 3.5% + $3 MXN
  const processingFee = Math.round((totalAmount * 0.035 + 3) * 100) / 100;
  
  // Platform commission
  const platformFee = Math.round(totalAmount * commissionRate * 100) / 100;
  
  // Seller receives: total - processing fee - platform fee
  const sellerPayout = Math.round((totalAmount - processingFee - platformFee) * 100) / 100;
  
  return {
    platformFee,
    sellerPayout,
    processingFee,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
