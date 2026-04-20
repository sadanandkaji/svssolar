-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('DRAFT', 'SAVED', 'APPROVED');

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "gstNumber" TEXT,
    "contact" TEXT,
    "email" TEXT,
    "logoUrl" TEXT,
    "bankName" TEXT,
    "branchName" TEXT,
    "accountName" TEXT,
    "accountNumber" TEXT,
    "ifscCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotations" (
    "id" SERIAL NOT NULL,
    "quoteNumber" TEXT NOT NULL,
    "quoteDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerAddress" TEXT,
    "customerContact" TEXT,
    "customerEmail" TEXT,
    "systemType" TEXT,
    "systemSizeKw" DECIMAL(10,2),
    "panelType" TEXT,
    "panelWattage" INTEGER,
    "panelCount" INTEGER,
    "outputWattageKw" DECIMAL(10,2),
    "phase" TEXT,
    "subtotal" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "totalGst" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "discountPercent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "discountAmount" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "finalPrice" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "roundedPrice" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "advancePayment" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "balanceDue" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "paymentType" TEXT,
    "receiverName" TEXT,
    "remarks" TEXT,
    "preparedBy" TEXT,
    "status" "QuotationStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotation_items" (
    "id" SERIAL NOT NULL,
    "quotationId" INTEGER NOT NULL,
    "categoryName" TEXT,
    "productName" TEXT NOT NULL,
    "description" TEXT,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL DEFAULT 1,
    "gstRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "totalPrice" DECIMAL(14,2) NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "quotation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotation_fixed_costs" (
    "id" SERIAL NOT NULL,
    "quotationId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "cost" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "rateNote" TEXT,
    "gstRate" DECIMAL(5,2) NOT NULL DEFAULT 18,
    "total" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "included" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "quotation_fixed_costs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "quotations_quoteNumber_key" ON "quotations"("quoteNumber");

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "quotations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_fixed_costs" ADD CONSTRAINT "quotation_fixed_costs_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "quotations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
