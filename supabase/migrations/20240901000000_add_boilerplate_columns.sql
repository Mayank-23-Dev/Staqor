ALTER TABLE problems
ADD COLUMN IF NOT EXISTS boilerplate_html TEXT,
ADD COLUMN IF NOT EXISTS boilerplate_css TEXT,
ADD COLUMN IF NOT EXISTS boilerplate_js_prefix TEXT,
ADD COLUMN IF NOT EXISTS boilerplate_js_suffix TEXT,
ADD COLUMN IF NOT EXISTS editable_js_starter TEXT,
ADD COLUMN IF NOT EXISTS test_cases JSONB;
