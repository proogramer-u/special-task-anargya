-- Private schema: never exposed through Supabase's public Data API.
CREATE SCHEMA IF NOT EXISTS commerce;
REVOKE ALL ON SCHEMA commerce FROM PUBLIC;
CREATE TABLE commerce.products (
 id text PRIMARY KEY, name text NOT NULL, description text NOT NULL,
 category text NOT NULL, price bigint NOT NULL CHECK (price BETWEEN 1000 AND 100000000),
 stock integer NOT NULL CHECK (stock >= 0), image text NOT NULL, active boolean NOT NULL
);
CREATE TABLE commerce.orders (
 reference text PRIMARY KEY, token_hash text NOT NULL, idempotency text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(), customer jsonb NOT NULL,
 total bigint NOT NULL CHECK (total >= 0),
 status text NOT NULL CHECK (status IN ('submitted','processing','completed','cancelled')),
 UNIQUE (idempotency, token_hash)
);
CREATE TABLE commerce.order_items (
 reference text NOT NULL REFERENCES commerce.orders(reference) ON DELETE CASCADE,
 position integer NOT NULL, product_id text NOT NULL, name text NOT NULL,
 quantity integer NOT NULL CHECK (quantity BETWEEN 1 AND 20),
 price bigint NOT NULL CHECK (price > 0), PRIMARY KEY (reference, position)
 -- No product FK: deleting a catalog item must preserve its order snapshot.
);
CREATE TABLE commerce.admin_sessions (
 hash text PRIMARY KEY, credential_version text NOT NULL, expires_at timestamptz NOT NULL
);
CREATE INDEX ON commerce.admin_sessions(expires_at);
CREATE INDEX ON commerce.orders(created_at);
CREATE TABLE commerce.rate_limits (
 key text PRIMARY KEY, count integer NOT NULL CHECK (count > 0), reset_at timestamptz NOT NULL
);
CREATE INDEX ON commerce.rate_limits(reset_at);
REVOKE ALL ON ALL TABLES IN SCHEMA commerce FROM PUBLIC;
-- No anon/authenticated grants, public policies or security-definer RPCs.
