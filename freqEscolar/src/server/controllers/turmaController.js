import express from "express";
import { mongoTurma } from "../models/turma.js";
const turmaRouter = express.Router();

turmaRouter.post("/", criaTurma);
turmaRouter.get("/", listaTurmas);
turmaRouter.get("/:id", resgataTurma);
turmaRouter.put("/:id", atualizaTurma);
turmaRouter.delete("/:id", deletaTurma);

const turma = await mongoTurma();

async function criaTurma(req, res) {
  if (!req.body) {
    res.status(400).send({ msg: "Content can not be emtpy!" });
    return;
  }
  const turmaCriada = await turma.create({
    name: req.body.name,
  });
  res.json({
    body: {
      msg: "Turma criada!",
      data: turmaCriada,
    },
  });
}

async function listaTurmas(req, res) {
  const turmas = await turma.find();
  res.json({
    body: turmas,
  });
}

async function resgataTurma(req, res) {
  let turmaEncontrada = null;
  const id = req.params.id;
  if (id) {
    turmaEncontrada = await turma.findById(id);
  }
  res.json({
    body: turmaEncontrada,
  });
}

async function atualizaTurma(req, res) {
  if (!req.body) {
    return res.status(400).json({ body: "Data to update can not be empty" });
  }
  const id = req.params.id;
  const turmaAtualizada = await turma.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  });
  res.json({
    body: turmaAtualizada,
  });
}

async function deletaTurma(req, res) {
  const id = req.params.id;
  await turma.findByIdAndDelete(id);
  res.json({
    body: {},
    msg: "Turma de id " + id + " deletada!",
  });
}

export { turmaRouter };
