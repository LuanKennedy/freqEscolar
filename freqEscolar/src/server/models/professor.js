import mongoose from "mongoose";

export const professorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "disciplinas",
    required: true,
  },
  turma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "turmas",
    required: true,
  },
});

export const mongoProfessor = async () => {
  return mongoose.model("professores", professorSchema);
};
