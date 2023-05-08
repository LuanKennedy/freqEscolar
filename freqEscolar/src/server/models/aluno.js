import mongoose from "mongoose";

var alunoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailResponsavel: {
    type: String,
    required: true,
  },
  turma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "turmas",
    required: true,
  },
});

export const mongoAluno = async () => {
  return mongoose.model("alunos", alunoSchema);
};
