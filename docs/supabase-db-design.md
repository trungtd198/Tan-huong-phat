# Tan Huong Phat Supabase DB Design

## Muc tieu

Database nay duoc thiet ke cho web my pham/cham soc toc Tan Huong Phat, gom:

- Public site hien thi banner, dong san pham, san pham, anh san pham.
- Admin CRUD san pham, dong san pham, banner.
- Mo rong san sang cho my pham: danh muc, thuong hieu, bien the dung tich/SKU, thanh phan, huong dan su dung.

## Bang chinh

- `admin_users`: tai khoan admin, role, trang thai active, password hash.
- `banners`: banner theo vi tri `HOME_HERO`, `PRODUCTS_HERO`, `ABOUT_HERO`.
- `product_lines`: dong/collection san pham dang hien thi tren trang chu, vi du Contiiena, Acai Beauty, Caluober.
- `product_categories`: danh muc my pham co the phan cap, vi du Hair care, Shampoo, Serum, Conditioner.
- `brands`: thuong hieu san pham.
- `products`: thong tin san pham public/admin, gan voi product line, category, brand.
- `product_variants`: SKU/bien the theo dung tich, gia, ton kho, variant mac dinh.
- `product_images`: anh san pham, cover image, URL public tu Supabase Storage.
- `ingredients`: master data thanh phan my pham.
- `product_ingredients`: lien ket san pham voi thanh phan va loi ich cua thanh phan.
- `product_usage_steps`: cac buoc/cach dung san pham.

## Quan he chinh

- `product_lines` 1-n `products`
- `product_categories` 1-n `products`
- `brands` 1-n `products`
- `products` 1-n `product_variants`
- `products` 1-n `product_images`
- `products` n-n `ingredients` qua `product_ingredients`
- `products` 1-n `product_usage_steps`

## Cach tao bang tren Supabase

Neu `npx prisma migrate deploy` khong chay duoc tu local, mo Supabase Dashboard:

1. Vao project Supabase.
2. Mo `SQL Editor`.
3. Copy toan bo noi dung file `prisma/migrations/20260519000000_init_public_admin/migration.sql`.
4. Chay SQL.
5. Quay lai local chay:

```bash
set -a; source .env.local; set +a; npm run db:seed
set -a; source .env.local; set +a; npm run admin:create
```

## Ghi chu

- Prisma schema source of truth: `prisma/schema.prisma`.
- SQL tao bang: `prisma/migrations/20260519000000_init_public_admin/migration.sql`.
- Code admin hien tai da dung cac bang bat buoc: `admin_users`, `product_lines`, `products`, `product_images`, `banners`.
- Cac bang mo rong nhu `product_variants`, `ingredients`, `product_usage_steps` da san sang cho giai doan admin nang cao tiep theo.
