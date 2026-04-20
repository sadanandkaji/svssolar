/*
  Warnings:

  - You are about to drop the column `franchiseId` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `franchiseId` on the `warehouses` table. All the data in the column will be lost.
  - You are about to drop the `franchises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "franchises" DROP CONSTRAINT "franchises_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "inventory_items" DROP CONSTRAINT "inventory_items_franchiseId_fkey";

-- DropForeignKey
ALTER TABLE "warehouses" DROP CONSTRAINT "warehouses_franchiseId_fkey";

-- AlterTable
ALTER TABLE "inventory_items" DROP COLUMN "franchiseId";

-- AlterTable
ALTER TABLE "warehouses" DROP COLUMN "franchiseId";

-- DropTable
DROP TABLE "franchises";
