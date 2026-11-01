-- Staqor Database Schema (Supabase / PostgreSQL)

-- 1. Profiles Table (Linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  username text unique not null,
  role text default 'free' check (role in ('free', 'pro', 'admin')),
  total_solves integer default 0,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile."
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger: Automatically create a profile when a new user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Challenges Table
create table if not exists public.challenges (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  track text not null check (track in ('html-css', 'javascript', 'react', 'vue')),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  spec_markdown text not null,
  starter_code jsonb not null default '{"html": "", "css": "", "js": ""}'::jsonb,
  model_solution jsonb not null default '{"html": "", "css": "", "js": ""}'::jsonb,
  rubric jsonb not null default '[]'::jsonb,
  design_spec jsonb default '{"brand_primary": "#ABDAC8", "requirements": []}'::jsonb,
  is_active boolean default true not null,
  order_index integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Challenges
alter table public.challenges enable row level security;

create policy "Active challenges are readable by everyone."
  on public.challenges for select
  using (is_active = true);

-- 3. Submissions Table
create table if not exists public.submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  challenge_id uuid references public.challenges(id) on delete cascade not null,
  code_submitted jsonb not null,
  attempt_type text not null check (attempt_type in ('run', 'submit')),
  score integer not null check (score >= 0 and score <= 100),
  passed boolean default false not null,
  groq_response jsonb not null,
  is_public boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Submissions
alter table public.submissions enable row level security;

create policy "Users can view their own submissions or public ones."
  on public.submissions for select
  using (auth.uid() = user_id or is_public = true);

create policy "Users can insert their own submissions."
  on public.submissions for insert
  with check (auth.uid() = user_id);

-- 4. Attempt Counts Table (Quota enforcement: 5 Runs / 3 Submits)
create table if not exists public.attempt_counts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  challenge_id uuid references public.challenges(id) on delete cascade not null,
  run_count integer default 0 not null,
  submit_count integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, challenge_id)
);

-- Enable RLS for Attempt Counts
alter table public.attempt_counts enable row level security;

create policy "Users can view and manage their own attempt counts."
  on public.attempt_counts for all
  using (auth.uid() = user_id);

