ALTER TABLE "product_lines" ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "product_lines_isFeatured_isActive_sortOrder_idx" ON "product_lines"("isFeatured", "isActive", "sortOrder");
