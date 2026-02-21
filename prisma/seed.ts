import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

async function main() {
  console.log('Sedang memulai seeding...')

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Membuat data awal untuk User
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      name: 'Admin',
      username: 'admin',
      password: hashedPassword,
    },
  })

  // Membuat data awal untuk Rack
  const rack = await prisma.rack.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Rak A1',
      code_rack: 'R-A1',
      description: 'Rak untuk penyimpanan sayuran',
    },
  })

  // Membuat data awal untuk Item
  const item = await prisma.item.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Selada Hidroponik',
      stock: 50,
      purchase_price: 15000,
      rackId: 1,
      description: 'Selada segar dari kebun hidroponik',
    },
  })

  console.log({ user, rack, item })
  console.log('Seeding selesai!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })