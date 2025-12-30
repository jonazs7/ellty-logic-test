import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addCalculation = async (
  userId: string, 
  value: number,
  operator: string | null = null,
  parentId: string | null = null 
) => {
  let finalResult = value;

  if (parentId) {
    const parentNode = await prisma.calculation.findUnique({
      where: { id: parentId },
    });

    if (!parentNode) throw new Error("Parent calculation tidak ditemukan");

    switch (operator) {
      case "+":
        finalResult = parentNode.value + value;
        break;
      case "-":
        finalResult = parentNode.value - value;
        break;
      case "*":
        finalResult = parentNode.value * value;
        break;
      case "/":
        if (value === 0) throw new Error("Tidak bisa membagi dengan angka nol");
        finalResult = parentNode.value / value;
        break;
      default:
        throw new Error("Operator tidak valid");
    }
  }

  return await prisma.calculation.create({
    data: {
      value: finalResult,
      operator,
      userId,
      parentId,
    },
  });
};

export const getAllCalculations = async () => {
  return await prisma.calculation.findMany({
    include: {
      user: { select: { username: true } },
    },
    orderBy: { createdAt: "asc" },
  });
};
