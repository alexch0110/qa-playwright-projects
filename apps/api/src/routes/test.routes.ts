import { Router } from "express";
import { prisma } from "../../prisma/prisma-client";

const router = Router();

router.post("/reset", async (_req, res) => {
  await prisma.todo.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  return res.status(204).end();
});

export default router;
