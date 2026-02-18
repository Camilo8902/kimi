import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type ActivityLogRow = Database['public']['Tables']['activity_logs']['Row'];

type MessageRow = Database['public']['Tables']['activity_logs']['Row'];

export interface Message {
  id: string;
  order_id: string;
  sender_id: string;
  sender_type: 'customer' | 'seller' | 'admin';
  recipient_id: string;
  recipient_type: 'customer' | 'seller' | 'admin';
  subject: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface MessageThread {
  order_id: string;
  order_number: string;
  customer_id: string;
  customer_name: string;
  seller_id: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

/**
 * Send a message from seller to customer (or vice versa)
 */
export async function sendMessage(
  orderId: string,
  senderId: string,
  senderType: 'customer' | 'seller' | 'admin',
  recipientId: string,
  recipientType: 'customer' | 'seller' | 'admin',
  subject: string,
  content: string
): Promise<{
  success: boolean;
  message?: Message;
  error?: string;
}> {
  try {
    // For now, store in activity_logs - in production, use a dedicated messages table
    const { data, error } = await supabase
      .from('activity_logs')
      .insert({
        user_id: senderId,
        action: 'message',
        entity_type: 'order',
        entity_id: orderId,
        new_data: {
          sender_type: senderType,
          recipient_type: recipientType,
          recipient_id: recipientId,
          subject,
          content,
        },
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: {
        id: data.id,
        order_id: orderId,
        sender_id: senderId,
        sender_type: senderType,
        recipient_id: recipientId,
        recipient_type: recipientType,
        subject,
        content,
        is_read: false,
        created_at: data.created_at,
      } as Message,
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado al enviar mensaje' };
  }
}

/**
 * Get messages for an order
 */
export async function getOrderMessages(orderId: string): Promise<{
  success: boolean;
  messages?: Message[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('entity_id', orderId)
      .eq('action', 'message')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return { success: false, error: error.message };
    }

    const messages = data?.map((d: ActivityLogRow) => ({
      id: d.id,
      order_id: d.entity_id,
      sender_id: d.user_id,
      sender_type: d.new_data?.sender_type || 'customer',
      recipient_id: d.new_data?.recipient_id || '',
      recipient_type: d.new_data?.recipient_type || 'customer',
      subject: d.new_data?.subject || '',
      content: d.new_data?.content || '',
      is_read: false,
      created_at: d.created_at,
    } as Message)) || [];

    return { success: true, messages };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Get message threads for a seller
 */
export async function getSellerMessageThreads(sellerId: string): Promise<{
  success: boolean;
  threads?: MessageThread[];
  error?: string;
}> {
  try {
    // Get all messages from activity_logs for this seller's orders
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('action', 'message')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching threads:', error);
      return { success: false, error: error.message };
    }

    // Group by order and get latest message per thread
    const threadsMap = new Map<string, MessageThread>();
    
    data?.forEach((log: ActivityLogRow) => {
      const orderId = log.entity_id;
      if (!threadsMap.has(orderId)) {
        threadsMap.set(orderId, {
          order_id: orderId,
          order_number: `#ORD-${orderId.substring(0, 8).toUpperCase()}`,
          customer_id: '',
          customer_name: 'Cliente',
          seller_id: sellerId,
          last_message: String(log.new_data?.content || ''),
          last_message_at: log.created_at,
          unread_count: 0,
        });
      }
    });

    const threads = Array.from(threadsMap.values());
    return { success: true, threads };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(messageId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // For now, messages are stored as read: false initially
    // In production, would update a messages table
    return { success: true };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Get unread message count for user
 */
export async function getUnreadMessageCount(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('id')
      .eq('action', 'message')
      .ilike('new_data->recipient_id', `%${userId}%`);

    if (error) return 0;
    return data?.length || 0;
  } catch {
    return 0;
  }
}
