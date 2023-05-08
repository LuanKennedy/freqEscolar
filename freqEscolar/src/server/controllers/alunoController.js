import express from "express";
import { Types } from "mongoose";
import { mongoAluno } from "../models/aluno.js";
import { mongoTurma } from "../models/turma.js";

const alunoRouter = express.Router();
const aluno = await mongoAluno();

alunoRouter.post("/", criaAluno);
alunoRouter.get("/", listaAlunos);
alunoRouter.get("/:id", resgataAluno);
alunoRouter.put("/:id", atualizaAluno);
alunoRouter.delete("/:id", deletaAluno);
alunoRouter.get("/turma/:idTurma", resgataAlunosPorTurma);

async function criaAluno(req, res) {
  if (!req.body) {
    res.status(400).send({ msg: "Content can not be empty!" });
    return;
  }
  const alunoCriado = await aluno.create({
    name: req.body.name,
    emailResponsavel: req.body.emailResponsavel,
    turma: req.body.turma,
  });
  res.json({
    body: {
      msg: "Aluno criado!",
      data: alunoCriado,
    },
  });
}

async function listaAlunos(req, res) {
  const alunos = await aluno.find();

  for (let aluno of alunos) {
    const idTurma = aluno.turma;
    const turma = await (await mongoTurma()).findById(idTurma);
    aluno.turma = turma;
  }

  res.json({
    body: alunos,
  });
}

async function resgataAluno(req, res) {
  let alunoEncontrado = null;
  const id = req.params.id;
  if (id) {
    alunoEncontrado = await aluno.findById(id);
  }
  const idTurma = alunoEncontrado.turma;
  const turma = await (await mongoTurma()).findById(idTurma);
  alunoEncontrado.turma = turma;
  res.json({
    body: alunoEncontrado,
  });
}

async function atualizaAluno(req, res) {
  if (!req.body) {
    return res.status(400).json({ body: "Data to update can not be empty" });
  }
  const id = req.params.id;
  const alunoAtualizado = await aluno.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  });
  res.json({
    body: alunoAtualizado,
  });
}

async function deletaAluno(req, res) {
  const id = req.params.id;
  await aluno.findByIdAndDelete(id);
  res.json({
    body: {},
    msg: "Aluno de id " + id + " deletado!",
  });
}

async function resgataAlunosPorTurma(req, res) {
  const idTurma = req.params.idTurma;
  const alunosPorTurma = await aluno.find({
    turma: new Types.ObjectId(idTurma),
  });
  res.json({
    body: alunosPorTurma,
  });
}

export { alunoRouter };
