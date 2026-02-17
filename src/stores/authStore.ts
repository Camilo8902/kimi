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
        console.log('%c🔐 Attempting sign in...', 'color: blue');
        console.log('- Email:', email);
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          console.log('%c📡 Sign in response:', 'color: blue', { data, error });

          if (error) {
            console.error('%c❌ Sign in error:', 'color: red', error);
            throw error;
          }

          if (data.user) {
            console.log('%c👤 Fetching user profile...', 'color: blue');
            
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();

            console.log('%c👤 Profile response:', 'color: blue', { profile, profileError });

            if (profileError) {
              console.error('%c❌ Profile fetch error:', 'color: red', profileError);
              // If profile doesn't exist, create a basic one
              if (profileError.code === 'PGRST116') {
                console.log('%c⚠️ Profile not found, creating basic profile...', 'color: orange');
                const { data: newProfile, error: createError } = await supabase
                  .from('users')
                  .insert({
                    id: data.user.id,
                    email: data.user.email,
                    first_name: data.user.user_metadata?.first_name || 'User',
                    last_name: data.user.user_metadata?.last_name || '',
                    role: 'customer'
                  } as any)
                  .select()
                  .single();
                
                if (createError) {
                  console.error('%c❌ Profile creation error:', 'color: red', createError);
                  set({ user: null, session: data.session, isLoading: false });
                } else {
                  console.log('%c✅ Basic profile created:', 'color: green', newProfile);
                  set({ user: newProfile as unknown as User, session: data.session, isLoading: false });
                }
              } else {
                set({ user: null, session: data.session, isLoading: false });
              }
            } else {
              set({ 
                user: profile as unknown as User, 
                session: data.session,
                isLoading: false 
              });
            }
          }

          return { error: null };
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          return { error };
        }
      },

      signUp: async (email, password, userData) => {
        set({ isLoading: true, error: null });
        console.log('%c📝 Attempting sign up...', 'color: green');
        console.log('- Email:', email);
        console.log('- UserData:', userData);
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

          console.log('%c📡 Sign up response:', 'color: green', { data, error });

          if (error) {
            console.error('%c❌ Sign up error:', 'color: red', error);
            throw error;
          }

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

            console.log('%c💾 Insert profile response:', 'color: orange', { profileError });
            console.log('%c📋 Profile data:', 'color: orange', profileData);

            if (profileError) {
              console.error('%c❌ Profile insert error:', 'color: red', profileError);
              throw profileError;
            }

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
