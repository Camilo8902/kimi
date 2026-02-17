import { create } from 'zustand';

interface UIState {
  // Sidebar states
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  
  // Modal states
  activeModal: string | null;
  modalData: any | null;
  
  // Toast notifications
  toasts: Toast[];
  
  // Loading states
  globalLoading: boolean;
  loadingMessage: string;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  openModal: (modalId: string, data?: any) => void;
  closeModal: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  setGlobalLoading: (loading: boolean, message?: string) => void;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export const useUIStore = create<UIState>((set, get) => ({
  isSidebarOpen: true,
  isMobileMenuOpen: false,
  activeModal: null,
  modalData: null,
  toasts: [],
  globalLoading: false,
  loadingMessage: '',

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  openModal: (modalId, data) => set({ activeModal: modalId, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),

  addToast: (toast) => {
    const id = Math.random().toString(36).substring(7);
    const newToast = { ...toast, id, duration: toast.duration || 5000 };
    
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    setTimeout(() => {
      get().removeToast(id);
    }, newToast.duration);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  setGlobalLoading: (loading, message = '') => {
    set({ globalLoading: loading, loadingMessage: message });
  },
}));
