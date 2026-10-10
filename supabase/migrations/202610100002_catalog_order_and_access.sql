-- Stable insertion order preserves the approved demo catalog composition.
ALTER TABLE commerce.products ADD COLUMN sort_order bigint GENERATED ALWAYS AS IDENTITY;
-- Defense in depth if these roles exist (Supabase); absent in plain local PostgreSQL.
DO $$
BEGIN
 IF EXISTS(SELECT 1 FROM pg_roles WHERE rolname='anon') THEN
  REVOKE ALL ON SCHEMA commerce FROM anon;
  REVOKE ALL ON ALL TABLES IN SCHEMA commerce FROM anon;
 END IF;
 IF EXISTS(SELECT 1 FROM pg_roles WHERE rolname='authenticated') THEN
  REVOKE ALL ON SCHEMA commerce FROM authenticated;
  REVOKE ALL ON ALL TABLES IN SCHEMA commerce FROM authenticated;
 END IF;
END $$;
