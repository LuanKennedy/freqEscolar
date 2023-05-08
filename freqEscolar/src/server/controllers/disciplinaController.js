import express from "express";
import { mongoDisciplina } from "../models/disciplina.js";

const disciplinaRouter = express.Router();
const disciplina = await mongoDisciplina();

disciplinaRouter.post("/", criaDisciplina);
disciplinaRouter.get("/", listaDisciplinas);
disciplinaRouter.get("/:id", resgataDisciplina);
disciplinaRouter.put("/:id", atualizaDisciplina);
disciplinaRouter.delete("/:id", deletaDisciplina);

async function criaDisciplina(req, res) {
  if (!req.body) {
    res.status(400).send({ msg: "Content can not be empty!" });
    return;
  }
  const disciplinaCriada = await disciplina.create({
    name: req.body.name,
    horario: req.body.horario,
  });
  res.json({
    body: {
      msg: "Disciplina criada!",
      data: disciplinaCriada,
    },
  });
}

async function listaDisciplinas(req, res) {
  const disciplinas = await disciplina.find();
  res.json({
    body: disciplinas,
  });
}

async function resgataDisciplina(req, res) {
  let disciplinaEncontrada = null;
  const id = req.params.id;
  if (id) {
    disciplinaEncontrada = await disciplina.findById(id);
  }
  res.json({
    body: disciplinaEncontrada,
  });
}

async function atualizaDisciplina(req, res) {
  if (!req.body) {
    return res.status(400).json({ body: "Data to update can not be empty" });
  }
  const id = req.params.id;
  const disciplinaAtualizada = await disciplina.findByIdAndUpdate(
    id,
    req.body,
    {
      useFindAndModify: false,
    }
  );
  res.json({
    body: disciplinaAtualizada,
  });
}

async function deletaDisciplina(req, res) {
  const id = req.params.id;
  await disciplina.findByIdAndDelete(id);
  res.json({
    body: {},
    msg: "Disciplina de id " + id + " deletada!",
  });
}

export { disciplinaRouter };
