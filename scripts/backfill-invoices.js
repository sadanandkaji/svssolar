// scripts/backfill-invoices.js
// Run with: node scripts/backfill-invoices.js

const { PrismaClient } = require("../prisma/generated");

const prisma = new PrismaClient();

function generateInvoiceNumber(companyName, date) {
  const y    = String(date.getFullYear()).slice(2);
  const m    = String(date.getMonth() + 1).padStart(2, "0");
  const d    = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  const prefix = companyName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 3);
  return `INV-${prefix}-${y}${m}${d}-${rand}`;
}

async function uniqueInvoiceNumber(companyName, date) {
  let inv;
  let attempts = 0;
  do {
    inv = generateInvoiceNumber(companyName, date);
    attempts++;
    if (attempts > 20) throw new Error("Could not generate unique invoice number");
  } while (await prisma.invoice.findUnique({ where: { invoiceNumber: inv } }));
  return inv;
}

async function main() {
  const quotations = await prisma.quotation.findMany({
    where: {
      status: "SAVED",
      invoice: null,
    },
    include: {
      company:    true,
      items:      { orderBy: { sortOrder: "asc" } },
      fixedCosts: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "asc" },
  });

  console.log(`\nFound ${quotations.length} saved quotation(s) without invoices.\n`);

  if (quotations.length === 0) {
    console.log("✅ Nothing to backfill — all saved quotations already have invoices.");
    return;
  }

  let created = 0;
  let failed  = 0;

  for (const q of quotations) {
    try {
      const invoiceNumber = await uniqueInvoiceNumber(q.company.name, q.quoteDate);

      await prisma.invoice.create({
        data: {
          invoiceNumber,
          invoiceDate:     q.quoteDate,
          quotationId:     q.id,
          companyId:       q.companyId,
          customerName:    q.customerName,
          customerAddress: q.customerAddress,
          customerContact: q.customerContact,
          customerEmail:   q.customerEmail,
          systemType:      q.systemType,
          systemSizeKw:    q.systemSizeKw,
          panelType:       q.panelType,
          panelWattage:    q.panelWattage,
          panelCount:      q.panelCount,
          outputWattageKw: q.outputWattageKw,
          phase:           q.phase,
          subtotal:        q.subtotal,
          totalGst:        q.totalGst,
          discountPercent: q.discountPercent,
          discountAmount:  q.discountAmount,
          finalPrice:      q.finalPrice,
          roundedPrice:    q.roundedPrice,
          advancePayment:  q.advancePayment,
          balanceDue:      q.balanceDue,
          paymentType:     q.paymentType,
          receiverName:    q.receiverName,
          remarks:         q.remarks,
          preparedBy:      q.preparedBy,
          status:          "ISSUED",
          items: {
            createMany: {
              data: q.items.map((it, i) => ({
                categoryName: it.categoryName,
                productName:  it.productName,
                hsnCode:      it.hsnCode,
                description:  it.description,
                unitPrice:    it.unitPrice,
                quantity:     it.quantity,
                gstRate:      it.gstRate,
                totalPrice:   it.totalPrice,
                sortOrder:    i,
              })),
            },
          },
          fixedCosts: {
            createMany: {
              data: q.fixedCosts.map((fc, i) => ({
                label:     fc.label,
                cost:      fc.cost,
                rateNote:  fc.rateNote,
                hsnCode:   fc.hsnCode,
                gstRate:   fc.gstRate,
                total:     fc.total,
                included:  fc.included,
                sortOrder: i,
              })),
            },
          },
        },
      });

      console.log(`  ✅ ${invoiceNumber}  ←  ${q.quoteNumber} (${q.customerName})`);
      created++;
    } catch (e) {
      console.error(`  ❌ Failed for ${q.quoteNumber}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n── Summary ─────────────────────`);
  console.log(`  Created : ${created}`);
  console.log(`  Failed  : ${failed}`);
  console.log(`\nDone. You can delete scripts/backfill-invoices.js`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());