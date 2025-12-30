import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const registerUser = async (username: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) throw new Error("Username sudah terdaftar");
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { username, password: hashedPassword },
  });
  return { id: newUser.id, username: newUser.username };
};

export const loginUser = async (username: string, password: string) => {
  // 1. Cari user berdasarkan username
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("Username atau password salah");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Username atau password salah");
  }

  return { id: user.id, username: user.username };
};
