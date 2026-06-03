ALTER TYPE "ProductStatus" RENAME TO "ProductStatus_old";

CREATE TYPE "ProductStatus" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'COMING_SOON');

ALTER TABLE "products" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "products"
  ALTER COLUMN "status" TYPE "ProductStatus"
  USING (
    CASE "status"::text
      WHEN 'PUBLISHED' THEN 'IN_STOCK'
      WHEN 'ARCHIVED' THEN 'OUT_OF_STOCK'
      ELSE 'COMING_SOON'
    END
  )::"ProductStatus";

ALTER TABLE "products" ALTER COLUMN "status" SET DEFAULT 'IN_STOCK';

DROP TYPE "ProductStatus_old";
