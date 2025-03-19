const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create Materials
  const materials = await prisma.material.createMany({
    data: [
      { name: "Aluminium Profile AISI1, Fe frei", type: "e-findo GmbH" },
      { name: "Mischschrott", type: "e-findo GmbH" },
      { name: "Eisenspäne", type: "e-findo GmbH" },
      { name: "Elektroschrott", type: "e-findo GmbH" },
      { name: "Altes KSS", type: "e-findo GmbH" },
    ],
  });

  // Create Companies
  const companies = await prisma.company.createMany({
    data: [
      {
        name: "Allsafe GmbH - Engen",
        currentDate: new Date("2025-03-10"),
        currentMonth: "März",
        currentWeight: 3395,
        collectedWeight: 10080,
        totalRevenue: 0,
      },
      {
        name: "Company B",
        currentDate: new Date("2025-03-10"),
        currentMonth: "März",
        currentWeight: 2000,
        collectedWeight: 5000,
        totalRevenue: 1000,
      },
      {
        name: "Company C",
        currentDate: new Date("2025-03-10"),
        currentMonth: "März",
        currentWeight: 1500,
        collectedWeight: 3000,
        totalRevenue: 500,
      },
      {
        name: "Company D",
        currentDate: new Date("2025-03-10"),
        currentMonth: "März",
        currentWeight: 2500,
        collectedWeight: 7000,
        totalRevenue: 1500,
      },
      {
        name: "Company E",
        currentDate: new Date("2025-03-10"),
        currentMonth: "März",
        currentWeight: 1000,
        collectedWeight: 2000,
        totalRevenue: 200,
      },
    ],
  });

  // Create Containers
  const containers = await prisma.container.createMany({
    data: [
      {
        machineId: "CMS:3001",
        maxNetto: 2600,
        material: "Aluminium Profile AISI1, Fe frei",
        nettoWeight: 890,
        monthlyPrice: 0.0,
        fillLevel: 34.23,
        status: "Active",
      },
      {
        machineId: "CMS:7038",
        maxNetto: 6000,
        material: "Mischschrott",
        nettoWeight: 1760,
        monthlyPrice: 0.0,
        fillLevel: 29.33,
        status: "Active",
        collectionDate: new Date("2025-04-01T12:12:00Z"),
      },
      {
        machineId: "CMS:7001",
        maxNetto: 2500,
        material: "Eisenspäne",
        nettoWeight: 405,
        monthlyPrice: 0.0,
        fillLevel: 16.2,
        status: "Active",
        collectionDate: new Date("2025-04-09T07:00:00Z"),
      },
      {
        machineId: "CMS:7002",
        maxNetto: 3000,
        material: "Elektroschrott",
        nettoWeight: 500,
        monthlyPrice: 0.0,
        fillLevel: 20.0,
        status: "Active",
      },
      {
        machineId: "CMS:7003",
        maxNetto: 4000,
        material: "Altes KSS",
        nettoWeight: 600,
        monthlyPrice: 0.0,
        fillLevel: 25.0,
        status: "Active",
      },
    ],
  });

  // Create Transactions
  const transactions = await prisma.transaction.createMany({
    data: [
      {
        containerId: 1,
        companyId: 1,
        materialId: 1,
        weight: 890,
        price: 0.0,
        date: new Date("2025-03-10"),
      },
      {
        containerId: 2,
        companyId: 1,
        materialId: 2,
        weight: 1760,
        price: 0.0,
        date: new Date("2025-03-10"),
      },
      {
        containerId: 3,
        companyId: 1,
        materialId: 3,
        weight: 405,
        price: 0.0,
        date: new Date("2025-03-10"),
      },
      {
        containerId: 4,
        companyId: 2,
        materialId: 4,
        weight: 500,
        price: 0.0,
        date: new Date("2025-03-10"),
      },
      {
        containerId: 5,
        companyId: 3,
        materialId: 5,
        weight: 600,
        price: 0.0,
        date: new Date("2025-03-10"),
      },
    ],
  });

  // Create Metrics
  const metrics = await prisma.metric.createMany({
    data: [
      {
        containerAmount: 3395,
        collectedAmount: 10080,
        revenue: 0.0,
        date: new Date("2025-03-10"),
      },
      {
        containerAmount: 2000,
        collectedAmount: 5000,
        revenue: 1000.0,
        date: new Date("2025-03-10"),
      },
      {
        containerAmount: 1500,
        collectedAmount: 3000,
        revenue: 500.0,
        date: new Date("2025-03-10"),
      },
      {
        containerAmount: 2500,
        collectedAmount: 7000,
        revenue: 1500.0,
        date: new Date("2025-03-10"),
      },
      {
        containerAmount: 1000,
        collectedAmount: 2000,
        revenue: 200.0,
        date: new Date("2025-03-10"),
      },
    ],
  });

  // Create Users
  const users = await prisma.user.createMany({
    data: [
      {
        email: "admin1@efindo.com",
        password: "securepassword1",
        name: "Admin One",
        role: "ADMIN",
        companyId: 1,
      },
      {
        email: "admin2@efindo.com",
        password: "securepassword2",
        name: "Admin Two",
        role: "ADMIN",
        companyId: 2,
      },
      {
        email: "user1@efindo.com",
        password: "securepassword3",
        name: "User One",
        role: "USER",
        companyId: 3,
      },
      {
        email: "user2@efindo.com",
        password: "securepassword4",
        name: "User Two",
        role: "USER",
        companyId: 4,
      },
      {
        email: "user3@efindo.com",
        password: "securepassword5",
        name: "User Three",
        role: "USER",
        companyId: 5,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
