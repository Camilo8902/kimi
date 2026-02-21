// @ts-nocheck
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type ReviewRow = Database['public']['Tables']['reviews']['Row'];
type ProductRow = Database['public']['Tables']['products']['Row'];
type OrderRow = Database['public']['Tables']['orders']['Row'];

export interface Review {
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
  // Joined data
  user?: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

export interface ReviewCreateInput {
  user_id: string;
  product_id: string;
  order_id?: string;
  rating: number;
  title?: string;
  content?: string;
  images?: string[];
}

export interface ReviewWithUser extends Review {
  user: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

/**
 * Get all reviews for a product
 */
export async function getProductReviews(productId: string): Promise<{ success: boolean; reviews?: ReviewWithUser[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        users!reviews_user_id_fkey (
          first_name,
          last_name,
          avatar_url
        )
      `)
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return { success: false, error: error.message };
    }

    // Transform the data to flatten the user object
    const reviews = data?.map((review: ReviewRow & { users: any }) => ({
      ...review,
      user: review.users as { first_name: string; last_name: string; avatar_url?: string },
    })) as ReviewWithUser[];

    return { success: true, reviews };
  } catch (error) {
    console.error('Unexpected error fetching reviews:', error);
    return { success: false, error: 'Error inesperado al obtener las reseñas' };
  }
}

/**
 * Get review statistics for a product
 */
export async function getProductReviewStats(productId: string): Promise<{ 
  success: boolean; 
  stats?: { 
    averageRating: number; 
    totalReviews: number;
    ratingDistribution: { [key: number]: number };
  }; 
  error?: string 
}> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId)
      .eq('is_approved', true);

    if (error) {
      console.error('Error fetching review stats:', error);
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { 
        success: true, 
        stats: { 
          averageRating: 0, 
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        } 
      };
    }

    const totalReviews = data.length;
    const sumRatings = data.reduce((sum: number, r: ReviewRow) => sum + r.rating, 0);
    const averageRating = Math.round((sumRatings / totalReviews) * 10) / 10;

    const ratingDistribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.forEach((r: ReviewRow) => {
      ratingDistribution[r.rating] = (ratingDistribution[r.rating] || 0) + 1;
    });

    return { 
      success: true, 
      stats: { averageRating, totalReviews, ratingDistribution } 
    };
  } catch (error) {
    console.error('Unexpected error fetching review stats:', error);
    return { success: false, error: 'Error inesperado al obtener estadísticas' };
  }
}

/**
 * Create a new review
 */
export async function createReview(input: ReviewCreateInput): Promise<{ success: boolean; review?: Review; error?: string }> {
  try {
    // Check if user has already reviewed this product
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', input.user_id)
      .eq('product_id', input.product_id)
      .single();

    if (existingReview) {
      return { success: false, error: 'Ya has reseñado este producto' };
    }

    // Check if user has purchased this product (for verified purchase badge)
    const { data: userOrders } = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', input.user_id)
      .eq('status', 'delivered') as { data: OrderRow[] | null };

    const orderIds = userOrders?.map((o) => o.id) || [];

    const { data: orderItem } = await supabase
      .from('order_items')
      .select('id')
      .eq('product_id', input.product_id)
      .in('order_id', orderIds.length > 0 ? orderIds : [''])
      .limit(1);

    const isVerifiedPurchase = !!orderItem && orderItem.length > 0;

    const { data, error } = await supabase
      .from('reviews')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({
        user_id: input.user_id,
        product_id: input.product_id,
        order_id: input.order_id,
        rating: input.rating,
        title: input.title,
        content: input.content,
        images: input.images || [],
        is_verified_purchase: isVerifiedPurchase,
        is_approved: true, // Auto-approve for now, can be changed to require moderation
        helpful_count: 0,
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      return { success: false, error: error.message };
    }

    // Update product rating
    await updateProductRating(input.product_id);

    return { success: true, review: data as Review };
  } catch (error) {
    console.error('Unexpected error creating review:', error);
    return { success: false, error: 'Error inesperado al crear la reseña' };
  }
}

/**
 * Mark a review as helpful
 */
export async function markReviewHelpful(reviewId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current helpful count
    const { data: review, error: fetchError } = await supabase
      .from('reviews')
      .select('helpful_count')
      .eq('id', reviewId)
      .single();

    if (fetchError || !review) {
      return { success: false, error: 'Reseña no encontrada' };
    }

    const { error } = await supabase.from('reviews').update({ helpful_count: (review as any).helpful_count + 1, updated_at: new Date().toISOString() }).eq('id', reviewId);

    if (error) {
      console.error('Error marking review as helpful:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error marking review as helpful:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Report a review
 */
export async function reportReview(reviewId: string, reason: string, userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // For now, we'll just store this in activity_logs
    // In a real app, you might have a dedicated reports table
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase
      .from('activity_logs')
      .insert({
        user_id: userId,
        action: 'report_review',
        entity_type: 'review',
        entity_id: reviewId,
        new_data: { reason },
      } as any);

    if (error) {
      console.error('Error reporting review:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error reporting review:', error);
    return { success: false, error: 'Error inesperado al reportar' };
  }
}

/**
 * Check if user can review a product
 */
export async function canUserReviewProduct(userId: string, productId: string): Promise<{ 
  canReview: boolean; 
  reason?: string;
  orderId?: string;
}> {
  try {
    // Check if user has already reviewed this product
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existingReview) {
      return { canReview: false, reason: 'Ya has reseñado este producto' };
    }

    // Check if user has purchased and received this product
    const { data: orders } = await supabase
      .from('orders')
      .select('id, order_items!inner(product_id)')
      .eq('user_id', userId)
      .eq('status', 'delivered')
      .eq('order_items.product_id', productId);

    if (!orders || orders.length === 0) {
      // Allow review anyway, but won't be marked as verified purchase
      return { canReview: true, reason: 'Tu reseña no será marcada como compra verificada' };
    }

    return { 
      canReview: true, 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      orderId: (orders[0] as any).id 
    };
  } catch (error) {
    console.error('Error checking review eligibility:', error);
    return { canReview: true }; // Allow by default
  }
}

/**
 * Update product rating after review changes
 */
async function updateProductRating(productId: string): Promise<void> {
  try {
    const { data } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId)
      .eq('is_approved', true);

    if (data && data.length > 0) {
      const avgRating = data.reduce((sum: number, r: ReviewRow) => sum + r.rating, 0) / data.length;
      const reviewCount = data.length;

      await supabase.from('products').update({ rating_average: Math.round(avgRating * 10) / 10, rating_count: reviewCount, updated_at: new Date().toISOString() }).eq('id', productId);
    }
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
}

/**
 * Get user's reviews
 */
export async function getUserReviews(userId: string): Promise<{ success: boolean; reviews?: (Review & { product_name: string })[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        products!reviews_product_id_fkey (
          name
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user reviews:', error);
      return { success: false, error: error.message };
    }

    const reviews = data?.map((review: ReviewRow & { products: ProductRow | null }) => ({
      ...review,
      product_name: review.products?.name || 'Producto eliminado',
    })) as (Review & { product_name: string })[];

    return { success: true, reviews };
  } catch (error) {
    console.error('Unexpected error fetching user reviews:', error);
    return { success: false, error: 'Error inesperado al obtener tus reseñas' };
  }
}

/**
 * Delete a review
 */
export async function deleteReview(reviewId: string, userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Get the review to check ownership and get product_id
    const { data: review, error: fetchError } = await supabase
      .from('reviews')
      .select('user_id, product_id')
      .eq('id', reviewId)
      .single();

    if (fetchError || !review) {
      return { success: false, error: 'Reseña no encontrada' };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((review as any).user_id !== userId) {
      return { success: false, error: 'No tienes permiso para eliminar esta reseña' };
    }

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) {
      console.error('Error deleting review:', error);
      return { success: false, error: error.message };
    }

    // Update product rating
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await updateProductRating((review as any).product_id);

    return { success: true };
  } catch (error) {
    console.error('Unexpected error deleting review:', error);
    return { success: false, error: 'Error inesperado al eliminar la reseña' };
  }
}