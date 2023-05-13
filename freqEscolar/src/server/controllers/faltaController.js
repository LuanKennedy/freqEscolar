import express from "express";
import { mongoFalta } from "../models/falta.js";

const faltaRouter = express.Router();

faltaRouter.post("/", criaFalta);
faltaRouter.get("/", listaFaltas);
faltaRouter.get("/:id", resgataFalta);
faltaRouter.put("/:id", atualizaFalta);
faltaRouter.delete("/:id", deletaFalta);

async function criaFalta(req, res) {
  const falta = await mongoFalta();
  if (!req.body) {
    return res.status(400).send({ msg: "O conteúdo não pode estar vazio!" });
  }
  if (!req.body.aluno) {
    return res.status(400).send({ msg: "O campo 'aluno' é obrigatório!" });
  }
  const faltaCriada = await falta.create({
    data: req.body.data,
    professor: req.body.professor,
    disciplina: req.body.disciplina,
    aluno: req.body.aluno,
  });
  res.json({
    body: {
      msg: "Falta criada!",
      data: faltaCriada,
    },
  });
}

async function listaFaltas(req, res) {
  const falta = await mongoFalta();
  const faltas = await falta.find();
  res.json({
    body: faltas,
  });
}

async function resgataFalta(req, res) {
  const falta = await mongoFalta();
  const id = req.params.id;
  let faltaEncontrada = null;
  if (id) {
    faltaEncontrada = await falta.findById(id);
  }
  res.json({
    body: faltaEncontrada,
  });
}

async function atualizaFalta(req, res) {
  if (!req.body) {
    return res
      .status(400)
      .json({ body: "Os dados para atualização não podem estar vazios" });
  }
  const falta = await mongoFalta();
  const id = req.params.id;
  const faltaAtualizada = await falta.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
    new: true,
  });
  res.json({
    body: faltaAtualizada,
  });
}

async function deletaFalta(req, res) {
  const falta = await mongoFalta();
  const id = req.params.id;
  await falta.findByIdAndDelete(id);
  res.json({
    body: {},
    msg: "Falta de id " + id + " deletada!",
  });
}

export { faltaRouter };
