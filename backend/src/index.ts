import express from "express";
import type { Request, Response } from "express";
// 1. Tambahkan loginUser di baris import ini
import { registerUser, loginUser } from "./auth.js";
// Tambahkan import addCalculation & getAllCalculations di atas
import { addCalculation, getAllCalculations } from "./calculations.js";
import cors from 'cors';

const app = express();
app.use(cors()); // Mengizinkan semua akses dari luar
const port = 3000;

// Middleware agar server bisa membaca data JSON dari Postman atau Frontend
app.use(express.json());

// Route dasar untuk mengecek apakah server menyala
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Ellty! Backend is running.");
});

// --- ENDPOINT REGISTRASI ---
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await registerUser(username, password);
    res.status(201).json({ message: "User berhasil dibuat", user });
  } catch (error: any) {
    // Memberikan error 400 jika username sudah ada
    res.status(400).json({ error: error.message });
  }
});

// --- ENDPOINT LOGIN (TAMBAHAN BARU) ---
app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // Memanggil fungsi login yang baru kita buat di auth.ts
    const user = await loginUser(username, password);

    // Memberikan respon sukses 200 jika password cocok
    res.status(200).json({
      message: "Login berhasil",
      user,
    });
  } catch (error: any) {
    // Memberikan error 401 (Unauthorized) jika login gagal
    res.status(401).json({ error: error.message });
  }
});

// Endpoint untuk Membuat Kalkulasi Baru
app.post("/api/calculations", async (req: Request, res: Response) => {
  try {
    const { userId, value, operator, parentId } = req.body;

    // Gunakan .trim() untuk membuang spasi di awal/akhir string secara otomatis
    const cleanParentId = parentId ? parentId.trim() : null;
    const cleanUserId = userId ? userId.trim() : null;

    const calculation = await addCalculation(
      cleanUserId,
      value,
      operator,
      cleanParentId
    );
    res.status(201).json(calculation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint untuk Mengambil Semua Data (Tree Data)
app.get("/api/calculations", async (req: Request, res: Response) => {
  try {
    const treeData = await getAllCalculations();
    res.json(treeData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
