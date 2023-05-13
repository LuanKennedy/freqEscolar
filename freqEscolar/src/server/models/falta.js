import mongoose from "mongoose";

export const faltaSchema = new mongoose.Schema({
  data: {
    type: Date,
    required: true,
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "professores",
    required: true,
  },
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "disciplinas",
    required: true,
  },
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "alunos",
    required: true,
  },
});

export const mongoFalta = async () => {
  return mongoose.model("faltas", faltaSchema);
};
