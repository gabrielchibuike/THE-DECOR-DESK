-- ============================================================
-- Antigravity Decor — Lead Magnet Schema Update
-- Run this in your Supabase SQL Editor if columns do not exist
-- ============================================================

ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS source text;

-- Backfill source from source_page if present
UPDATE subscribers SET source = source_page WHERE source IS NULL AND source_page IS NOT NULL;
