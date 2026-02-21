// @ts-nocheck
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type ProductInsert = Database['public']['Tables']['products']['Insert'];

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
}

export interface ProductInput {
  company_id: string;
  category_id: string;
  name: string;
  description: string;
  short_description?: string;
  sku: string;
  price: number;
  compare_at_price?: number;
  cost_price?: number;
  quantity: number;
  min_quantity?: number;
  weight?: number;
  status?: string;
  tags?: string | string[];
}

/**
 * Get all products for a company
 */
export async function getCompanyProducts(companyId: string): Promise<{
  success: boolean;
  products?: Product[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return { success: false, error: error.message };
    }

    return { success: true, products: data as Product[] };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado al obtener productos' };
  }
}

/**
 * Get a single product by ID
 */
export async function getProduct(productId: string): Promise<{
  success: boolean;
  product?: Product;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return { success: false, error: error.message };
    }

    return { success: true, product: data as Product };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado' };
  }
}

/**
 * Create a new product
 */
export async function createProduct(input: ProductInput): Promise<{
  success: boolean;
  product?: Product;
  error?: string;
}> {
  try {
    // Generate slug from name
    const slug = input.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') +
      '-' + Date.now().toString(36);

    // Get default category if not provided
    let categoryId = input.category_id;
    if (!categoryId) {
      const { data: categories } = await supabase
        .from('categories')
        .select('id')
        .limit(1)
        .single();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      categoryId = (categories as any)?.id || 'default';
    }

    const productData: ProductInsert = {
      company_id: input.company_id,
      category_id: categoryId,
      name: input.name,
      slug,
      description: input.description,
      short_description: input.short_description,
      sku: input.sku,
      price: input.price,
      compare_at_price: input.compare_at_price,
      cost_price: input.cost_price,
      quantity: input.quantity,
      min_quantity: input.min_quantity || 1,
      weight: input.weight,
      status: input.status || 'active',
      featured: false,
      tags: Array.isArray(input.tags) ? input.tags : [],
      rating_average: 0,
      rating_count: 0,
      sales_count: 0,
      view_count: 0,
    };

    const { data, error } = await supabase
      .from('products')
      .insert(productData as any)
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return { success: false, error: error.message };
    }

    return { success: true, product: data as Product };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado al crear producto' };
  }
}

/**
 * Import multiple products at once
 */
export async function importProducts(
  companyId: string,
  products: Array<Omit<ProductInput, 'company_id'>>
): Promise<{
  success: boolean;
  imported: number;
  failed: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let imported = 0;
  let failed = 0;

  // Get default category
  const { data: categories } = await supabase
    .from('categories')
    .select('id')
    .limit(1)
    .single();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultCategoryId = (categories as any)?.id || 'default';

  for (let i = 0; i < products.length; i++) {
    const input = products[i];
    
    try {
      // Generate unique slug
      const slug = input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
        '-' + Date.now().toString(36) + '-' + i;

      // Parse tags - convert to array if needed
      let tagsArray: string[] = [];
      if (typeof input.tags === 'string') {
        tagsArray = input.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
      } else if (Array.isArray(input.tags)) {
        tagsArray = input.tags;
      }

      const productData: ProductInsert = {
        company_id: companyId,
        category_id: defaultCategoryId,
        name: input.name,
        slug,
        description: input.description,
        short_description: input.short_description,
        sku: input.sku,
        price: input.price,
        compare_at_price: input.compare_at_price,
        cost_price: input.cost_price,
        quantity: input.quantity,
        min_quantity: input.min_quantity || 1,
        weight: input.weight,
        status: input.status || 'active',
        featured: false,
        tags: tagsArray,
        rating_average: 0,
        rating_count: 0,
        sales_count: 0,
        view_count: 0,
      };

      const { error } = await supabase
        .from('products')
        .insert(productData as any);

      if (error) {
        failed++;
        errors.push(`Producto "${input.name}": ${error.message}`);
      } else {
        imported++;
      }
    } catch (err) {
      failed++;
      errors.push(`Producto "${input.name}": Error inesperado`);
    }
  }

  return {
    success: imported > 0,
    imported,
    failed,
    errors,
  };
}

/**
 * Update a product
 */
export async function updateProduct(
  productId: string,
  updates: Partial<ProductInput>
): Promise<{
  success: boolean;
  product?: Product;
  error?: string;
}> {
  try {
    const { data, error } = await supabase.from('products').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', productId).select().single();

    if (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error.message };
    }

    return { success: true, product: data as Product };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado al actualizar' };
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(productId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting product:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Error inesperado al eliminar' };
  }
}

/**
 * Check if SKU already exists
 */
export async function checkSkuExists(
  sku: string,
  companyId?: string
): Promise<boolean> {
  let query = supabase
    .from('products')
    .select('id')
    .eq('sku', sku);

  if (companyId) {
    query = query.eq('company_id', companyId);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error checking SKU:', error);
    return false;
  }

  return (data?.length || 0) > 0;
}
