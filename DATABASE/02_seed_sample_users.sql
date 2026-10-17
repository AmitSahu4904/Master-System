-- ============================================================
-- H3 MASTER SYSTEM — Sample Users Seed (Optional)
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Catering Department Staff (PMS only - Chef & Vegetables)
INSERT INTO public.master_users
  (username, full_name, password, role, mobile_number, is_active, page_access)
VALUES (
  'chef_rahul',
  'Rahul Sharma (Head Chef)',
  'pass123',
  'user',
  '9876543211',
  true,
  '{
    "pete": { "access": false, "role": "user", "pages": [] },
    "ims": { "access": false, "role": "user", "pages": [] },
    "pms": {
      "access": true,
      "role": "staff",
      "full_access": false,
      "pages": ["dashboard", "chef", "vegetables", "kitchenRawMaterial"]
    }
  }'::jsonb
)
ON CONFLICT (username) DO NOTHING;

-- 2. Crockery Inventory Manager (IMS only)
INSERT INTO public.master_users
  (username, full_name, password, role, mobile_number, is_active, page_access)
VALUES (
  'crockery_manager',
  'Suresh Patel (Crockery Store)',
  'pass123',
  'user',
  '9876543212',
  true,
  '{
    "pete": { "access": false, "role": "user", "pages": [] },
    "ims": {
      "access": true,
      "role": "admin",
      "pages": ["dashboard", "stock", "inventory", "master"]
    },
    "pms": { "access": false, "role": "user", "pages": [] }
  }'::jsonb
)
ON CONFLICT (username) DO NOTHING;

-- 3. Accountant (PETE only)
INSERT INTO public.master_users
  (username, full_name, password, role, mobile_number, is_active, page_access)
VALUES (
  'accountant_pete',
  'Amit Verma (Accounts)',
  'pass123',
  'user',
  '9876543213',
  true,
  '{
    "pete": {
      "access": true,
      "role": "counter",
      "pages": ["dashboard", "form", "receiving", "reports"]
    },
    "ims": { "access": false, "role": "user", "pages": [] },
    "pms": { "access": false, "role": "user", "pages": [] }
  }'::jsonb
)
ON CONFLICT (username) DO NOTHING;
