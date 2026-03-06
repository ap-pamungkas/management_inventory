import prisma from "../lib/prisma";
import * as bcrypt from "bcrypt";

async function main() {
  console.log("Sedang memulai seeding...");

  // Hash password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: { role: "ADMIN" },
    create: {
      name: "Super Admin",
      username: "admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create Guest with time-limited access (e.g., today 19:30 - 20:00)
  const today = new Date();
  const startTime = new Date(today.setHours(19, 30, 0, 0));
  const endTime = new Date(today.setHours(20, 0, 0, 0));

  const guest = await prisma.user.upsert({
    where: { username: "guest1" },
    update: {},
    create: {
      name: "Temporary Client",
      username: "guest1",
      password: hashedPassword,
      role: "GUEST",
      accessibleFrom: startTime,
      accessibleUntil: endTime,
      cctvStamp: "CCTV-ENTRANCE-01",
    },
  });

  // Create Multinational Partner (COOPERATED)
  const partner = await prisma.user.upsert({
    where: { username: "partner" },
    update: {},
    create: {
      name: "Contracted Supplier",
      username: "partner",
      password: hashedPassword,
      role: "COOPERATED",
    },
  });

  // Create Multilevel Rack
  const rack = await prisma.rack.upsert({
    where: { id: 1 },
    update: {
      layoutRows: 3,
      layoutCols: 3,
    },
    create: {
      id: 1,
      name: "Main Storage A1",
      code_rack: "R-A1",
      description: "Central components storage",
      posX: 10,
      posY: 10,
      width: 15,
      height: 15,
      layoutRows: 3,
      layoutCols: 3,
    },
  });

  // Create Items with precise positions
  await prisma.item.upsert({
    where: { id: 1 },
    update: { row: 0, col: 0 },
    create: {
      id: 1,
      name: "Circuit Board",
      stock: 50,
      purchase_price: 150000,
      rackId: 1,
      row: 0,
      col: 0,
    },
  });

  await prisma.item.upsert({
    where: { id: 2 },
    update: { row: 1, col: 1 },
    create: {
      id: 2,
      name: "Power Module",
      stock: 20,
      purchase_price: 450000,
      rackId: 1,
      row: 1,
      col: 1,
    },
  });

  console.log({ admin, guest, partner, rack });
  console.log("Seeding selesai!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
