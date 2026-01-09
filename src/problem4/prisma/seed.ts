import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create sample resources
  const resource1 = await prisma.resource.create({
    data: {
      name: 'Sample Resource 1',
      description: 'This is a sample resource for testing',
      category: 'sample',
      status: 'active',
    },
  });

  const resource2 = await prisma.resource.create({
    data: {
      name: 'Sample Resource 2',
      description: 'Another sample resource',
      category: 'example',
      status: 'active',
    },
  });

  console.log({ resource1, resource2 });
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
