import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const todos = [
    {
      title: 'First Todo',
      description: 'This is my first todo',
    },
    {
      title: 'Second Todo',
      description: 'This is my second todo',
    },
  ];

  for (const todo of todos) {
    await prisma.todo.create({
      data: todo,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
