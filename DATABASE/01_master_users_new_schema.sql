-- ============================================================
-- H3 MASTER SYSTEM — master_users NEW SCHEMA
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

-- Step 1: Drop existing table (no data loss — currently empty)
DROP TABLE IF EXISTS public.master_users CASCADE;

-- Step 2: Create master_users with exact required columns
CREATE TABLE public.master_users (
  id            uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username      text        NOT NULL UNIQUE,
  full_name     text        NOT NULL,
  password      text        NOT NULL,
  role          text        NOT NULL DEFAULT 'user'
                            CHECK (role IN ('admin', 'user')),
  mobile_number text        DEFAULT '',
  page_access   jsonb       NOT NULL DEFAULT '{}'::jsonb,
  is_active     boolean     NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Step 3: Performance Indexes
CREATE INDEX idx_master_users_username  ON public.master_users (username);
CREATE INDEX idx_master_users_role      ON public.master_users (role);
CREATE INDEX idx_master_users_is_active ON public.master_users (is_active);

-- Step 4: Auto updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_master_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_master_users_updated_at ON public.master_users;
CREATE TRIGGER trigger_master_users_updated_at
  BEFORE UPDATE ON public.master_users
  FOR EACH ROW EXECUTE FUNCTION public.handle_master_users_updated_at();

-- Step 5: Enable Row Level Security & Public Access Policy
ALTER TABLE public.master_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow full access to master_users" ON public.master_users;
CREATE POLICY "Allow full access to master_users"
  ON public.master_users FOR ALL
  USING (true) WITH CHECK (true);

-- Step 6: Seed Default Super Admin User
INSERT INTO public.master_users
  (username, full_name, password, role, mobile_number, is_active, page_access)
VALUES (
  'admin',
  'Super Admin',
  'admin123',
  'admin',
  '7000206500',
  true,
  '{
    "pete": {
      "access": true,
      "role": "admin",
      "pages": ["dashboard", "form", "receiving", "reports", "master"]
    },
    "ims": {
      "access": true,
      "role": "admin",
      "pages": ["dashboard", "stock", "inventory", "master"]
    },
    "pms": {
      "access": true,
      "role": "admin",
      "full_access": true,
      "pages": [
        "dashboard",
        "bookings",
        "menuFinalize",
        "chef",
        "tagPrints",
        "dress",
        "decor",
        "crockery",
        "kitchenRawMaterial",
        "vegetables",
        "cheeseDairy",
        "masters"
      ]
    }
  }'::jsonb
)
ON CONFLICT (username) DO UPDATE
SET
  full_name = EXCLUDED.full_name,
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  mobile_number = EXCLUDED.mobile_number,
  is_active = EXCLUDED.is_active,
  page_access = EXCLUDED.page_access,
  updated_at = now();
