import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type OrderRow = Database['public']['Tables']['orders']['Row'];
type ProductRow = Database['public']['Tables']['products']['Row'];

export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
}

export interface ProductAnalytics {
  productId: string;
  productName: string;
  totalSold: number;
  revenue: number;
  views: number;
  rating: number;
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

/**
 * Get sales analytics for a company
 */
export async function getSalesAnalytics(
  companyId: string,
  startDate?: string,
  endDate?: string
): Promise<{
  success: boolean;
  analytics?: SalesAnalytics;
  error?: string;
}> {
  try {
    let query = supabase
      .from('orders')
      .select('id, total_amount, status, created_at')
      .eq('customer_id', companyId);

    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching analytics:', error);
      return { success: false, error: error.message };
    }

    const completedOrders = data?.filter((o: OrderRow) => o.status === 'delivered' || o.status === 'completed') || [];
    const totalRevenue = completedOrders.reduce((sum: number, o: OrderRow) => sum + (o.total_amount || 0), 0);
    const totalOrders = completedOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      success: true,
      analytics: {
        totalRevenue,
        totalOrders,
        averageOrderValue,
        conversionRate: 3.2, // Mock value - would need tracking
      },
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Get top selling products
 */
export async function getTopProducts(
  companyId: string,
  limit: number = 10
): Promise<{
  success: boolean;
  products?: ProductAnalytics[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, sales_count, rating_average, rating_count, view_count, price')
      .eq('company_id', companyId)
      .order('sales_count', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching top products:', error);
      return { success: false, error: error.message };
    }

    const products = data?.map((p: ProductRow) => ({
      productId: p.id,
      productName: p.name,
      totalSold: p.sales_count || 0,
      revenue: (p.sales_count || 0) * (p.price || 0),
      views: p.view_count || 0,
      rating: p.rating_average || 0,
    })) || [];

    return { success: true, products };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Get sales data by period
 */
export async function getSalesByPeriod(
  companyId: string,
  period: 'day' | 'week' | 'month' = 'week'
): Promise<{
  success: boolean;
  data?: SalesDataPoint[];
  error?: string;
}> {
  try {
    // For now, return mock data since we need date manipulation
    const mockData: SalesDataPoint[] = [];
    const now = new Date();
    
    const days = period === 'day' ? 24 : period === 'week' ? 7 : 30;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      mockData.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.random() * 1000 + 200,
        orders: Math.floor(Math.random() * 20) + 1,
      });
    }

    return { success: true, data: mockData };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Get customer analytics
 */
export async function getCustomerAnalytics(
  companyId: string
): Promise<{
  success: boolean;
  totalCustomers?: number;
  newCustomers?: number;
  repeatCustomers?: number;
  error?: string;
}> {
  try {
    // Mock data for now
    return {
      success: true,
      totalCustomers: 1234,
      newCustomers: 89,
      repeatCustomers: 234,
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Get revenue by category
 */
export async function getRevenueByCategory(
  companyId: string
): Promise<{
  success: boolean;
  data?: Array<{ category: string; revenue: number; percentage: number }>;
  error?: string;
}> {
  try {
    // Mock data for now
    return {
      success: true,
      data: [
        { category: 'Electrónica', revenue: 45000, percentage: 45 },
        { category: 'Ropa', revenue: 25000, percentage: 25 },
        { category: 'Hogar', revenue: 15000, percentage: 15 },
        { category: 'Otros', revenue: 15000, percentage: 15 },
      ],
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}
