import cors from "cors";
import express, { json } from "express";
import mongoose from "mongoose";
import { alunoRouter } from "./controllers/alunoController.js";
import { disciplinaRouter } from "./controllers/disciplinaController.js";
import { professorRouter } from "./controllers/professorController.js";
import { turmaRouter } from "./controllers/turmaController.js";
import { usuarioRouter } from "./controllers/usuarioController.js";

const app = express();

app.use(json());
app.use(cors());

app.use("/api/turmas", turmaRouter);
app.use("/api/professores", professorRouter);
app.use("/api/disciplinas", disciplinaRouter);
app.use("/api/alunos", alunoRouter);
app.use("/api/usuario", usuarioRouter);

const initApplication = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://luan777:jOGABhDpc0igFiCw@cluster0.ctiyqzc.mongodb.net/?retryWrites=true&w=majority");
    app.listen(process.env.PORT || 8080, () => {
      console.log("Rodando.");
    });
  } catch (err) {
    console.log(err);
  }
};

initApplication();
