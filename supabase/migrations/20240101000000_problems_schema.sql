-- Create problems table
CREATE TABLE problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  topic TEXT,
  category TEXT,
  acceptance_rate NUMERIC,
  description TEXT,
  starter_code JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create submissions table
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('solved', 'attempted', 'failed')),
  submitted_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_stats table
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INT DEFAULT 0,
  total_solved INT DEFAULT 0,
  coins INT DEFAULT 0,
  last_active_date DATE
);

-- Create user_problem_status view
CREATE VIEW user_problem_status WITH (security_invoker = true) AS
SELECT 
  user_id,
  problem_id,
  CASE 
    WHEN bool_or(status = 'solved') THEN 'solved'
    WHEN bool_or(status = 'attempted' OR status = 'failed') THEN 'attempted'
    ELSE 'unsolved'
  END as status,
  min(CASE WHEN status = 'solved' THEN created_at END) as solved_at
FROM submissions
GROUP BY user_id, problem_id;

-- Enable Row Level Security
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for problems (public read)
CREATE POLICY "Problems are viewable by everyone" ON problems
  FOR SELECT USING (true);

-- RLS Policies for submissions (users can read/write their own)
CREATE POLICY "Users can view their own submissions" ON submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions" ON submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_stats (users can read/write their own)
CREATE POLICY "Users can view their own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON user_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" ON user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id); 

-- Indexes for performance
CREATE INDEX idx_problems_slug ON problems(slug);
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);
