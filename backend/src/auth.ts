import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Fungsi Register (Sudah ada)
export const registerUser = async (username: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) throw new Error("Username sudah terdaftar");
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { username, password: hashedPassword },
  });
  return { id: newUser.id, username: newUser.username };
};

// --- TAMBAHKAN FUNGSI LOGIN INI ---
export const loginUser = async (username: string, password: string) => {
  // 1. Cari user berdasarkan username
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // 2. Jika user tidak ditemukan
  if (!user) {
    throw new Error("Username atau password salah");
  }

  // 3. Bandingkan password yang diketik dengan password di DB (Hashed)
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Username atau password salah");
  }

  // 4. Jika sukses, kembalikan data user (tanpa password)
  return { id: user.id, username: user.username };
};
