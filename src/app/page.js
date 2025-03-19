// import prisma from "@/lib/prisma";

export default async function Home() {
  // const containers = await prisma.container.findMany();
  // const companies = await prisma.company.findMany();
  // const materials = await prisma.material.findMany();
  // const transactions = await prisma.transaction.findMany();
  // const metrics = await prisma.metric.findMany();
  // const users = await prisma.user.findMany();

  // console.log("Containers:", containers);
  // console.log("Companies:", companies);
  // console.log("Materials:", materials);
  // console.log("Transactions:", transactions);
  // console.log("Metrics:", metrics);
  // console.log("Users:", users);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1>e-findo GmbH</h1>
      </main>
    </div>
  );
}
