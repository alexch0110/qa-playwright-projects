import bcrypt from "bcrypt";
import { seedConfig } from "./seed.config";
import { prisma } from "./prisma-client";

async function main() {
  const { email, password } = seedConfig.user;
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hashed },
  });

  await prisma.todo.deleteMany({
    where: { project: { ownerId: user.id } },
  });
  await prisma.project.deleteMany({
    where: { ownerId: user.id },
  });

  for (const p of seedConfig.projects) {
    const project = await prisma.project.create({
      data: { name: p.name, ownerId: user.id },
    });

    if (p.todos?.length) {
      await prisma.todo.createMany({
        data: p.todos.map((t) => ({
          title: t.title,
          completed: t.completed ?? false,
          projectId: project.id,
        })),
      });
    }
  }

  console.log("✅ Seed done");
  console.log("Demo user:");
  console.log(`  email:    ${email}`);
  console.log(`  password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
