-- ============================================================
-- Defined — Supabase Database Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Profiles (extends Supabase auth.users) ────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  email TEXT,
  favorite_theme TEXT DEFAULT 'minimal',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ─── Definitions ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.definitions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  part_of_speech TEXT DEFAULT 'noun',
  pronunciation TEXT,
  origin TEXT,
  definitions JSONB NOT NULL DEFAULT '[]',
  tone TEXT NOT NULL,
  relationship TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  share_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_definitions_name ON public.definitions(LOWER(name));
CREATE INDEX IF NOT EXISTS idx_definitions_tone ON public.definitions(tone);
CREATE INDEX IF NOT EXISTS idx_definitions_user_id ON public.definitions(user_id);
CREATE INDEX IF NOT EXISTS idx_definitions_share_count ON public.definitions(share_count DESC);
CREATE INDEX IF NOT EXISTS idx_definitions_created_at ON public.definitions(created_at DESC);

ALTER TABLE public.definitions ENABLE ROW LEVEL SECURITY;

-- Anyone can read definitions
CREATE POLICY "Definitions are publicly readable"
  ON public.definitions FOR SELECT
  USING (true);

-- Anyone can insert (anonymous generation)
CREATE POLICY "Anyone can create definitions"
  ON public.definitions FOR INSERT
  WITH CHECK (true);

-- Only owner can update their definitions
CREATE POLICY "Users can update their own definitions"
  ON public.definitions FOR UPDATE
  USING (auth.uid() = user_id);

-- ─── Orders ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id TEXT UNIQUE,
  printify_order_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  items JSONB DEFAULT '[]',
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can do everything (for webhook processing)

-- ─── Saved Definitions (user bookmarks) ────────────────────

CREATE TABLE IF NOT EXISTS public.saved_definitions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  definition_id TEXT REFERENCES public.definitions(id) ON DELETE CASCADE NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, definition_id)
);

ALTER TABLE public.saved_definitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their saved definitions"
  ON public.saved_definitions
  USING (auth.uid() = user_id);

-- ─── Analytics / Functions ─────────────────────────────────

-- Increment share count
CREATE OR REPLACE FUNCTION increment_share_count(def_id TEXT)
RETURNS VOID AS $$
  UPDATE public.definitions
  SET share_count = share_count + 1
  WHERE id = def_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Trending tones (admin analytics)
CREATE OR REPLACE FUNCTION trending_tones()
RETURNS TABLE(tone TEXT, count BIGINT) AS $$
  SELECT tone, COUNT(*) as count
  FROM public.definitions
  WHERE created_at > NOW() - INTERVAL '7 days'
  GROUP BY tone
  ORDER BY count DESC
  LIMIT 10;
$$ LANGUAGE sql SECURITY DEFINER;

-- Top names (admin analytics)
CREATE OR REPLACE FUNCTION top_names()
RETURNS TABLE(name TEXT, count BIGINT) AS $$
  SELECT name, COUNT(*) as count
  FROM public.definitions
  GROUP BY LOWER(name), name
  ORDER BY count DESC
  LIMIT 20;
$$ LANGUAGE sql SECURITY DEFINER;

-- ─── Trigger: auto-create profile on signup ───────────────

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Updated_at trigger ────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Sample data (optional, for development) ───────────────

INSERT INTO public.definitions (id, name, part_of_speech, pronunciation, origin, definitions, tone, relationship, share_count)
VALUES
  (
    'example-natalie-001',
    'Natalie',
    'noun',
    '/ˈneɪ.tə.li/',
    'from the chaos dimension, circa forever ago',
    '[
      {"number": 1, "text": "survives entirely on caffeine, chaos, and emotionally devastating Spotify playlists", "emoji": "☕"},
      {"number": 2, "text": "somehow both the therapist friend AND the problem — a quantum emotional state", "emoji": "🌀"},
      {"number": 3, "text": "believes that lighting a candle and crying to Phoebe Bridgers counts as self-care", "emoji": "🕯️"},
      {"number": 4, "text": "will text you at 2am with ''are you asleep'' and then immediately have an emotional crisis regardless of your answer", "emoji": "📱"}
    ]'::jsonb,
    'emotionally-unstable',
    'best-friend',
    847
  ),
  (
    'example-biscuit-001',
    'Biscuit',
    'noun',
    '/ˈbɪs.kɪt/',
    'ancient chaos deity in golden retriever form',
    '[
      {"number": 1, "text": "a 12-pound golden entity who has never experienced self-doubt and radiates pure chaotic joy", "emoji": "🐾"},
      {"number": 2, "text": "operates on exactly two modes: zooming at 3am and existential sleeping", "emoji": "💨"},
      {"number": 3, "text": "sole heir to the couch despite being told no every single day for three years", "emoji": "👑"},
      {"number": 4, "text": "has eaten at least one sock from each member of the household and considers it a love language", "emoji": "🧦"}
    ]'::jsonb,
    'pet-goblin',
    'dog',
    1204
  )
ON CONFLICT (id) DO NOTHING;
