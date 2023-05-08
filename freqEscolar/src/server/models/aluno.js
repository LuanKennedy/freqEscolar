import mongoose from "mongoose";

var alunoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const mongoAluno = async () => {
  return mongoose.model("alunos", alunoSchema);
};
