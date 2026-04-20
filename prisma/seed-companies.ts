// prisma/seed-companies.ts
import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

async function main() {
  // ── A2Z Solar (from screenshot in previous images) ────────────────────────
  await prisma.company.upsert({
    where: { name: "A2Z Solar" },
    update: {
      address: "34/F2, Akkamahadevi Rd, opp. Advaith Hyundai Service Center, 2nd Stage, Vidyaranyapura, Visveshwara Nagar, Mysore, Karnataka, 570008",
      gstNumber: "29ABWPP8993J1Z7",
      contact: "+918431061046",
      email: "a2zsolar.mysore@gmail.com",
      bankName: "ICICI BANK",
      branchName: "KUMPUNAGAR",
      accountName: "A2Z SOLAR",
      accountNumber: "056005003798",
      ifscCode: "ICIC0000560",
    },
    create: {
      name: "A2Z Solar",
      address: "34/F2, Akkamahadevi Rd, opp. Advaith Hyundai Service Center, 2nd Stage, Vidyaranyapura, Visveshwara Nagar, Mysore, Karnataka, 570008",
      gstNumber: "29ABWPP8993J1Z7",
      contact: "+918431061046",
      email: "a2zsolar.mysore@gmail.com",
      bankName: "ICICI BANK",
      branchName: "KUMPUNAGAR",
      accountName: "A2Z SOLAR",
      accountNumber: "056005003798",
      ifscCode: "ICIC0000560",
    },
  });
  console.log("✓ A2Z Solar upserted");

  // ── Sri Veerabhadraeshwara Swamy Solar System ─────────────────────────────
  // Source: GST Registration Certificate (Form GST REG-06)
  // Registration Number : 29EKVPD6110H1ZX
  // Legal Name          : DARSHAN K M
  // Trade Name          : SRI VEERABHADRAESHWARA SWAMY SOLAR SYSTEM
  // Constitution        : Proprietorship
  // Address             : Building No./Flat No.: 133
  //                       Road/Street: hireyammiganur village B durga hobli holalkere taluk
  //                       City/Town/Village: Chikkajajur
  //                       District: Chitradurga
  //                       State: Karnataka
  //                       PIN Code: 577523
  // Date of Liability   : 13/06/2023
  // Type of Registration: Regular
  // Approved by         : JAYANTH DODDARANAGAIAH KUMAR
  //                       Assistant Commissioner
  //                       LGSTO 480 - Chitradurga
  // Certificate issued  : 03/07/2025
  await prisma.company.upsert({
    where: { name: "Sri Veerabhadraeshwara Swamy Solar System" },
    update: {
      address: "Building No. 133, hireyammiganur village B durga hobli holalkere taluk, Chikkajajur, Chitradurga, Karnataka - 577523",
      gstNumber: "29EKVPD6110H1ZX",
      contact: "9945117650",
      email: "svsolar@gmail.com",
      bankName: "Canara Bank",
      branchName: "Chickjajur",
      accountName: "SRI VEERABHADRESHWARA SWAMY SOLAR SYSTEM",
      accountNumber: "120035340906",
      ifscCode: "CNRB0000452",
    },
    create: {
      name: "Sri Veerabhadraeshwara Swamy Solar System",
      address: "Building No. 133, hireyammiganur village B durga hobli holalkere taluk, Chikkajajur, Chitradurga, Karnataka - 577523",
      gstNumber: "29EKVPD6110H1ZX",
      contact: "9945117650",
      email: "svsolar@gmail.com",
      bankName: "Canara Bank",
      branchName: "Chickjajur",
      accountName: "SRI VEERABHADRESHWARA SWAMY SOLAR SYSTEM",
      accountNumber: "120035340906",
      ifscCode: "CNRB0000452",
    },
  });
  console.log("✓ Sri Veerabhadraeshwara Swamy Solar System upserted");

  console.log("\n✅ All companies seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());