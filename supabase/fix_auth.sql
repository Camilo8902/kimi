-- ============================================================
-- Fix RLS Policies for User Registration
-- ============================================================
-- This script fixes the Row Level Security policies to allow
-- users to create their own profile during registration.
-- ============================================================

-- Allow users to insert their own profile during registration
CREATE POLICY "Users can create own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to read their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Allow authenticated users to view all users (for admin purposes)
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
        OR auth.uid() = id
    );

-- Allow service role to do everything (for backend operations)
-- Note: This is handled by Supabase service role key, not RLS

-- Verify the policies are created
SELECT 
    policyname, 
    cmd, 
    qual, 
    with_check 
FROM pg_policies 
WHERE tablename = 'users';
