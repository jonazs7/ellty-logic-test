import { describe, it, expect, vi } from "vitest";
// Pastikan tetap menggunakan .js sesuai saran TypeScript sebelumnya
import { addCalculation } from "./calculations.js";

// Mocking PrismaClient sebagai sebuah Class (Constructor)
vi.mock("@prisma/client", () => {
  return {
    PrismaClient: class {
      calculation = {
        findUnique: vi.fn().mockResolvedValue({ id: "parent-1", value: 10 }),
        create: vi
          .fn()
          .mockImplementation(({ data }) =>
            Promise.resolve({ id: "new-id", ...data })
          ),
      };
    },
  };
});

describe("Logika Matematika Berantai", () => {
  it("Harus bisa melakukan operasi penambahan (10 + 5 = 15)", async () => {
    const result = await addCalculation("user-1", 5, "+", "parent-1");
    expect(result.value).toBe(15);
  });

  it("Harus bisa melakukan operasi perkalian (10 * 3 = 30)", async () => {
    const result = await addCalculation("user-1", 3, "*", "parent-1");
    expect(result.value).toBe(30);
  });

  it("Harus bisa melakukan operasi pengurangan (10 - 4 = 6)", async () => {
    const result = await addCalculation("user-1", 4, "-", "parent-1");
    expect(result.value).toBe(6);
  });

  it("Harus bisa melakukan operasi pembagian (10 / 2 = 5)", async () => {
    const result = await addCalculation("user-1", 2, "/", "parent-1");
    expect(result.value).toBe(5);
  });

  it("Harus memunculkan error jika membagi dengan angka nol", async () => {
    await expect(addCalculation("user-1", 0, "/", "parent-1")).rejects.toThrow(
      "Tidak bisa membagi dengan angka nol"
    );
  });
});
