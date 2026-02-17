-- ============================================================
-- Fix table permissions
-- ============================================================

-- Grant full permissions to authenticated users
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.users TO anon;

-- Also grant to service role if exists
GRANT ALL ON public.users TO service_role;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows all authenticated users to insert/update/select
DROP POLICY IF EXISTS "Allow all authenticated" ON public.users;
CREATE POLICY "Allow all authenticated" ON public.users
    FOR ALL
    TO authenticated, anon
    USING (true)
    WITH CHECK (true);

-- Verify
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'users';
