import "dotenv/config";
import express from "express";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();

// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

app.use(express.json());

app.get("/works", async (req, res) => {
  try {
    const data = await prisma.work.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/works", async (req, res) => {
  try {
    const data = await prisma.work.create({
      data: req.body,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Create error" });
  }
});

app.delete("/works/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Некорректный id" });
    }
    const deletedTask = await prisma.work.delete({
      where: { id },
    });
    res.json({ message: "Объект успешно удален", deletedTask });
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ error: "Запись не найдена" });
    }
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
