/**
 * Stripe Connect Service
 * Handles connected accounts for seller payouts
 */

import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type ActivityLogRow = Database['public']['Tables']['activity_logs']['Row'];
type CompanyRow = Database['public']['Tables']['companies']['Row'];

/**
 * Create a Stripe Connect account link for onboarding a seller
 */
export async function createConnectAccountLink(
  companyId: string,
  refreshUrl: string,
  returnUrl: string
): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    // In production, this would call a Supabase Edge Function
    // that uses Stripe API to create the account link
    
    // Mock response for development
    const mockUrl = `https://connect.stripe.com/setup/s/${Math.random().toString(36).substring(7)}`;

    // Store the connect account ID in the company record
    await supabase
      .from('companies')
      .update({
        // In production: stripe_connect_id: accountId
        updated_at: new Date().toISOString(),
      })
      .eq('id', companyId);

    return { success: true, url: mockUrl };
  } catch (error) {
    console.error('Error creating account link:', error);
    return { success: false, error: 'Error al crear cuenta de pagos' };
  }
}

/**
 * Get the connected account status for a company
 */
export async function getConnectAccountStatus(
  companyId: string
): Promise<{
  success: boolean;
  status?: {
    isConnected: boolean;
    payoutsEnabled: boolean;
    detailsSubmitted: boolean;
    chargesEnabled: boolean;
  };
  error?: string;
}> {
  try {
    const { data: company, error } = await supabase
      .from('companies')
      .select('stripe_connect_id')
      .eq('id', companyId)
      .single();

    if (error || !company) {
      return { success: false, error: 'Empresa no encontrada' };
    }

    // In production, would check Stripe API for actual status
    const isConnected = !!company.stripe_connect_id;

    return {
      success: true,
      status: {
        isConnected,
        payoutsEnabled: isConnected,
        detailsSubmitted: isConnected,
        chargesEnabled: isConnected,
      },
    };
  } catch (error) {
    console.error('Error getting account status:', error);
    return { success: false, error: 'Error al obtener estado de cuenta' };
  }
}

/**
 * Create a transfer to a seller's connected account
 */
export async function createTransfer(
  companyId: string,
  amount: number,
  currency: string = 'mxn',
  description?: string
): Promise<{
  success: boolean;
  transferId?: string;
  error?: string;
}> {
  try {
    // In production, this would call a Supabase Edge Function
    // that uses Stripe API to create the transfer
    
    // Mock response
    const transferId = `tr_${Math.random().toString(36).substring(2, 15)}`;

    // Log the transfer in database
    await supabase
      .from('activity_logs')
      .insert({
        user_id: companyId,
        action: 'payout',
        entity_type: 'company',
        entity_id: companyId,
        new_data: {
          amount,
          currency,
          description,
          transfer_id: transferId,
        },
      });

    return { success: true, transferId };
  } catch (error) {
    console.error('Error creating transfer:', error);
    return { success: false, error: 'Error al crear transferencia' };
  }
}

/**
 * Get payout history for a company
 */
export async function getPayoutHistory(
  companyId: string
): Promise<{
  success: boolean;
  payouts?: Array<{
    id: string;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
  }>;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', companyId)
      .eq('action', 'payout')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching payouts:', error);
      return { success: false, error: error.message };
    }

    const payouts = data?.map((log: ActivityLogRow) => ({
      id: log.id,
      amount: log.new_data?.amount || 0,
      currency: log.new_data?.currency || 'mxn',
      status: 'paid',
      created_at: log.created_at,
    })) || [];

    return { success: true, payouts };
  } catch (error) {
    console.error('Error fetching payouts:', error);
    return { success: false, error: 'Error al obtener historial' };
  }
}

/**
 * Calculate payout amount after fees
 */
export function calculatePayout(
  saleAmount: number,
  commissionRate: number = 0.10
): {
  grossAmount: number;
  commission: number;
  processingFee: number;
  netPayout: number;
} {
  // Stripe processing fee (Mexico): 3.5% + $3 MXN
  const processingFee = Math.round((saleAmount * 0.035 + 3) * 100) / 100;
  
  // Platform commission
  const commission = Math.round(saleAmount * commissionRate * 100) / 100;
  
  // Net payout to seller
  const netPayout = Math.round((saleAmount - processingFee - commission) * 100) / 100;

  return {
    grossAmount: saleAmount,
    commission,
    processingFee,
    netPayout,
  };
}

/**
 * Webhook handler for Stripe events
 */
export async function handleStripeWebhook(
  eventType: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  try {
    switch (eventType) {
      case 'account.updated':
        // Update company stripe Connect status
        console.log('Account updated:', data);
        break;

      case 'transfer.created':
        // Log transfer creation
        console.log('Transfer created:', data);
        break;

      case 'transfer.failed':
        // Handle failed transfer
        console.log('Transfer failed:', data);
        break;

      case 'payment_intent.succeeded':
        // Update order status to paid
        console.log('Payment succeeded:', data);
        break;

      case 'payment_intent.payment_failed':
        // Handle failed payment
        console.log('Payment failed:', data);
        break;

      default:
        console.log('Unhandled event type:', eventType);
    }

    return { success: true };
  } catch (error) {
    console.error('Error handling webhook:', error);
    return { success: false, error: 'Error al procesar webhook' };
  }
}
