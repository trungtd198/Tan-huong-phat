-- Supabase security advisor: rls_disabled_in_public.
-- The app accesses these tables through server-side Prisma/database credentials.
-- Do not expose direct table access through anon/authenticated Supabase API roles.

ALTER TABLE "admin_users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_lines" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "brands" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_variants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ingredients" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_ingredients" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_usage_steps" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_images" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "banners" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE "admin_users" FROM anon, authenticated;
REVOKE ALL ON TABLE "product_lines" FROM anon, authenticated;
REVOKE ALL ON TABLE "product_categories" FROM anon, authenticated;
REVOKE ALL ON TABLE "brands" FROM anon, authenticated;
REVOKE ALL ON TABLE "products" FROM anon, authenticated;
REVOKE ALL ON TABLE "product_variants" FROM anon, authenticated;
REVOKE ALL ON TABLE "ingredients" FROM anon, authenticated;
REVOKE ALL ON TABLE "product_ingredients" FROM anon, authenticated;
REVOKE ALL ON TABLE "product_usage_steps" FROM anon, authenticated;
REVOKE ALL ON TABLE "product_images" FROM anon, authenticated;
REVOKE ALL ON TABLE "banners" FROM anon, authenticated;
