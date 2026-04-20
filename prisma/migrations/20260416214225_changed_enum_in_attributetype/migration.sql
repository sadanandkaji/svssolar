/*
  Warnings:

  - The values [BOOLEAN,DATE] on the enum `AttributeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttributeType_new" AS ENUM ('TEXT', 'NUMBER', 'SELECT');
ALTER TABLE "category_attributes" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "category_attributes" ALTER COLUMN "type" TYPE "AttributeType_new" USING ("type"::text::"AttributeType_new");
ALTER TYPE "AttributeType" RENAME TO "AttributeType_old";
ALTER TYPE "AttributeType_new" RENAME TO "AttributeType";
DROP TYPE "AttributeType_old";
ALTER TABLE "category_attributes" ALTER COLUMN "type" SET DEFAULT 'TEXT';
COMMIT;