-- 5. Seed Initial Sample Challenge
insert into public.challenges (slug, title, track, difficulty, spec_markdown, starter_code, model_solution, rubric, order_index)
values (
  'interactive-pricing-card',
  'Interactive Pricing Card',
  'html-css',
  'easy',
  '# Interactive Pricing Card

Build a modern, accessible, and responsive pricing tier card component with dynamic monthly/annual billing toggle and hover interactions.

## Requirements
1. **Semantic HTML Structure**: Card container with badge, title, pricing display, feature list, and call-to-action button.
2. **Dynamic Price Switcher**: Clicking the billing toggle button updates the displayed price smoothly between **$15/mo** (Monthly) and **$12/mo** (Annual billed at $144/yr).
3. **Responsive Visual Styling**: Polished dark-mode palette (#0D0D12, #ABDAC8 accent), clean typography, border highlights, and active states.
4. **Interactive Hover Animations**: Micro-interactions on buttons and badge hover elements.',
  '{
    "html": "<div class=\"card-container\">\n  <div class=\"pricing-card\">\n    <div class=\"badge\">Popular</div>\n    <h2>Pro Tier</h2>\n    <p class=\"subtitle\">For dedicated frontend builders</p>\n    <div class=\"price-wrapper\">\n      <span class=\"price\" id=\"price-display\">$15</span>\n      <span class=\"period\" id=\"period-display\">/month</span>\n    </div>\n    <div class=\"billing-toggle\">\n      <button id=\"billing-btn\" class=\"toggle-btn\">Switch to Annual (Save 20%)</button>\n    </div>\n    <ul class=\"features\">\n      <li>✓ Unlimited AI evaluations</li>\n      <li>✓ Verified portfolio badge</li>\n      <li>✓ Model solution previews</li>\n    </ul>\n    <button id=\"cta-btn\" class=\"cta-button\">Get Started</button>\n  </div>\n</div>",
    "css": "body {\n  margin: 0;\n  padding: 40px 20px;\n  background-color: #07070a;\n  color: #f3f4f6;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 80vh;\n}\n\n.pricing-card {\n  background: #111118;\n  border: 1px solid #272732;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 360px;\n  width: 100%;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.5);\n  position: relative;\n  transition: transform 0.2s ease, border-color 0.2s ease;\n}\n\n.pricing-card:hover {\n  transform: translateY(-4px);\n  border-color: #abdac8;\n}\n\n.badge {\n  position: absolute;\n  top: -12px;\n  right: 24px;\n  background: #abdac8;\n  color: #07070a;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 4px 12px;\n  border-radius: 999px;\n}\n\nh2 {\n  margin: 0 0 6px 0;\n  font-size: 24px;\n  color: #fff;\n}\n\n.subtitle {\n  color: #9ca3af;\n  font-size: 13px;\n  margin: 0 0 20px 0;\n}\n\n.price-wrapper {\n  margin-bottom: 20px;\n}\n\n.price {\n  font-size: 42px;\n  font-weight: 800;\n  color: #abdac8;\n}\n\n.period {\n  color: #6b7280;\n  font-size: 14px;\n}\n\n.toggle-btn {\n  background: #1f1f2e;\n  border: 1px solid #374151;\n  color: #d1d5db;\n  font-size: 12px;\n  padding: 8px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  width: 100%;\n  margin-bottom: 24px;\n  transition: background 0.2s ease;\n}\n\n.toggle-btn:hover {\n  background: #2d2d42;\n}\n\n.features {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 28px 0;\n  font-size: 13px;\n  color: #9ca3af;\n}\n\n.features li {\n  margin-bottom: 12px;\n}\n\n.cta-button {\n  width: 100%;\n  background: #abdac8;\n  color: #07070a;\n  font-weight: 600;\n  font-size: 14px;\n  border: none;\n  padding: 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: opacity 0.2s ease;\n}\n\n.cta-button:hover {\n  opacity: 0.9;\n}",
    "js": "const billingBtn = document.getElementById(\"billing-btn\");\nconst priceDisplay = document.getElementById(\"price-display\");\nconst periodDisplay = document.getElementById(\"period-display\");\n\nlet isAnnual = false;\n\nbillingBtn.addEventListener(\"click\", () => {\n  isAnnual = !isAnnual;\n  if (isAnnual) {\n    priceDisplay.textContent = \"$12\";\n    periodDisplay.textContent = \"/month (billed $144/yr)\";\n    billingBtn.textContent = \"Switch to Monthly\";\n  } else {\n    priceDisplay.textContent = \"$15\";\n    periodDisplay.textContent = \"/month\";\n    billingBtn.textContent = \"Switch to Annual (Save 20%)\";\n  }\n  console.log(\"Billing plan toggled:\", isAnnual ? \"Annual\" : \"Monthly\");\n});"
  }'::jsonb,
  '{
    "html": "<div class=\"card-container\">\n  <div class=\"pricing-card\">\n    <div class=\"badge\">Popular</div>\n    <h2>Pro Tier</h2>\n    <p class=\"subtitle\">For dedicated frontend builders</p>\n    <div class=\"price-wrapper\">\n      <span class=\"price\" id=\"price-display\">$15</span>\n      <span class=\"period\" id=\"period-display\">/month</span>\n    </div>\n    <div class=\"billing-toggle\">\n      <button id=\"billing-btn\" class=\"toggle-btn\">Switch to Annual (Save 20%)</button>\n    </div>\n    <ul class=\"features\">\n      <li>✓ Unlimited AI evaluations</li>\n      <li>✓ Verified portfolio badge</li>\n      <li>✓ Model solution previews</li>\n    </ul>\n    <button id=\"cta-btn\" class=\"cta-button\">Get Started</button>\n  </div>\n</div>",
    "css": "body { margin: 0; padding: 40px 20px; background-color: #07070a; color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 80vh; } .pricing-card { background: #111118; border: 1px solid #272732; border-radius: 16px; padding: 32px; max-width: 360px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.5); position: relative; transition: transform 0.2s ease, border-color 0.2s ease; } .pricing-card:hover { transform: translateY(-4px); border-color: #abdac8; } .badge { position: absolute; top: -12px; right: 24px; background: #abdac8; color: #07070a; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 999px; } h2 { margin: 0 0 6px 0; font-size: 24px; color: #fff; } .subtitle { color: #9ca3af; font-size: 13px; margin: 0 0 20px 0; } .price-wrapper { margin-bottom: 20px; } .price { font-size: 42px; font-weight: 800; color: #abdac8; } .period { color: #6b7280; font-size: 14px; } .toggle-btn { background: #1f1f2e; border: 1px solid #374151; color: #d1d5db; font-size: 12px; padding: 8px 14px; border-radius: 8px; cursor: pointer; width: 100%; margin-bottom: 24px; transition: background 0.2s ease; } .toggle-btn:hover { background: #2d2d42; } .features { list-style: none; padding: 0; margin: 0 0 28px 0; font-size: 13px; color: #9ca3af; } .features li { margin-bottom: 12px; } .cta-button { width: 100%; background: #abdac8; color: #07070a; font-weight: 600; font-size: 14px; border: none; padding: 12px; border-radius: 8px; cursor: pointer; transition: opacity 0.2s ease; } .cta-button:hover { opacity: 0.9; }",
    "js": "const billingBtn = document.getElementById(\"billing-btn\"); const priceDisplay = document.getElementById(\"price-display\"); const periodDisplay = document.getElementById(\"period-display\"); let isAnnual = false; billingBtn.addEventListener(\"click\", () => { isAnnual = !isAnnual; if (isAnnual) { priceDisplay.textContent = \"$12\"; periodDisplay.textContent = \"/month (billed $144/yr)\"; billingBtn.textContent = \"Switch to Monthly\"; } else { priceDisplay.textContent = \"$15\"; periodDisplay.textContent = \"/month\"; billingBtn.textContent = \"Switch to Annual (Save 20%)\"; } console.log(\"Billing plan toggled:\", isAnnual ? \"Annual\" : \"Monthly\"); });"
  }'::jsonb,
  '[
    {"id": "semantic_markup", "name": "Semantic Structure", "weight": 25, "criteria": "Proper card nesting, semantic elements, and accessible button/badge elements."},
    {"id": "interactive_toggle", "name": "Dynamic State & Interaction", "weight": 40, "criteria": "Clicking billing toggle updates price and period text dynamically."},
    {"id": "styling_polish", "name": "Visual Design & Fidelity", "weight": 35, "criteria": "Accurate dark theme colors, brand accent #ABDAC8, and responsive spacing."}
  ]'::jsonb,
  1
)
on conflict (slug) do nothing;
