import express from "express";
import { mongoDisciplina } from "../models/disciplina.js";
import { mongoProfessor } from "../models/professor.js";
import { mongoTurma } from "../models/turma.js";

const professorRouter = express.Router();
const professor = await mongoProfessor();

professorRouter.post("/", criaProfessor);
professorRouter.get("/", listaProfessores);
professorRouter.get("/:id", resgataProfessor);
professorRouter.put("/:id", atualizaProfessor);
professorRouter.delete("/:id", deletaProfessor);

async function criaProfessor(req, res) {
  if (!req.body) {
    res.status(400).send({ msg: "Content can not be empty!" });
    return;
  }
  const professorCriado = await professor.create({
    name: req.body.name,
    email: req.body.email,
    disciplina: req.body.disciplina,
    turma: req.body.turma,
  });
  res.json({
    body: {
      msg: "Professor criado!",
      data: professorCriado,
    },
  });
}

async function listaProfessores(req, res) {
  const professores = await professor.find();

  for (let professor of professores) {
    const idTurma = professor.turma._id;
    const turma = await (await mongoTurma()).findById(idTurma);
    const idDisciplina = professor.disciplina._id;
    const disciplina = await (await mongoDisciplina()).findById(idDisciplina);
    professor.turma = turma;
    professor.disciplina = disciplina;
  }

  res.json({
    body: professores,
  });
}

async function resgataProfessor(req, res) {
  let professorEncontrado = null;
  const id = req.params.id;
  if (id) {
    professorEncontrado = await professor.findById(id);
  }

  const idTurma = professorEncontrado.turma._id;
  const turma = await (await mongoTurma()).findById(idTurma);
  const idDisciplina = professorEncontrado.disciplina._id;
  const disciplina = await (await mongoDisciplina()).findById(idDisciplina);
  professorEncontrado.turma = turma;
  professorEncontrado.disciplina = disciplina;

  res.json({
    body: professorEncontrado,
  });
}

async function atualizaProfessor(req, res) {
  if (!req.body) {
    return res.status(400).json({ body: "Data to update can not be empty" });
  }
  const id = req.params.id;
  const professorAtualizado = await professor.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  });
  res.json({
    body: professorAtualizado,
  });
}

async function deletaProfessor(req, res) {
  const id = req.params.id;
  await professor.findByIdAndDelete(id);
  res.json({
    body: {},
    msg: "Professor de id " + id + " deletado!",
  });
}

export { professorRouter };
