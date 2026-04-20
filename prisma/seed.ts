// prisma/seed.ts
// Run with: npx prisma db seed
// package.json needs: "prisma": { "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts" }

import { PrismaClient } from "./generated";
import { createHash } from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return createHash("sha256")
    .update("SVS_SALT_2024_" + password)
    .digest("hex");
}

async function main() {
  console.log("🌱 Seeding database...");

  // Check if already seeded
  const existingCompany = await prisma.company.findFirst();
  if (existingCompany) {
    console.log("✅ Database already seeded — skipping.");
    return;
  }

  // Create the default company
  const company = await prisma.company.create({
    data: {
      name: "Sri Veerabhadraeshwara Swamy Solar System",
      ownerName: "DARSHAN K M",
      gstNumber: "29EKVPD6110H1ZX",
      contact: "+919945117650",
      email: "svssolar@gmail.com",
    },
  });

  // Create the owner employee with default credentials
  // Default: svssolar@gmail.com / svs@1234
  await prisma.employee.create({
    data: {
      companyId: company.id,
      name: "DARSHAN K M",
      email: "svssolar@gmail.com",
      passwordHash: hashPassword("svs@1234"),
      role: "OWNER",
    },
  });

  console.log(`✅ Created company: ${company.name}`);
  console.log(`✅ Created owner: svssolar@gmail.com / svs@1234`);
  console.log(`\n⚠️  Please change the default password after first login!`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });