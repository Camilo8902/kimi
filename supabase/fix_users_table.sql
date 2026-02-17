-- ============================================================
-- Fix users table - clean approach
-- ============================================================

-- Drop all existing policies on users table
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can create own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated inserts" ON public.users;
DROP POLICY IF EXISTS "Allow all authenticated" ON public.users;

-- Create a simple permissive policy for now
CREATE POLICY "Allow all operations on users" ON public.users
    FOR ALL
    TO authenticated, anon
    USING (true)
    WITH CHECK (true);

-- Grant table permissions
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.users TO anon;

-- Verify
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'users';
