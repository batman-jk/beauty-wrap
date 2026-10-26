-- ==============================================================================
-- Her Beauty Wrap - Create Admin User Directly in Supabase SQL Editor
-- Paste this script into your open SQL Editor tab:
-- https://supabase.com/dashboard/project/vhuipurklcjgjqwsvigk/sql
-- ==============================================================================

create extension if not exists "pgcrypto";

do $$
declare
  new_user_id uuid := gen_random_uuid();
  admin_email text := 'jayakrishnaguguloth@gmail.com';
  -- Set your desired admin password here (minimum 6 characters):
  admin_password text := 'BeautyWrapAdmin123!';
begin
  -- Clean up if any previous partial signup exists
  delete from auth.identities where user_id in (select id from auth.users where email = admin_email);
  delete from auth.users where email = admin_email;

  -- 1. Insert pre-confirmed user into auth.users
  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  ) values (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now()
  );

  -- 2. Insert identity record for Supabase Auth
  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) values (
    new_user_id,
    new_user_id,
    format('{"sub":"%s","email":"%s"}', new_user_id::text, admin_email)::jsonb,
    'email',
    admin_email,
    now(),
    now(),
    now()
  );

  raise notice 'Admin user created successfully for % with pre-confirmed status!', admin_email;
end $$;
