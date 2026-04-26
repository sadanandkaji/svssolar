-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quotationId" INTEGER,
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
    "status" "InvoiceStatus" NOT NULL DEFAULT 'ISSUED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "categoryName" TEXT,
    "productName" TEXT NOT NULL,
    "hsnCode" TEXT,
    "description" TEXT,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL DEFAULT 1,
    "gstRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "totalPrice" DECIMAL(14,2) NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_fixed_costs" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "cost" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "rateNote" TEXT,
    "hsnCode" TEXT,
    "gstRate" DECIMAL(5,2) NOT NULL DEFAULT 18,
    "total" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "included" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "invoice_fixed_costs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoices_invoiceNumber_key" ON "invoices"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_quotationId_key" ON "invoices"("quotationId");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "quotations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_fixed_costs" ADD CONSTRAINT "invoice_fixed_costs_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
