# Tan Huong Phat Public/Admin Implementation Plan

## Goal

Convert the current static public site into a single Next.js App Router application with:

- Public site routes for homepage, products, about, and contact.
- Admin site under `/admin`.
- Admin CRUD for products and banners.
- Prisma/Postgres-backed content and Supabase Storage-backed image uploads.

## Scope V1

- In scope: product lines, products, product images, banners, admin authentication, seed data, public DB-backed rendering.
- Out of scope: editing about/contact/footer/testimonials/FAQ content from admin.

## Progress

| Step                                   | Status      | Notes                                                                                       |
| -------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| 1. Create progress plan file           | Done        | Created this file before implementation changes.                                            |
| 2. Port App Router foundation          | Done        | Added `src/app` root layout and public routes; removed duplicate `src/pages` routes.        |
| 3. Add Prisma/env/schema/seed          | Done        | Added scripts, schema, migration SQL, seed, env/db helpers, and generated Prisma Client.    |
| 4. Add public repositories             | Done        | Added DB-backed product/banner repositories with static fallback.                           |
| 5. Update public pages                 | Done        | Homepage, products, and about hero now read repository data.                                |
| 6. Add admin auth/layout/dashboard     | Done        | Added login/logout, signed session, protected admin shell, and dashboard.                   |
| 7. Build product CRUD and media upload | Done        | Added product list/filter/create/edit/status, product line forms, and cover upload support. |
| 8. Build banner CRUD                   | Done        | Added banner list/filter/create/edit/delete and image upload support.                       |
| 9. Update env example                  | Done        | Added `.env.example` with database, Supabase, and admin variables.                          |
| 10. Verify                             | Done        | `npm run type-check`, `npm run lint`, and `npm run build` passed.                           |

## Current Status

Implementation and verification are complete.

## Blockers / Notes

- Prisma 7 was incompatible with local Node v20.11.0, so Prisma was pinned to 6.16.2 like `namthanhwindows`.
- Production build required the existing `.babelrc` dependency `styled-jsx-plugin-postcss`, so it was added.
- Database design was expanded for cosmetics with categories, brands, variants, ingredients, and usage steps. See `docs/supabase-db-design.md`.
