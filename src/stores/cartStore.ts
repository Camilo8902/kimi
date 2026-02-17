import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem, Product, ProductVariant } from '@/types';

interface CartState extends Cart {
  isOpen: boolean;
  
  // Actions
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalItems: () => number;
}

const calculateTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
  const subtotal = items.reduce((sum, item) => {
    const price = item.variant?.price || item.product.price;
    return sum + price * item.quantity;
  }, 0);
  
  const tax = subtotal * 0.16; // 16% IVA
  const shipping = subtotal > 50 ? 0 : 9.99;
  const discount = 0;
  const total = subtotal + tax + shipping - discount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, quantity = 1, variant) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => 
              item.product_id === product.id && 
              item.variant_id === variant?.id
          );

          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            const newItem: CartItem = {
              id: `${product.id}-${variant?.id || 'default'}-${Date.now()}`,
              product_id: product.id,
              variant_id: variant?.id,
              quantity,
              product,
              variant,
            };
            newItems = [...state.items, newItem];
          }

          const totals = calculateTotals(newItems);
          return { ...totals, items: newItems, isOpen: true };
        });
      },

      removeItem: (itemId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== itemId);
          const totals = calculateTotals(newItems);
          return { ...totals, items: newItems };
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          const totals = calculateTotals(newItems);
          return { ...totals, items: newItems };
        });
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          tax: 0,
          shipping: 0,
          discount: 0,
          total: 0,
        });
      },

      getItemCount: () => {
        return get().items.length;
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        subtotal: state.subtotal,
        tax: state.tax,
        shipping: state.shipping,
        discount: state.discount,
        total: state.total,
      }),
    }
  )
);
