import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';

export interface Notification {
  id: string;
  type: 'order' | 'payment' | 'shipment' | 'review' | 'product' | 'promotion' | 'system';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isSupported: boolean;
  permission: NotificationPermission;
  requestPermission: () => Promise<boolean>;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  sendLocalNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
}

// Check if browser supports notifications
const isBrowserSupported = () => {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
};

export function useNotifications(): UseNotificationsReturn {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported] = useState(() => isBrowserSupported());

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse notifications:', e);
      }
    }

    // Check current permission
    if (isSupported) {
      setPermission(Notification.permission);
    }
  }, [isSupported]);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported]);

  // Subscribe to push notifications
  const subscribe = useCallback(async () => {
    if (!isSupported || permission !== 'granted') return;

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Check if already subscribed
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log('Already subscribed to push notifications');
        return;
      }

      // Subscribe
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY || ''
        ) as BufferSource,
      });

      // Send subscription to server
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription,
          userId: user?.id,
        }),
      });

      console.log('Subscribed to push notifications');
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
    }
  }, [isSupported, permission, user?.id]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async () => {
    if (!isSupported) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        
        // Notify server
        await fetch('/api/notifications/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.id }),
        });

        console.log('Unsubscribed from push notifications');
      }
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
    }
  }, [isSupported, user?.id]);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  // Delete notification
  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Send local notification
  const sendLocalNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Show browser notification if permitted
      if (permission === 'granted' && isSupported) {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png',
          tag: newNotification.id,
          data: notification.data,
        });
      }
    },
    [permission, isSupported]
  );

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    isSupported,
    permission,
    requestPermission,
    subscribe,
    unsubscribe,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendLocalNotification,
  };
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
