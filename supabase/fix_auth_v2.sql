-- ============================================================
-- Fix RLS Policies for User Registration - V2
-- ============================================================
-- The issue is that during signup, there's no active session yet.
-- We need to allow INSERT for new users by using a trigger or 
-- by modifying the RLS policy.
-- ============================================================

-- First, let's check existing policies
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'users';

-- Drop existing insert policy if exists
DROP POLICY IF EXISTS "Users can create own profile" ON public.users;

-- Create a more permissive policy that allows inserting when the ID matches
-- This works because Supabase automatically sets auth.uid() after signup
CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (
        auth.uid() = id OR 
        id IN (SELECT id FROM auth.users WHERE email = auth.jwt()->>'email')
    );

-- Alternative: Allow all authenticated users to insert (since they're validated by auth.users)
DROP POLICY IF EXISTS "Allow authenticated inserts" ON public.users;
CREATE POLICY "Allow authenticated inserts" ON public.users
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Verify RLS is enabled
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'users';

-- If RLS is not enabled, enable it
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Grant permissions to anon and authenticated roles
GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO authenticated;

-- Also grant usage on sequences if any
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Verify
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'users';
