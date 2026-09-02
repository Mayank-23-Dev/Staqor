-- ============================================================================
-- STAQOR DATABASE SCHEMA & MIGRATION (SUPABASE / POSTGRESQL)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- SECTION 1: NON-DESTRUCTIVE MIGRATION (ALTER EXISTING TABLES)
-- ----------------------------------------------------------------------------

-- 1. Upgrade problems table with Staqor AI & Workspace fields
ALTER TABLE IF EXISTS public.problems
  ADD COLUMN IF NOT EXISTS track text DEFAULT 'html-css',
  ADD COLUMN IF NOT EXISTS spec_markdown text,
  ADD COLUMN IF NOT EXISTS model_solution jsonb DEFAULT '{"html": "", "css": "", "js": ""}'::jsonb,
  ADD COLUMN IF NOT EXISTS rubric jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS design_spec jsonb DEFAULT '{"brand_primary": "#ABDAC8", "requirements": []}'::jsonb,
  ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS order_index integer DEFAULT 0;

-- Ensure starter_code has default multi-tab format if empty
ALTER TABLE IF EXISTS public.problems 
  ALTER COLUMN starter_code SET DEFAULT '{"html": "", "css": "", "js": ""}'::jsonb;

-- 2. Upgrade submissions table for AI Evaluation & Scoring
ALTER TABLE IF EXISTS public.submissions
  ADD COLUMN IF NOT EXISTS code_submitted jsonb DEFAULT '{"html": "", "css": "", "js": ""}'::jsonb,
  ADD COLUMN IF NOT EXISTS attempt_type text DEFAULT 'run' CHECK (attempt_type IN ('run', 'submit')),
  ADD COLUMN IF NOT EXISTS score integer DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  ADD COLUMN IF NOT EXISTS passed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS groq_response jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT false;

-- 3. Create attempt_counts table (Enforces 5 Runs / 3 Submits quota per user)
CREATE TABLE IF NOT EXISTS public.attempt_counts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  problem_id uuid REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
  run_count integer DEFAULT 0 NOT NULL,
  submit_count integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (user_id, problem_id)
);

-- 4. User Profiles & Stats
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text NOT NULL,
  username text UNIQUE NOT NULL,
  role text DEFAULT 'free' CHECK (role IN ('free', 'pro', 'admin')),
  total_solves integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  coins integer DEFAULT 0,
  avatar_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Auto-Create Profile Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ----------------------------------------------------------------------------
-- SECTION 2: ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_counts ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Problems Policies
DROP POLICY IF EXISTS "Active problems are readable by everyone" ON public.problems;
CREATE POLICY "Active problems are readable by everyone" ON public.problems FOR SELECT USING (is_active = true);

-- Submissions Policies
DROP POLICY IF EXISTS "Users can manage own submissions" ON public.submissions;
CREATE POLICY "Users can manage own submissions" ON public.submissions FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can view public submissions" ON public.submissions;
CREATE POLICY "Public can view public submissions" ON public.submissions FOR SELECT USING (is_public = true);

-- Attempt Counts Policies
DROP POLICY IF EXISTS "Users can manage own attempt counts" ON public.attempt_counts;
CREATE POLICY "Users can manage own attempt counts" ON public.attempt_counts FOR ALL USING (auth.uid() = user_id);
