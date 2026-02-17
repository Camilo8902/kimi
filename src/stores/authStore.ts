import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: any; user: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (data: Partial<User>) => Promise<{ error: any }>;
  hasRole: (roles: UserRole[]) => boolean;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),

      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();

            set({ 
              user: profile as unknown as User, 
              session: data.session,
              isLoading: false 
            });
          }

          return { error: null };
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          return { error };
        }
      },

      signUp: async (email, password, userData) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                first_name: userData.first_name,
                last_name: userData.last_name,
                role: userData.role || 'customer',
              },
            },
          });

          if (error) throw error;

          if (data.user) {
            const profileData = {
              id: data.user.id,
              email,
              first_name: userData.first_name,
              last_name: userData.last_name,
              role: userData.role || 'customer',
            };

            const { error: profileError } = await supabase
              .from('users')
              .insert(profileData as any);

            if (profileError) throw profileError;

            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();

            set({ 
              user: profile as unknown as User, 
              session: data.session,
              isLoading: false 
            });
          }

          return { error: null, user: data.user };
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          return { error, user: null };
        }
      },

      signOut: async () => {
        set({ isLoading: true });
        try {
          await supabase.auth.signOut();
          set({ user: null, session: null, isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },

      resetPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          });

          if (error) throw error;

          set({ isLoading: false });
          return { error: null };
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          return { error };
        }
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = get();
          if (!user) throw new Error('No user logged in');

          const updateData = { ...data };
          const { error } = await supabase
            .from('users')
            .update(updateData as never)
            .eq('id', user.id);

          if (error) throw error;

          set({ 
            user: { ...user, ...data },
            isLoading: false 
          });

          return { error: null };
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          return { error };
        }
      },

      hasRole: (roles) => {
        const { user } = get();
        return user ? roles.includes(user.role) : false;
      },

      isAuthenticated: () => {
        const { user } = get();
        return !!user;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, session: state.session }),
    }
  )
);
