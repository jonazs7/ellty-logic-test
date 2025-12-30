import express from "express";
import type { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.js";
import { addCalculation, getAllCalculations } from "./calculations.js";
import cors from 'cors';

const app = express();
app.use(cors()); 
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Ellty! Backend is running.");
});

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

app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);

    res.status(200).json({
      message: "Login berhasil",
      user,
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

app.post("/api/calculations", async (req: Request, res: Response) => {
  try {
    const { userId, value, operator, parentId } = req.body;

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
