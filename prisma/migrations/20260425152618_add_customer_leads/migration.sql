-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('REGULAR', 'WALKIN');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('PENDING', 'BUSY', 'NOT_INTERESTED', 'INTERESTED_REQUIRED_QUOTATION', 'QUOTATION_PROVIDED', 'OUTSIDE_LIMIT', 'COMPLETED', 'CONFIRMED_MOVED_TO_SALES');

-- CreateEnum
CREATE TYPE "QuotationProvided" AS ENUM ('NOT_PROVIDED', 'PROVIDED', 'NA');

-- CreateEnum
CREATE TYPE "RequiredFor" AS ENUM ('DOMESTIC', 'COMMERCIAL', 'NA');

-- CreateEnum
CREATE TYPE "SiteType" AS ENUM ('ROOF_TOP', 'SHED_SHEET', 'CONCRETE', 'GROUND_MOUNTED', 'NA');

-- CreateEnum
CREATE TYPE "CallBackStatus" AS ENUM ('NO', 'YES', 'NA');

-- CreateEnum
CREATE TYPE "SystemRequired" AS ENUM ('ON_GRID', 'OFF_GRID', 'HYBRID', 'SOLAR_PUMP', 'NA');

-- CreateTable
CREATE TABLE "customer_leads" (
    "id" SERIAL NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mobileNumber" TEXT NOT NULL,
    "customerName" TEXT,
    "location" TEXT,
    "district" TEXT,
    "region" TEXT NOT NULL DEFAULT 'North',
    "systemRequirements" TEXT,
    "configuration" TEXT,
    "leadType" "LeadType" NOT NULL DEFAULT 'REGULAR',
    "status" "LeadStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "quotation" "QuotationProvided" NOT NULL DEFAULT 'NOT_PROVIDED',
    "callBackStatus" "CallBackStatus" NOT NULL DEFAULT 'NO',
    "followUpDate" TIMESTAMP(3),
    "systemRequired" "SystemRequired",
    "requiredFor" "RequiredFor" NOT NULL DEFAULT 'DOMESTIC',
    "siteType" "SiteType" NOT NULL DEFAULT 'ROOF_TOP',
    "assignedTelecallerId" INTEGER,
    "assignedFranchiseId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_leads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer_leads" ADD CONSTRAINT "customer_leads_assignedTelecallerId_fkey" FOREIGN KEY ("assignedTelecallerId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_leads" ADD CONSTRAINT "customer_leads_assignedFranchiseId_fkey" FOREIGN KEY ("assignedFranchiseId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
