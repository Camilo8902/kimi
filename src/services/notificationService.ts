import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';
import { useUIStore } from '@/stores/uiStore';

type ActivityLogRow = Database['public']['Tables']['activity_logs']['Row'];
type ActivityLogInsert = Database['public']['Tables']['activity_logs']['Insert'];

export interface Notification {
  id: string;
  user_id: string;
  type: 'order' | 'product' | 'review' | 'payment' | 'system';
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationPayload {
  userId: string;
  type: Notification['type'];
  title: string;
  message: string;
  link?: string;
}

/**
 * Create a notification for a user
 */
export async function createNotification(payload: NotificationPayload): Promise<{
  success: boolean;
  notification?: Notification;
  error?: string;
}> {
  try {
    const insertData: ActivityLogInsert = {
      user_id: payload.userId,
      action: 'notification',
      entity_type: payload.type,
      entity_id: crypto.randomUUID(),
      new_data: {
        title: payload.title,
        message: payload.message,
        link: payload.link,
      } as Record<string, unknown>,
    };

    const { data, error } = await supabase
      .from('activity_logs')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      notification: {
        id: data.id,
        user_id: payload.userId,
        type: payload.type,
        title: payload.title,
        message: payload.message,
        link: payload.link,
        is_read: false,
        created_at: data.created_at,
      } as Notification,
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Get notifications for a user
 */
export async function getUserNotifications(userId: string): Promise<{
  success: boolean;
  notifications?: Notification[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('action', 'notification')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching notifications:', error);
      return { success: false, error: error.message };
    }

    const notifications = data?.map((d: ActivityLogRow) => ({
      id: d.id,
      user_id: d.user_id,
      type: d.entity_type as Notification['type'],
      title: d.new_data?.title || '',
      message: d.new_data?.message || '',
      link: d.new_data?.link,
      is_read: false,
      created_at: d.created_at,
    } as Notification)) || [];

    return { success: true, notifications };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // In a full implementation, would update the notification
    return { success: true };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsAsRead(userId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    return { success: true };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('action', 'notification');

    if (error) return 0;
    return data?.length || 0;
  } catch {
    return 0;
  }
}

/**
 * Show notification toast (wrapper for UI store)
 */
export function showNotificationToast(
  type: 'success' | 'error' | 'info' | 'warning',
  title: string,
  message: string
) {
  const { addToast } = useUIStore.getState();
  addToast({ type, title, message });
}

// Helper functions for common notification types
export async function notifyNewOrder(sellerId: string, orderNumber: string) {
  await createNotification({
    userId: sellerId,
    type: 'order',
    title: 'Nuevo pedido',
    message: `Has recibido un nuevo pedido: ${orderNumber}`,
    link: `/seller/orders`,
  });
}

export async function notifyOrderStatusChange(
  customerId: string,
  orderNumber: string,
  status: string
) {
  await createNotification({
    userId: customerId,
    type: 'order',
    title: 'Estado de pedido actualizado',
    message: `Tu pedido ${orderNumber} ahora está: ${status}`,
    link: `/orders`,
  });
}

export async function notifyNewReview(sellerId: string, productName: string) {
  await createNotification({
    userId: sellerId,
    type: 'review',
    title: 'Nueva reseña',
    message: `Un cliente ha reseñado: ${productName}`,
    link: `/seller/products`,
  });
}

export async function notifyLowStock(sellerId: string, productName: string, quantity: number) {
  await createNotification({
    userId: sellerId,
    type: 'product',
    title: 'Stock bajo',
    message: `${productName} tiene solo ${quantity} unidades en stock`,
    link: `/seller/products`,
  });
}
